import { useState } from 'react'

import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { MaxWidthWrapper } from '@/components/max-width-wrapper'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleMenu() {
    setIsMenuOpen(!isMenuOpen)
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
            to={`/movies?id=/movie/top_rated&title=${encodeURIComponent('Top Rated')}`}
            className="text-sm font-semibold decoration-blue-500 decoration-2 underline-offset-2 hover:underline"
          >
            All Movies
          </Link>
          <Link
            to="/watchlist"
            className="text-sm font-semibold decoration-blue-500 decoration-2 underline-offset-2 hover:underline"
          >
            Watchlist
          </Link>
          <div className="ml-auto hidden items-center gap-2 md:flex md:w-[300px] lg:w-[400px]">
            <Input type="search" className="border-zinc-500" />
            <Button size="icon">
              <Search />
            </Button>
          </div>
        </nav>
      </MaxWidthWrapper>
    </header>
  )
}
