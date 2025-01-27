import { useEffect, useState } from 'react'

import { Loader2 } from 'lucide-react'

import { CardWrapper } from '@/components/card-wrapper'

export function CardContainer({ apiUrl, home = false }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    async function fetchMovies() {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
          },
        })
        const body = await response.json()
        const data = home ? body.results.splice(0, 6) : body.results
        setMovies(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMovies()
  }, [apiUrl])

  if (isLoading || !movies) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
      {movies.map((movie, index) => (
        <CardWrapper key={index} movie={movie} />
      ))}
    </div>
  )
}
