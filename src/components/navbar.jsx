import { useState } from 'react'

import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { MaxWidthWrapper } from '@/components/max-width-wrapper'

export function Navbar() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  function handleSearch() {
    navigate(`/movies/search?query=${value}`)
  }

  return (
    <header className="h-16 border-b-2">
      <MaxWidthWrapper className="flex items-center justify-between">
        <Link to="/" className="font-bold md:text-lg">
          Movie
          <span className="bg-primary p-0.5 text-white">Database</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to={`/all-movies`}
            className="text-sm font-semibold decoration-blue-500 decoration-2 underline-offset-2 hover:underline"
          >
            All Movies
          </Link>
          <Link
            to="/watchlist"
            className="text-sm font-semibold decoration-blue-500 decoration-2 underline-offset-2 hover:underline"
          >
            My Watchlist
          </Link>
          <div className="ml-auto hidden items-center gap-2 md:flex md:w-[300px] lg:w-[400px]">
            <Input
              type="search"
              className="border-zinc-500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button onClick={handleSearch}>
              <Search />
            </Button>
          </div>
        </nav>
      </MaxWidthWrapper>
    </header>
  )
}
