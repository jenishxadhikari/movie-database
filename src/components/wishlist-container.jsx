import { useEffect, useState } from 'react'

import { Loader2 } from 'lucide-react'

import { CardWrapper } from '@/components/card-wrapper'

export function WishListContainer() {
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
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
      {wishListMovies.map((movie, index) => (
        <CardWrapper key={index} movie={movie} />
      ))}
    </section>
  )
}
