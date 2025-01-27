import { Link } from 'react-router-dom'

import { CardContainer } from '@/components/card-container'

export function PopularSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Popular Movies</h2>
        </div>
        <Link to="/movies/popular" className="text-xs text-blue-400 underline">
          View All
        </Link>
      </div>
      <CardContainer
        apiUrl="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
        home={true}
      />
    </section>
  )
}
