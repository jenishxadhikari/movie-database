import { useEffect, useState } from 'react'

import { ArrowLeft, Bookmark, Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { MaxWidthWrapper } from '@/components/max-width-wrapper'

export default function Movie() {
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [directors, setDirectors] = useState([])
  const [actors, setActors] = useState([])
  const { id } = useParams()

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
            },
          }
        )
        const data = await response.json()
        setMovie(data)
      } catch (error) {
        console.error('Failed to fetch movie:', error)
      }
    }

    async function fetchCredits() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
            },
          }
        )
        const data = await response.json()
        const actorsData = data.cast
          .filter((actor) => actor.known_for_department === 'Acting')
          .slice(0, 6)
        const directorsData = data.crew
          .filter((director) => director.known_for_department === 'Directing')
          .slice(0, 1)
        setActors(actorsData)
        setDirectors(directorsData)
      } catch (error) {
        console.error('Failed to fetch credits:', error)
      }
    }

    fetchMovie()
    fetchCredits()
  }, [])

  if (!movie) {
    return (
      <main className="mx-auto flex max-w-screen-sm flex-1 flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" />
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
              <Button variant="outline">
                <Bookmark /> Add to Watchlist
              </Button>
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
              {directors.map((director) => director.name).join(', ')}
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
