import { Link } from 'react-router-dom'

import { buttonVariants } from '@/components/ui/button'

import { MaxWidthWrapper } from '@/components/max-width-wrapper'

export default function PageNotFound() {
  return (
    <main className="flex flex-1 flex-col">
      <MaxWidthWrapper className="flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold tracking-tighter">
          Lost in the clouds
        </h1>
        <p className="text-center text-muted-foreground">
          Whoops, looks like you took a wrong turn. Let's get you back home.
        </p>
        <Link
          to="/"
          className={buttonVariants({
            variant: 'outline',
          })}
        >
          Go back home
        </Link>
      </MaxWidthWrapper>
    </main>
  )
}
