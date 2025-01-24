import { CardWrapper } from '@/components/card-wrapper'

export function PopularSection() {
  const title = 'Popular Movies'
  return (
    <CardWrapper
      API_URL="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
      title={title}
      to={`/movies?id=/movie/popular&title=${encodeURIComponent(title)}`}
    />
  )
}
