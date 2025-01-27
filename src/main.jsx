import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import AllMovies from './pages/all-movies.jsx'
import Home from './pages/home.jsx'
import Movie from './pages/movie.jsx'
import Movies from './pages/movies.jsx'
import PopularMovies from './pages/popular.jsx'
import SearchMovies from './pages/search.jsx'
import TopRatedMovies from './pages/top-rated.jsx'
import TrendingMovies from './pages/trending.jsx'
import WatchList from './pages/watchlist.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />

          <Route path="/movie/:id" element={<Movie />} />

          <Route path="/movies" element={<Movies />}>
            <Route path="popular" element={<PopularMovies />} />
            <Route path="top-rated" element={<TopRatedMovies />} />
            <Route path="trending" element={<TrendingMovies />} />
            <Route path="search" element={<SearchMovies />} />
          </Route>

          <Route path="watchlist" element={<WatchList />} />
          <Route path="/all-movies" element={<AllMovies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
