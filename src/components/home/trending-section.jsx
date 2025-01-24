import { CardWrapper } from '@/components/card-wrapper'

export function TrendingSection() {
  const title = 'Trending Movies'
  return (
    <CardWrapper
      API_URL="https://api.themoviedb.org/3/trending/movie/week?language=en-US"
      title={title}
      to={`/movies?id=/trending/movie/week&title=${encodeURIComponent(title)}`}
      select={true}
    />
  )
}
