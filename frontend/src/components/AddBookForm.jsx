import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AddBookForm.module.css'; // Import CSS module

const AddBookForm = () => {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [status, setStatus] = useState('active');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [customMetadata, setCustomMetadata] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isbn || !title || !publishedDate || !category) {
      setError('Please fill in all required fields!');
      return;
    }

    const bookData = {
      isbn,
      title,
      author,
      description,
      publishedDate,
      stock,
      price,
      discount,
      status,
      imageUrl,
      category,
      tags,
      customMetadata,
    };

    try {
        const token = localStorage.getItem('userToken');
        if (!token) {
          setError('You must be logged in to add a book');
          navigate('/signin');
          return;
        }
  
        const response = await axios.post(
          'http://localhost:5000/api/catalog/addbook',
          bookData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data) {
          alert('Book added successfully');
          navigate('/home');
        }} catch (err) {
      setError('Error adding book: ' + err.response?.data?.message || err.message);
    }
  };

  const handleTagChange = (e) => {
    setTags(e.target.value.split(',').map((tag) => tag.trim()));
  };

  const handleCustomMetadataChange = (e) => {
    try {
      setCustomMetadata(JSON.parse(e.target.value));
    } catch (error) {
      setError('Invalid JSON format for custom metadata');
    }
  };

//   useEffect(() => {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//       navigate('/signin');
//     }
//   }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Add a New Book</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="isbn">ISBN</label>
          <input
            id="isbn"
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />

          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="publishedDate">Published Date</label>
          <input
            id="publishedDate"
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            required
          />

          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor="discount">Discount</label>
          <input
            id="discount"
            type="number"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />

          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Available</option>
            <option value="inactive">Unavailable</option>
          </select>

          <label htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            placeholder="Tags (comma separated)"
            value={tags.join(', ')}
            onChange={handleTagChange}
          />

          <label htmlFor="customMetadata">Custom Metadata</label>
          <textarea
            id="customMetadata"
            placeholder="Custom Metadata (key:value format)"
            value={JSON.stringify(customMetadata)}
            onChange={handleCustomMetadataChange}
          />

          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
