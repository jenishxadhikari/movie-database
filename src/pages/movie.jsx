import { useEffect, useState } from 'react'

import { ArrowLeft, Bookmark, Delete, Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { MaxWidthWrapper } from '@/components/max-width-wrapper'

export default function Movie() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [director, setDirector] = useState([])
  const [actors, setActors] = useState([])
  const [isInWatchList, setIsInWatchList] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getWatchListStatus = (movieId) => {
    const watchList = JSON.parse(localStorage.getItem('WatchList')) || []
    setIsInWatchList(watchList.includes(movieId))
  }

  useEffect(() => {
    async function fetchMovieData() {
      try {
        setIsLoading(true)
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
            },
          }
        )
        const movieData = await movieResponse.json()
        setMovie(movieData)

        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
            },
          }
        )
        const creditsData = await creditsResponse.json()
        const actorsData = creditsData.cast
          .filter((actor) => actor.known_for_department === 'Acting')
          .slice(0, 6)
        const directorData = creditsData.crew
          .filter((director) => director.known_for_department === 'Directing')
          .slice(0, 1)

        setActors(actorsData)
        setDirector(directorData)

        getWatchListStatus(movieData.id)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMovieData()
  }, [id])

  const handleAddToWatchList = () => {
    const watchList = JSON.parse(localStorage.getItem('WatchList')) || []
    if (!watchList.includes(movie.id)) {
      watchList.push(movie.id)
      localStorage.setItem('WatchList', JSON.stringify(watchList))
      setIsInWatchList(true)
      toast.success('Movie added to Watch List')
    }
  }

  const handleRemoveFromWatchList = () => {
    const watchList = JSON.parse(localStorage.getItem('WatchList')) || []
    if (watchList.includes(movie.id)) {
      const updatedWatchList = watchList.filter((id) => id !== movie.id)
      localStorage.setItem('WatchList', JSON.stringify(updatedWatchList))
      setIsInWatchList(false)
      toast.error('Movie removed from Watch List')
    }
  }

  if (isLoading || !movie) {
    return (
      <main className="mx-auto flex max-w-screen-sm flex-1 flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </main>
    )
  }

  return (
    <main className="relative mx-auto flex max-w-screen-sm flex-1 flex-col items-center justify-center gap-10 py-5">
      <Button
        className="absolute left-3 top-3"
        variant="outline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft /> Back
      </Button>

      <MaxWidthWrapper className="grid grid-cols-1 justify-items-center gap-4">
        <div>
          <img
            src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
            alt={movie.title}
            className="h-40 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <h1 className="text-center text-xl font-semibold">
              {movie.title}
              <span className="block text-pretty text-sm font-medium text-zinc-500">
                {movie.tagline}
              </span>
            </h1>

            <ul className="flex flex-wrap justify-center gap-2">
              {movie.genres &&
                movie.genres.map((item, index) => (
                  <li
                    key={index}
                    className="rounded-md border-2 border-zinc-500 px-2 py-1 text-xs"
                  >
                    {item.name}
                  </li>
                ))}
            </ul>

            <div className="flex w-full justify-center">
              {!isInWatchList ? (
                <Button
                  variant="outline"
                  className="text-blue-400"
                  onClick={handleAddToWatchList}
                >
                  <Bookmark /> Add to Watchlist
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="text-red-400"
                  onClick={handleRemoveFromWatchList}
                >
                  <Delete /> Remove
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-3 rounded-md bg-primary/20 p-4 text-sm">
            <p>
              <strong>User Rating:</strong> ⭐ {movie.vote_average}/10
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime} Minutes
            </p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Overview:</strong> {movie.overview}
            </p>
            <p>
              <strong>Directed By:</strong>{' '}
              {director.map((director) => director.name).join(', ')}
            </p>
            <p>
              <strong>Actors:</strong>{' '}
              {actors.map((actor) => actor.name).join(', ')} ...
            </p>
          </div>

          <div className="space-y-3 rounded-md bg-emerald-100 p-4 text-sm">
            <p>
              <strong>Status:</strong> {movie.status}
            </p>
            <p>
              <strong>Spoken Language:</strong>{' '}
              {movie.spoken_languages
                .map((language) => language.name)
                .join(', ')}
            </p>
            {movie.budget > 0 && (
              <p>
                <strong>Budget:</strong> ${movie.budget.toLocaleString()}
              </p>
            )}
            {movie.revenue > 0 && (
              <p>
                <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  )
}
