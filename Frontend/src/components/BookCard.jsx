import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookCard.css';  // Importing BookCard.css

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book/${book.isbn13}`, { state: { book } });
  };

  return (
    <div className="book-card" onClick={handleCardClick}>
      <img
        src={book.thumbnail || '/placeholder-book.jpg'}
        alt={`${book.title} cover`}
      />
      <div>
        <h2 className="title">{book.title}</h2>
        <p className="author">{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
