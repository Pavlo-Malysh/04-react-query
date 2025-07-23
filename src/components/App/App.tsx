import { useEffect, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import css from './App.module.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieModal, setMovieModal] = useState<Movie | null>(null);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', search, currentPage],
    queryFn: () => fetchMovies(search, currentPage),
    enabled: search.length > 0,
    placeholderData: keepPreviousData,
  })
  console.log(data, isLoading, isError);

  const totalPages = data?.total_pages ?? 0;
  console.log('total page:', totalPages);


  const handleSearch = (query: string) => {
    setSearch(query);
    setCurrentPage(1);
  }

  useEffect(() => {
    if (isSuccess && (data.results.length === 0)) {
      toast.error("No movies found for your request.");
    }
  }, [isSuccess, data])



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
      {isSuccess && totalPages > 1 && <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
        renderOnZeroPageCount={null}
      />}


      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.results.length > 0 && <MovieGrid onSelect={openModal} movies={data.results} />}
      {isModalOpen && movieModal && <MovieModal movie={movieModal} onClose={closeModal} />}
    </>
  )
}

export default App
