import React from 'react';
import styles from './BookDetails.module.css'

const BookDetails = ({ book }) => {
  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Published Date:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>
      <p><strong>Category:</strong> {book.category}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <p><strong>Stock:</strong> {book.stock}</p>
      <p><strong>Status:</strong> {book.status}</p>
      <img src={book.imageUrl} alt={book.title} style={{ width: '200px' }} />
    </div>
  );
};

export default BookDetails;
