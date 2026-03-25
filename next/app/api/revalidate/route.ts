import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import fetchContentType from '@/lib/strapi/fetchContentType';

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-revalidation-token') || request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get('tag');
  const path = request.nextUrl.searchParams.get('path');
  const type = request.nextUrl.searchParams.get('type') as 'page' | 'layout' | undefined;
  const propToBackend = request.nextUrl.searchParams.get('prop_to_backend') !== 'false';

  if (propToBackend) {
    try {
      await fetchContentType('clear_cache');
    } catch (error) {
      console.error('Failed to propagate cache clear to backend:', error);
    }
  }

  if (tag) {
    revalidateTag(tag, 'default');
    return NextResponse.json({ revalidated: true, now: Date.now(), tag, backend_cleared: propToBackend });
  }
  
  if (path) {
    revalidatePath(path, type);
    return NextResponse.json({ revalidated: true, now: Date.now(), path, type, backend_cleared: propToBackend });
  }

  // If no tag or path provided, revalidate everything
  revalidatePath('/', 'layout');
  return NextResponse.json({ revalidated: true, now: Date.now(), message: 'Revalidated all', backend_cleared: propToBackend });
}
