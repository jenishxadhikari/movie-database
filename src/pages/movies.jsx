import { useSearchParams } from 'react-router-dom'

import { CardWrapper } from '@/components/card-wrapper'

export default function Movies() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const title = searchParams.get('title')
  return (
    <main className="flex flex-col items-center justify-center gap-10 py-5">
      <CardWrapper
        API_URL={`https://api.themoviedb.org/3/${id}?language=en-US&page=1`}
        title={title}
        home={false}
      />
    </main>
  )
}
