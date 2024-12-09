import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WishListCard.css';
import axios from 'axios';

const WishListCard = ({ book, onRemove }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/book/${book.ISBN}`, { state: { book } });
    };

    const handleRemoveClick = async () => {
        try {
            const response = await axios.delete('http://localhost:3000/wishlist/remove', {
                data: { bookISBN: book.ISBN },  // Use book.ISBN to match the controller
                headers: { Authorization: `${localStorage.getItem('token')}` }  // Use Bearer token if required
            });
            onRemove(book._id);  // Pass the book ID to remove it from the state
            console.log('Book removed successfully:', response.data);
        } catch (err) {
            console.error('Error removing book:', err.response?.data || err.message);
        }
    };
    

    return (
        <div className="border rounded-lg p-4 shadow-md flex flex-col">
            <img
                src={book.thumbnail || '/placeholder-book.jpg'}
                alt={book.title}
                className="w-full h-48 object-cover mb-4 cursor-pointer"
                onClick={handleCardClick}
            />
            <h2
                className="text-xl font-bold cursor-pointer"
                onClick={handleCardClick}
            >
                {book.title}
            </h2>
            <p className="text-gray-600">By: {book.author}</p> {/* Changed to 'author' from 'authors' */}
            <button
                onClick={handleRemoveClick}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Remove
            </button>
        </div>
    );
};

export default WishListCard;
