'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface Movie {
    _id: string;
    name: string;
    image: string;
}

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Fetching movies...");
        axios.get('/api/movie')
            .then(response => {
                console.log("Movies fetched successfully:", response.data);
                setMovies(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching movies:", err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/movie/${id}`);
            setMovies(movies.filter(movie => movie._id !== id));
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="movies-container">
            <h1>Movies</h1>
            <Link href="/movies/create" className="add-movie-button">Add Movie</Link>
            {movies.length === 0 ? (
                <p>No movies available</p>
            ) : (
                <div className="movies-list">
                {movies.map(movie => (
                    <div key={movie._id} className="movie-card">
                        <h2>{movie.name}</h2>
                        <Image src={movie.image} alt={movie.name} width={300} height={200} className="movie-image" />
                        <Link href={`/movies/${movie._id}`} className="view-link">View</Link>
                        <button><Link href={`/movies/${movie._id}/update`} className="update-link">Update</Link></button>
                        <button onClick={() => handleDelete(movie._id)}>Delete</button>
                    </div>
                ))}
            </div>
            
                
            )}
        </div>
    );
};

export default MoviesPage;
