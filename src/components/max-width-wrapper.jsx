import { cn } from '@/lib/utils'

export function MaxWidthWrapper({ children, className }) {
  return (
    <div
      className={cn(
        className,
        'mx-auto h-full w-full max-w-screen-xl px-4 md:px-10'
      )}
    >
      {children}
    </div>
  )
}
