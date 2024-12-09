import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WishListCard from '../components/WishListCard';

const WishlistPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/wishlist', {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setBooks(response.data.books || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching wishlist:', err);
                setError(err.response?.data?.message || 'Failed to fetch wishlist');
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const handleRemoveBook = (bookId) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId)); // Remove by _id
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
            {books.length === 0 ? (
                <p className="text-gray-600">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <WishListCard
                            key={book._id}
                            book={book}
                            onRemove={handleRemoveBook}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
