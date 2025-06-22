import fetchContentType from '@/lib/strapi/fetchContentType';
import { revalidatePath } from 'next/cache';

export async function POST() {
  // Make a POST request to the backend to clear cache
  const backendRes = await fetchContentType('clear_cache');
  revalidatePath('/', 'layout');
  return Response.json({ revalidated: true, backend: backendRes });
}
