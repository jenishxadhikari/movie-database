import { useState } from 'react'

import { Link } from 'react-router-dom'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

import { CardContainer } from '@/components/card-container'

export function TrendingSection() {
  const [value, setValue] = useState('week')
  const apiUrl = `https://api.themoviedb.org/3/trending/movie/${value}?language=en-US&page=1`

  function handleValueChange(newValue) {
    setValue(newValue)
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
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
        <Link to="/movies/trending" className="text-xs text-blue-400 underline">
          View All
        </Link>
      </div>
      <CardContainer apiUrl={apiUrl} home={true} />
    </section>
  )
}
