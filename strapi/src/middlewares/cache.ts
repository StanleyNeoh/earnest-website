import { Core } from "@strapi/strapi";
import { assert } from "console";

interface CacheData {
    data: any;
    timestamp: number;
}

class LRUCacheItem<T> {
    key: string;
    data: T;
    prev: number;
    next: number;
    constructor(key: string, data: T) {
        this.key = key;
        this.data = data;
        this.prev = -1;
        this.next = -1;
    }
}

class LRUCache<T> {
    private indMap: Map<string, number>;
    private cache: Array<LRUCacheItem<T>>;
    private head: number;
    private freeInds: number[];

    constructor(maxSize: number) {
        this.freeInds = [...Array(maxSize).keys()];
        this.cache = Array(maxSize).fill(null).map(() => null);
        this.indMap = new Map<string, number>();
        this.head = -1;
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
            this.cache.fill(null);
            this.indMap.clear();
            this.head = -1;
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
        this.cache[index] = null;
        this.indMap.delete(item.key);
        this.freeInds.push(index);
        return;
    }

    set(key: string, value: T): void {
        if (!this.freeInds) {
            this.delete({ index: this.head });
        } 
        const index = this.freeInds.pop();
        if (index === undefined) {
            throw new Error("No free index available in LRUCache");
        }
        this.indMap.set(key, index);
        if (this.head >= 0) {
            this.cache[this.head].prev = index;
        }
        this.cache[index] = new LRUCacheItem<T>(key, value);
        this.cache[index].next = this.head;
        this.head = index;
    }
}

export default (config, { strapi }: { strapi: Core.Strapi }) => {
    const { 
        cacheTtl = 300,
        cacheSize = 1000,
    } = config || {};
    const cache = new LRUCache<CacheData>(cacheSize);

    return async (ctx, next) => {
        if (
            ctx.request.url.startsWith('/api/') 
            && ctx.request.method === 'GET'
        ) {
            strapi.log.info('Using custom Cache Middleware...');
            const cacheItem = cache.get(ctx.request.url);
            if (cacheItem !== null) {
                const { data, timestamp } = cacheItem;
                if (Date.now() - timestamp < cacheTtl * 1000) {
                    ctx.body = data;
                    ctx.response.status = 200;
                    strapi.log.info(`Returning cached response for ${ctx.request.url}`);
                    return;
                } else {
                    strapi.log.info(`Cache expired for ${ctx.request.url}`);
                    cache.delete(ctx.request.url);
                }
            } else {
                strapi.log.info(`Cache miss for ${ctx.request.url}`);
            }

            await next();
            if (ctx.response.status === 200 && ctx.body) {
                strapi.log.info(`Caching response for ${ctx.request.url}`);
                cache.set(ctx.request.url, { data: ctx.body, timestamp: Date.now() });
            }
        } else {
            await next();
        }
    }
}
