import React from 'react';
import { useLocation } from 'react-router-dom';
import BookDetail from '../components/BookDetail';

const BookDetailPage = () => {
  const location = useLocation();
  const book = location.state?.book;

  if (!book) {
    return <div>No book selected</div>;
  }

  return <BookDetail book={book} />;
};

export default BookDetailPage;
