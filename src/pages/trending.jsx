import { useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

import { CardContainer } from '@/components/card-container'

export default function TrendingSection() {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const [value, setValue] = useState('week')
  const apiUrl = `https://api.themoviedb.org/3/trending/movie/${value}?language=en-US&page=${page}`

  function handleValueChange(newValue) {
    setValue(newValue)
  }

  return (
    <section className="flex flex-1 flex-col justify-between gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Trending Movies</h2>
        <Select value={value} onValueChange={handleValueChange}>
          <SelectTrigger className="w-fit">
            {value === 'week' ? 'This Week' : 'Today'}
          </SelectTrigger>
          <SelectContent>
            {value === 'week' ? (
              <SelectItem value="day">Today</SelectItem>
            ) : (
              <SelectItem value="week">This Week</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <CardContainer apiUrl={apiUrl} />
    </section>
  )
}
