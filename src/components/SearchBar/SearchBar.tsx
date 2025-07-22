import toast, { Toaster } from 'react-hot-toast';
import styles from './SearchBar.module.css';
import { useState } from 'react';

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const [isErrorNotif, setIsErrorNotif] = useState(false);

    const handleClickSubmit = (formData: FormData) => {
        const query = formData.get('query') as string;

        if (query === '') {
            setIsErrorNotif(true);
            toast.error('Please enter your search query.');
            return;
        } else {
            setIsErrorNotif(false);
            onSubmit(query);
        }

    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={styles.form} action={handleClickSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={styles.button} type="submit" >
                        Search
                    </button>
                </form>
            </div>
            {isErrorNotif && <Toaster />}
        </header>

    )
}