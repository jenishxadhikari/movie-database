import { MaxWidthWrapper } from '@/components/max-width-wrapper'
import { WishListContainer } from '@/components/wishlist-container'

export default function Watchlist() {
  return (
    <main className="flex flex-1 flex-col gap-10 py-5 md:py-10">
      <MaxWidthWrapper className="flex-1 space-y-4">
        <h1 className="text-xl font-semibold">My Watchlist</h1>
        <WishListContainer />
      </MaxWidthWrapper>
    </main>
  )
}
