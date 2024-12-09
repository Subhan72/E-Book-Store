import React from 'react';
import { useLocation } from 'react-router-dom';
import BookDetail1 from '../components/BookDetail1';

const BookDetailPage1 = () => {
  const location = useLocation();
  const book = location.state?.book;

  if (!book) {
    return <div>No book selected</div>;
  }

  return <BookDetail1 book={book} />;
};

export default BookDetailPage1;
