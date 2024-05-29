'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

const UpdateMoviePage = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!id) return;

        axios.get(`/api/movie/${id}`)
            .then(response => {
                const movie = response.data;
                setName(movie.name);
                setImage(movie.image);
                setGenres(movie.genres);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await axios.put(`/api/movie/${id}`, { name, image, genres });
            router.push('/movies');
        } catch (error) {
            console.error('Error updating movie:', error);
            setError('Error updating movie. Please try again.');
        }
    };

    return (
        <div className="update-movie-container">
            <h1>Update Movie</h1>
            <form onSubmit={handleSubmit} className="update-movie-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>
                {/* Add more fields as necessary */}
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateMoviePage;
