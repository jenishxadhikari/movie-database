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

export default function Watchlist() {
  const [wishListMovies, setWishListMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true)
      try {
        const watchList = JSON.parse(localStorage.getItem('WatchList')) || []

        const movies = []
        for (const movieId of watchList) {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
              },
            }
          )
          const movieData = await response.json()
          movies.push(movieData)
        }
        setWishListMovies(movies)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMovies()
  }, [])

  if (isLoading || !wishListMovies) {
    return (
      <main className="mx-auto flex max-w-screen-sm flex-1 flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </main>
    )
  }

  return (
    <main className="flex flex-1 flex-col gap-10 py-5">
      <MaxWidthWrapper>
        <h1 className="text-xl font-semibold">Your Watchlist</h1>
      </MaxWidthWrapper>
      <section>
        <MaxWidthWrapper className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {wishListMovies.map((movie, index) => (
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
    </main>
  )
}
