import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import SignUp from './components/Signup.jsx';
import SignIn from './components/Signin.jsx';
import Homepage from './components/Homepage.jsx';
import AddBookForm from './components/AddBookForm.jsx';
import BookSearch from './components/BookSearch.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<Homepage />} />
      <Route path='/addBook' element={<AddBookForm />}></Route>
      <Route path='/searchBook' element={<BookSearch/>}></Route>
    </Routes>
  </Router>
);
