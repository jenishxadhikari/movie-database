import { useState } from 'react'
import { createContext } from 'react'

export const PaginationContext = createContext()

export function PaginationProvider({ children }) {
  const [totalPages, setTotalPages] = useState(10)
  return (
    <PaginationContext.Provider value={{ totalPages, setTotalPages }}>
      {children}
    </PaginationContext.Provider>
  )
}
