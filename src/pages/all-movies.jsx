import { useEffect, useState } from 'react'

import { Loader2 } from 'lucide-react'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { MaxWidthWrapper } from '@/components/max-width-wrapper'

const sortOptions = [
  { title: 'Popularity', value: 'popularity.desc' },
  { title: 'Vote Average', value: 'vote_average.desc' },
  { title: 'Vote Count', value: 'vote_count.desc' },
  { title: 'Revenue', value: 'revenue.desc' },
]

export default function TrendingMovies() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [value, setValue] = useState('popularity.desc')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const sortBy = searchParams.get('sort_by') || value

  const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=${sortBy}`

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
        const moviesData = await response.json()
        if (moviesData.results) {
          setMovies(moviesData.results)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMovies()
  }, [currentPage, sortBy])

  function handleValueChange(newValue) {
    setValue(newValue)
    navigate(`${location.pathname}?sort_by=${newValue}&page=${currentPage}`)
  }

  function handlePageChange(page) {
    navigate(`${location.pathname}?sort_by=${value}&page=${page}`)
  }

  function renderPaginationLink() {
    const pages = [currentPage, currentPage + 1, currentPage + 2]
    return pages.map((page) => (
      <PaginationItem key={page}>
        <PaginationLink
          isActive={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ))
  }

  if (isLoading || !movies) {
    return (
      <main className="mx-auto flex max-w-screen-sm flex-1 flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </main>
    )
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 py-5">
      <MaxWidthWrapper className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">All Movies</h2>
            <Select value={value} onValueChange={handleValueChange}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 && (
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
              />
            )}
          </PaginationItem>
          {renderPaginationLink()}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === 500}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  )
}
