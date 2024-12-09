import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartCard from '../components/cartCard';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/get-cart', {
                    headers: { Authorization: `${token}` },
                });
                setCartItems(response.data.items || []);
                setSubTotal(response.data.subTotal || 0);
                setError(null);
            } catch (err) {
                console.error('Error fetching cart:', err);
                setError(err.response?.data?.message || 'Failed to fetch cart');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleRemoveItem = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    };

    const handleUpdateQuantity = (itemId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cartItems.map((item) => (
                        <CartCard
                            key={item._id}
                            item={item}
                            onRemove={handleRemoveItem}
                            onUpdateQuantity={handleUpdateQuantity}
                        />
                    ))}
                </div>
            )}
            <div className="mt-6">
                <h2 className="text-xl font-bold">Subtotal: ${subTotal}</h2>
            </div>
        </div>
    );
};

export default CartPage;
