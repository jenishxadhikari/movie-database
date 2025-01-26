import { Outlet } from 'react-router-dom'

export default function Movies() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 py-5">
      <Outlet />
    </main>
  )
}
