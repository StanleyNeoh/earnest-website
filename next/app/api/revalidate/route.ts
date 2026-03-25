import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-revalidation-token') || request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get('tag');
  const path = request.nextUrl.searchParams.get('path');
  const type = request.nextUrl.searchParams.get('type') as 'page' | 'layout' | undefined;

  if (tag) {
    revalidateTag(tag, 'default');
    return NextResponse.json({ revalidated: true, now: Date.now(), tag });
  }
  
  if (path) {
    revalidatePath(path, type);
    return NextResponse.json({ revalidated: true, now: Date.now(), path, type });
  }

  // If no tag or path provided, revalidate everything
  revalidatePath('/', 'layout');
  return NextResponse.json({ revalidated: true, now: Date.now(), message: 'Revalidated all' });
}
