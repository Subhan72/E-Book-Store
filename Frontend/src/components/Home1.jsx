import './Home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard1 from '../components/BookCard1';
import heroImage from '../assets/hero.png';

const Home1 = () => {
  const [booksByCategory, setBooksByCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const genres = ['fiction', 'non-fiction', 'science', 'history', 'biography', 'technology'];

  // Load books by category
  useEffect(() => {
    const fetchBooksByGenre = async () => {
      try {
        setIsLoading(true);
        const genreBooks = {};

        for (const genre of genres) {
          const response = await axios.get(`http://localhost:3000/books/${genre}`); // Fetch from the backend route
          genreBooks[genre] = response.data;
        }

        setBooksByCategory(genreBooks);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchBooksByGenre();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero-image">
        <img src={heroImage} alt="Hero" className="hero-img" />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div>Loading books...</div>
      ) : (
        genres.map((genre) => (
          <div key={genre} className="genre-section">
            <h2>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
            <div className="books-container">
              {booksByCategory[genre]?.map((book) => (
                <div key={book.isbn || book._id} className="book-card-wrapper">
                  <BookCard1 book={book} />
                </div>
              )) || <p>No books available in this category.</p>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home1;
