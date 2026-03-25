import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

async function handler(request: NextRequest) {
  const secret = request.headers.get('x-revalidation-token') || request.nextUrl.searchParams.get('secret');
  
  // Try to get parameters from query string
  let tag = request.nextUrl.searchParams.get('tag');
  let path = request.nextUrl.searchParams.get('path');
  let type = request.nextUrl.searchParams.get('type') as 'page' | 'layout' | undefined;

  // NextUrl.searchParams.get returns string | null, but revalidatePath expects undefined if missing.
  if (type === null) type = undefined;

  // If not present in query string and it's a POST, try body
  if (request.method === 'POST' && !tag && !path) {
    try {
        const body = await request.json();
        tag = body.tag || tag;
        path = body.path || path;
        type = body.type || type;
    } catch {
        // Ignore body parsing errors
    }
  }

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  if (tag) {
    revalidateTag(tag, 'default');
    return NextResponse.json({ revalidated: true, now: Date.now(), tag });
  }
  
  if (path) {
    revalidatePath(path, type);
    return NextResponse.json({ revalidated: true, now: Date.now(), path, type });
  }

  return NextResponse.json({ message: 'Missing tag or path to revalidate' }, { status: 400 });
}

export async function POST(request: NextRequest) {
    return handler(request);
}

export async function GET(request: NextRequest) {
    return handler(request);
}
