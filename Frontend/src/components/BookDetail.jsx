import React from 'react';
import axios from 'axios';
import './BookDetail.css';

const BookDetail = ({ book }) => {
  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', book);
  
      // Ensure the book object has the required fields
      const bookDetails = {
        ISBN: book.isbn13,
        title: book.title,
        author: book.author,
        price: book.price,
        stock: book.stock,
        genre: book.genre,
        seller: book.sellerId,
        thumbnail: book.thumbnail,
      };
  
      const response = await axios.post(
        'http://localhost:3000/wishlist/add',
        { bookDetails }, // Send the book details with the correct fields
        {
          headers: {
            Authorization: `${token}`,  // Ensure correct token format
          },
        }
      );
      alert(response.data.message || 'Book added to wishlist!');
    } catch (error) {
      console.error('Error adding book to wishlist:', error);
      alert(error.response?.data?.message || 'Failed to add book to wishlist.');
    }
  };
  

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add items to the cart.');
        return;
      }
  
      // Ensure the book object has the necessary fields
      const bookId = book._id; // Replace with the actual ID of the book
      const quantity = 1; // Default quantity to 1 (you can change this if needed)
  
      const response = await axios.post(
        'http://localhost:3000/cart/add-to-cart',
        { bookId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer token format
          },
        }
      );
  
      alert(response.data.message || 'Book added to cart!');
    } catch (error) {
      console.error('Error adding book to cart:', error);
      alert(error.response?.data?.message || 'Failed to add book to cart.');
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap md:flex-nowrap items-start gap-6">
        {/* Book Thumbnail */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={book.thumbnail || '/placeholder-book.jpg'}
            alt={book.title}
            className="w-full max-w-sm rounded-lg shadow-md"
          />
        </div>

        {/* Book Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">
            Author: {book.author || 'Unknown Author'} {/* Display single author */}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>ISBN:</strong> {book.isbn13}
            </div>
            <div>
              <strong>Publisher:</strong> {book.publisher}
            </div>
            <div>
              <strong>Published Date:</strong> {book.publishedDate}
            </div>
            <div>
              <strong>Page Count:</strong> {book.pageCount}
            </div>
            <div>
              <strong>Genre:</strong> {book.genre} {/* Display single genre */}
            </div>
            <div>
              <strong>Language:</strong> {book.language}
            </div>
            {/* Display price if available */}
            {book.price && (
              <div>
                <strong>Price:</strong> ${book.price.toFixed(2)}
              </div>
            )}
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700">{book.description}</p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToWishlist}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add to Wishlist
            </button>
            <button
             onClick={handleAddToCart}
             style={{
               backgroundColor: book.price ? 'blue' : 'gray',
               cursor: book.price ? 'pointer' : 'not-allowed',
            }}
               className={`text-white px-4 py-2 rounded ${
              book.price ? 'hover:bg-blue-600' : ''
             }`}
  disabled={!book.price}
>
  Add to Cart
</button>

          </div>

          {/* More Information */}
          <div className="mt-6">
            <a
              href={book.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              More Information
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
