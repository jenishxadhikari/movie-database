import { useState } from 'react'

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

import { CardContainer } from '@/components/card-container'
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
  const sortBy = searchParams.get('sort_by') || value

  const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=${sortBy}`

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

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 py-5 md:py-10">
      <MaxWidthWrapper className="flex-1 space-y-4">
        <section className="flex flex-1 flex-col justify-between gap-4">
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
          <CardContainer apiUrl={apiUrl} />
        </section>
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
