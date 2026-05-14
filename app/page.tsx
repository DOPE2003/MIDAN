import { redirect } from 'next/navigation'

// The middleware redirects / → /ar, but this is a safety fallback
export default function RootPage() {
  redirect('/ar')
}
