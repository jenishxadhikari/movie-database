import { Link } from 'react-router-dom'

import { CardContainer } from '@/components/card-container'

export function TopRatedSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Top Rated Movies</h2>
        </div>

        <Link
          to="/movies/top-rated"
          className="text-xs text-blue-400 underline"
        >
          View All
        </Link>
      </div>
      <CardContainer
        apiUrl="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
        home={true}
      />
    </section>
  )
}
