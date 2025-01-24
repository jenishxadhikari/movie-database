import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import Home from './pages/home.jsx'
import Movie from './pages/movie.jsx'
import Movies from './pages/movies.jsx'
import Watchlist from './pages/watchlist.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
