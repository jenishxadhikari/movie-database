import { PaginationProvider } from '@/context/pagination-context'
import { Outlet } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

function App() {
  return (
    <PaginationProvider>
      <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-800">
        <Navbar />
        <Outlet />
        <Toaster />
        <Footer />
      </div>
    </PaginationProvider>
  )
}

export default App
