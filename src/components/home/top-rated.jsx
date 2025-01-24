import { CardWrapper } from '@/components/card-wrapper'

export function TopRatedSection() {
  const title = 'Top Rated'
  return (
    <CardWrapper
      API_URL="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
      title={title}
      to={`/movies?id=/movie/top_rated&title=${encodeURIComponent(title)}`}
    />
  )
}
