import React, { useState } from 'react';
import axios from 'axios';
import BookDetails from './BookDetails'; 

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/catalog/search', {
        params: { query }
      });
      setBooks(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching books');
      setBooks([]);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="book-search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {selectedBook ? (
        <BookDetails book={selectedBook} />
      ) : (
        <div className="book-table">
          {books.length > 0 ? (
            books.map((book, index) => (
              <div key={index} className="book-box" onClick={() => handleBookClick(book)}>
                <img src={book.imageUrl} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
