import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
