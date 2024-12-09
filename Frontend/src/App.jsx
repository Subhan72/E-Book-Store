import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Home from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import BookDetailPage1 from "./pages/BookDetailPage1";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/cartPage";
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header /> 
            <Routes>
                <Route path="/" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/book/:isbn13" element={<BookDetailPage />} />
                <Route path="/book1/:ISBN" element={<BookDetailPage1 />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </Router>
    );
}

export default App;
