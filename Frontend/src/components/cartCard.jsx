import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './WishListCard.css'; // Optional: You can create a similar CSS file like the one for the wishlist card.

const CartCard = ({ item, onRemove, onUpdateQuantity }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/book/${item.bookId.ISBN}`, { state: { book: item.bookId } });
    };

    const handleRemoveClick = async () => {
        try {
            
    
            const response = await axios.delete('http://localhost:3000/remove-from-cart', {
                data: { bookId: item.bookId },  // Send bookId in the body
                headers: { 
                    Authorization: `${localStorage.getItem('token')}`  // Correctly format the Bearer token
                }
            });
    
            onRemove(item.bookId); 
            console.log('Book removed successfully:', response.data);
        } catch (err) {
            console.error('Error removing book:', err.response?.data || err.message);
        }
    };
    

    const handleQuantityChange = async (newQuantity) => {
        if (newQuantity <= 0) return;  // Ensure quantity is positive
    
        try {
            const token = localStorage.getItem('token');  // Get the JWT token from localStorage
    
            // Send the request with the token in the headers
            const response = await axios.put('http://localhost:3000/update-cart-item', {
                bookId: item.bookId._id,  // Pass bookId (not itemId) to match the controller
                quantity: newQuantity,  // Send the updated quantity
            }, {
                headers: {
                    Authorization: `${token}`  // Add the Bearer token to the request headers
                }
            });
    
            // Handle the UI update after successful quantity update
            onUpdateQuantity(item._id, newQuantity);
            console.log('Quantity updated successfully:', response.data);
        } catch (err) {
            console.error('Error updating quantity:', err.response?.data || err.message);
        }
    };
    
    return (
        <div className="border rounded-lg p-4 shadow-md flex flex-col">
            <img
                src={item.bookId.thumbnail || '/placeholder-book.jpg'}
                alt={item.bookId.title}
                className="w-full h-48 object-cover mb-4 cursor-pointer"
                onClick={handleCardClick}
            />
            <h2
                className="text-xl font-bold cursor-pointer"
                onClick={handleCardClick}
            >
                {item.bookId.title}
            </h2>
            <p className="text-gray-600">By: {item.bookId.author}</p>
            <p className="text-gray-600">Price: ${item.price}</p>
            <div className="flex items-center mt-2">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                >
                    -
                </button>
                <span className="mx-4">{item.quantity}</span>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                >
                    +
                </button>
            </div>
            <button
                onClick={handleRemoveClick}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Remove
            </button>
        </div>
    );
};

export default CartCard;
