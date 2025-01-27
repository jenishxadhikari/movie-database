import { useState } from 'react'

import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { PopularSection } from '@/components/home/popular-section'
import { TopRatedSection } from '@/components/home/top-rated'
import { TrendingSection } from '@/components/home/trending-section'
import { MaxWidthWrapper } from '@/components/max-width-wrapper'

export default function Home() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  function handleSearch() {
    navigate(`/movies/search?query=${value}`)
  }
  return (
    <main className="flex-1 py-5 md:py-10">
      <MaxWidthWrapper className="flex flex-col justify-center gap-8">
        <h1 className="text-center text-xl font-bold md:text-2xl lg:text-3xl">
          Find Your Next Favorite Movie
        </h1>
        <div className="ml-auto flex max-w-[400px] items-center gap-2 md:hidden">
          <Input
            type="search"
            className="border-zinc-500"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button size="icon" onClick={handleSearch}>
            <Search />
          </Button>
        </div>
        <div className="space-y-8 md:space-y-16">
          <TrendingSection />
          <TopRatedSection />
          <PopularSection />
        </div>
      </MaxWidthWrapper>
    </main>
  )
}
