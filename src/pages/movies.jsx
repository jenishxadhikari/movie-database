import { useState } from 'react'

import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { MaxWidthWrapper } from '@/components/max-width-wrapper'

export default function Movies() {
  const navigate = useNavigate()
  const location = useLocation()

  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const query = searchParams.get('query')
  console.log(query)

  function handlePageChange(page) {
    const url =
      query !== null
        ? `${location.pathname}?${query}&page=${page}`
        : `${location.pathname}?page=${page}`
    navigate(url)
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
      <MaxWidthWrapper className="flex-1">
        <Outlet />
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
