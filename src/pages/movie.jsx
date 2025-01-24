import { useParams } from 'react-router-dom'

export default function Movie() {
  const { id } = useParams()
  return (
    <main className="flex flex-col items-center justify-center gap-10 py-5">
      Movie ID: {id}
    </main>
  )
}
