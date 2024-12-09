import React, { useState, useEffect } from 'react';
import { fetchBooksFromServer } from '../api/Books';
import BookCard from '../components/BookCard';
import './Home.css';
import heroImage from '../assets/hero.png';

const Home = () => {
  const [fictionBooks, setFictionBooks] = useState([]);
  const [nonFictionBooks, setNonFictionBooks] = useState([]);
  const [scienceBooks, setScienceBooks] = useState([]);
  const [historyBooks, setHistoryBooks] = useState([]);
  const [biographyBooks, setBiographyBooks] = useState([]);
  const [technologyBooks, setTechnologyBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load books for different categories
  useEffect(() => {
    const loadBooks = async (category, setter) => {
      try {
        setIsLoading(true);
        const fetchedBooks = await fetchBooksFromServer(category);
        setter(fetchedBooks);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadBooks('fiction', setFictionBooks);
    loadBooks('non-fiction', setNonFictionBooks);
    loadBooks('science', setScienceBooks);
    loadBooks('history', setHistoryBooks);
    loadBooks('biography', setBiographyBooks);
    loadBooks('technology', setTechnologyBooks);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />

      {/* Hero Image */}
      <div className="hero-image">
        <img
          src={heroImage} // Use the imported image
          alt="Hero Image"
          className="hero-img"
        />
      </div>

      {isLoading ? (
        <div>Loading books...</div>
      ) : (
        <div>
          {/* Fiction Books */}
          <h2>Fiction</h2>
          <div className="books-container">
            {fictionBooks.map((book) => (
              <div key={book.isbn13 || book.id} className="book-card-wrapper">
                <BookCard book={book} />
              </div>
            ))}
          </div>

          {/* Non-Fiction Books */}
          <h2>Non-Fiction</h2>
          <div className="books-container">
            {nonFictionBooks.map((book) => (
              <div key={book.isbn13 || book.id} className="book-card-wrapper">
                <BookCard book={book} />
              </div>
            ))}
          </div>

          {/* Science Books */}
          <h2>Science</h2>
          <div className="books-container">
            {scienceBooks.map((book) => (
              <div key={book.isbn13 || book.id} className="book-card-wrapper">
                <BookCard book={book} />
              </div>
            ))}
          </div>

          {/* History Books */}
          <h2>History</h2>
          <div className="books-container">
            {historyBooks.map((book) => (
              <div key={book.isbn13 || book.id} className="book-card-wrapper">
                <BookCard book={book} />
              </div>
            ))}
          </div>

          {/* Biography Books */}
          <h2>Biography</h2>
          <div className="books-container">
            {biographyBooks.map((book) => (
              <div key={book.isbn13 || book.id} className="book-card-wrapper">
                <BookCard book={book} />
              </div>
            ))}
          </div>

          {/* Technology Books */}
          <h2>Technology</h2>
          <div className="books-container">
            {technologyBooks.map((book) => (
              <div key={book.isbn13 || book.id} className="book-card-wrapper">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
