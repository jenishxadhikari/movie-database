import { Loader2 } from 'lucide-react'

export default function AllMovies() {
  return (
    <main className="mx-auto flex max-w-screen-sm flex-1 flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
    </main>
  )
}
