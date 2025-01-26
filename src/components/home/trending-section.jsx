import { CardWrapper } from '@/components/home/card-wrapper'

export function TrendingSection() {
  const title = 'Trending Movies'
  return (
    <CardWrapper
      API_URL="https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=1"
      title={title}
      to={`/movies/trending`}
      select={true}
    />
  )
}
