import { Link } from 'react-router-dom'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function CardWrapper({ movie }) {
  const { poster_path, id, title, release_date, overview } = movie
  return (
    <Card className="flex p-2">
      <img
        src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${poster_path}`}
        alt={movie.title}
        className="h-40 rounded-md"
      />
      <div className="flex flex-col justify-around">
        <CardHeader className="p-0 px-4">
          <CardTitle className="text-pretty">
            <Link className="hover:text-primary" to={`/movie/${id}`}>
              {title}
            </Link>
          </CardTitle>
          <CardDescription>{release_date}</CardDescription>
        </CardHeader>
        <CardFooter className="p-0 px-4">
          <p className="line-clamp-3 text-sm">{overview}</p>
        </CardFooter>
      </div>
    </Card>
  )
}
