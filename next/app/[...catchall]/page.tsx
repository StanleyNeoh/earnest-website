import { redirect } from 'next/navigation';

export default function CatchallRedirectPage() {
  redirect('/');
  return null;
}
