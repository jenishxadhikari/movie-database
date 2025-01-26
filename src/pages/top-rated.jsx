import { useEffect, useState } from 'react'

import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { MaxWidthWrapper } from '@/components/max-width-wrapper'

export default function TopRatedMovies() {
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    setIsLoading(true)
    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
            },
          }
        )
        const moviesData = await response.json()
        setMovies(moviesData.results)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMovies()
  }, [])

  if (isLoading || !movies) {
    return (
      <main className="mx-auto flex max-w-screen-sm flex-1 flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </main>
    )
  }
  return (
    <section>
      <MaxWidthWrapper className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Top Rated Movies</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {movies.map((movie, index) => (
            <Card key={index} className="flex p-2">
              <img
                src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                alt={movie.title}
                className="h-40 rounded-md"
              />
              <div className="flex flex-col justify-around">
                <CardHeader className="p-0 px-4">
                  <CardTitle className="text-pretty">
                    <Link
                      className="hover:text-primary"
                      to={`/movie/${movie.id}`}
                    >
                      {movie.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{movie.release_date}</CardDescription>
                </CardHeader>
                <CardFooter className="p-0 px-4">
                  <p className="line-clamp-3 text-sm">{movie.overview}</p>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
