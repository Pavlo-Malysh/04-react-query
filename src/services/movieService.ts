import axios from "axios";
import { Movie } from "../types/movie";

interface MoviesHttpResponse {
    results: Movie[];
    total_pages: number;
}

const myKey = import.meta.env.VITE_TMDB_TOKEN

axios.defaults.baseURL = 'https://api.themoviedb.org/3/search';


export default async function fetchMovies(search: string, page: number): Promise<MoviesHttpResponse> {

    const response = await axios.get<MoviesHttpResponse>('/movie', {
        params: {
            query: search,
            page,
        },
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    })

    return response.data

}
