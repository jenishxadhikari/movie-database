import { useSearchParams } from 'react-router-dom'

import { CardContainer } from '@/components/card-container'

export default function SearchMovies() {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const query = searchParams.get('query')
  const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}}`
  return (
    <section className="flex flex-1 flex-col justify-between gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Search result for: {query}</h2>
      </div>
      <CardContainer apiUrl={apiUrl} />
    </section>
  )
}
