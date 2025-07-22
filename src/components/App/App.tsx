import { useState } from 'react'

import './App.module.css'
import fetchMovies from '../../services/movieService'
import SearchBar from '../SearchBar/SearchBar'
import toast, { Toaster } from 'react-hot-toast'
import MovieGrid from '../MovieGrid/MovieGrid'
import { Movie } from '../../types/movie'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieModal, setMovieModal] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setIsError(false);
      setMovies([]);
      const response = await fetchMovies(query.trim());

      if (response.results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(response.results);

    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }

  }

  const openModal = (movie: Movie) => {
    setIsModalOpen(true);
    setMovieModal(movie);



  }

  const closeModal = () => {
    setIsModalOpen(false);
    setMovieModal(null);

  }


  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
      {isModalOpen && movieModal && <MovieModal movie={movieModal} onClose={closeModal} />}
    </>
  )
}

export default App
