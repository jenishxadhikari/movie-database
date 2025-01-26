import { CardWrapper } from '@/components/home/card-wrapper'

export function PopularSection() {
  const title = 'Popular Movies'
  return (
    <CardWrapper
      API_URL="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
      title={title}
      to={`/movies/popular`}
    />
  )
}
