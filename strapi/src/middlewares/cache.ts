import { Core } from "@strapi/strapi";
class LRUCacheItem<T> {
    key: string;
    data: T;
    prev: number;
    next: number;
    timestamp: number;
    constructor(key: string, data: T) {
        this.key = key;
        this.data = data;
        this.prev = -1;
        this.next = -1;
        this.timestamp = Date.now();
    }

    touch() {
        this.timestamp = Date.now();
    }

    checkExpired(ttl: number): boolean {
        return Date.now() - this.timestamp > ttl * 1000;
    }
}

class LRUCache<T> {
    indMap: Map<string, number>;
    cache: Array<LRUCacheItem<T>>;
    head: number;
    tail: number;
    freeInds: number[];

    constructor(maxSize: number, ttl: number) {
        this.freeInds = [...Array(maxSize).keys()];
        this.cache = Array(maxSize).fill(null).map(() => null);
        this.indMap = new Map<string, number>();
        this.head = -1;
        this.tail = -1;
    }

    get(key: string): T | null {
        const index = this.indMap.get(key);
        if (index === undefined) return null;

        const item = this.cache[index];
        if (this.head !== index) {
            if (item.prev >= 0) {
                this.cache[item.prev].next = item.next;
            }
            if (item.next >= 0) {
                this.cache[item.next].prev = item.prev;
            }
            if (this.tail === index) {
                this.tail = item.prev;
            }
            item.next = this.head;
            this.cache[this.head].prev = index;
            this.head = index;
        }
        return item.data;
    }

    delete({
        key,
        index,
    }: {
        key?: string;
        index?: number;
    } = {}): void {
        if (key === undefined && index === undefined) {
            this.freeInds = [...Array(this.cache.length).keys()];
            this.cache.fill(null);
            this.indMap.clear();
            this.head = -1;
            this.tail = -1;
            return;
        } else if (index === undefined) {
            index = this.indMap.get(key);
        }
        if (index === undefined) return;

        const item = this.cache[index];
        if (item.prev >= 0) {
            this.cache[item.prev].next = item.next;
        }
        if (item.next >= 0) {
            this.cache[item.next].prev = item.prev;
        }
        if (this.head === index) {
            this.head = item.next;
        }
        if (this.tail === index) {
            this.tail = item.prev;
        }
        this.cache[index] = null;
        this.indMap.delete(item.key);
        this.freeInds.push(index);
        return;
    }

    set(key: string, value: T): void {
        if (this.freeInds.length === 0) {
            this.delete({ index: this.tail });
        } 
        const index = this.freeInds.pop();
        if (index === undefined) {
            throw new Error("No free index available in LRUCache");
        }
        this.indMap.set(key, index);
        if (this.head >= 0) {
            this.cache[this.head].prev = index;
        }
        if (this.tail < 0) {
            this.tail = index;
        }
        this.cache[index] = new LRUCacheItem<T>(key, value);
        this.cache[index].next = this.head;
        this.head = index;
    }
}

export default (config, { strapi }: { strapi: Core.Strapi }) => {
    const { 
        cacheTtl = 3600,
        cacheSize = 1000,
    } = config || {};
    const cache = new LRUCache<any>(cacheSize, cacheTtl);

    return async (ctx, next) => {
        if (ctx.request.url.startsWith('/api/cache_clear') && ctx.request.method === 'GET') {
            strapi.log.info('Cache clear request received, clearing cache...');
            cache.delete();
            ctx.body = { message: 'Cache cleared successfully' };
            ctx.response.status = 200;
            return;
        }
        if (
            ctx.request.url.startsWith('/api/') 
            && ctx.request.method === 'GET'
        ) {
            strapi.log.info('Using custom Cache Middleware...');
            const data = cache.get(ctx.request.url);
            if (data !== null) {
                ctx.body = data;
                ctx.response.status = 200;
                strapi.log.info(`Returning cached response for ${ctx.request.url}`);
                return;
            }
            strapi.log.info(`Cache miss for ${ctx.request.url}`);
            await next();
            if (ctx.response.status === 200 && ctx.body) {
                strapi.log.info(`Caching response for ${ctx.request.url}`);
                cache.set(ctx.request.url, ctx.body);
            }
        } else {
            await next();
        }
    }
}
