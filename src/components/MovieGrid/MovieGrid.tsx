import { Movie } from "../../types/movie";
import css from './MovieGrid.module.css'


interface MovieGridProps {
    onSelect: (movie: Movie) => void;
    movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {

    return (
        <ul className={css.grid}>
            {movies.map((movie) => {
                const { id, poster_path, title } = movie;
                const imgUrl: string = `https://image.tmdb.org/t/p/w500/${poster_path}`

                return (
                    <li key={id} onClick={() => onSelect(movie)}>
                        <div className={css.card}>
                            <img
                                className={css.image}
                                src={imgUrl}
                                alt={title}
                                loading="lazy"
                            />
                            <h2 className={css.title}>{title}</h2>
                        </div>
                    </li>
                )
            }

            )}

        </ul>

    )
}