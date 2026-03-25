import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidation-token') || request.nextUrl.searchParams.get('secret');
  const tag = request.nextUrl.searchParams.get('tag');

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  if (tag) {
    revalidateTag(tag, 'default');
    return NextResponse.json({ revalidated: true, now: Date.now(), tag });
  }

  return NextResponse.json({ message: 'Missing tag to revalidate' }, { status: 400 });
}
