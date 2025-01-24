import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { PopularSection } from '@/components/home/popular-section'
import { TopRatedSection } from '@/components/home/top-rated'
import { TrendingSection } from '@/components/home/trending-section'
import { MaxWidthWrapper } from '@/components/max-width-wrapper'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 py-5">
      <MaxWidthWrapper className="space-y-4">
        <h1 className="text-center text-xl font-bold md:text-2xl lg:text-3xl">
          Find Your Next Favorite Movie
        </h1>
        <div className="ml-auto flex max-w-[400px] items-center gap-2 md:hidden">
          <Input type="search" className="border-zinc-500" />
          <Button size="icon">
            <Search />
          </Button>
        </div>
      </MaxWidthWrapper>
      <TrendingSection />
      <TopRatedSection />
      <PopularSection />
    </main>
  )
}
