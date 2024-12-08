const { searchBooks, bulkImportBooks } = require('../config/openLibraryAPI');
const Book = require('../models/Book');


exports.createBook = async (req, res) => {
  try {
    const { isbn, title, author, description, publishedDate, stock, price, discount, status, imageUrl, category, tags, customMetadata } = req.body;

    // Create a new book instance
    const newBook = new Book({
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
      customMetadata
    });

    // Save the new book to the database
    await newBook.save();

    // Send response back to the client
    res.status(201).json({ message: 'Book created successfully', data: newBook });
  } catch (error) {
    res.status(400).json({ message: 'Error creating book', error: error.message });
  }
};


// Search and Import books from OpenLibrary
exports.searchAndImportBooks = async (req, res) => {
  try {
    const { query, page, limit } = req.query;
    const books = await searchBooks(query, page, limit);
    
    console.log('Searched Books:', books);
    
    // Ensure books is an array before processing
    if (Array.isArray(books)) {
      res.json(books);
    } else {
      console.error("Error: books is not an array", books);
      res.status(500).json({ message: 'Failed to retrieve books', error: books });
    }
  } catch (error) {
    console.error('Search and Import Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Bulk Import functionality
exports.bulkImportBooks = async (req, res) => {
  const { isbns } = req.body;  // Array of ISBNs
  
  try {
    const books = await bulkImportBooks(isbns);
    
    // Bulk create or update books in the database
    const bookDocuments = await Promise.all(books.map(async (bookData) => {
      // Destructure book data with default values
      const {
        isbn, 
        title, 
        author, 
        description, 
        publishedDate, 
        imageUrl, 
        category
      } = bookData;

      // Upsert the book - create if not exists, update if exists
      return Book.findOneAndUpdate(
        { isbn }, 
        { 
          isbn, 
          title, 
          author, 
          description, 
          publishedDate, 
          imageUrl, 
          category 
        }, 
        { 
          upsert: true, 
          new: true, 
          setDefaultsOnInsert: true 
        }
      );
    }));

    res.json({ message: 'Books imported successfully', books: bookDocuments });
  } catch (error) {
    console.error('Bulk Import Error:', error);
    res.status(500).json({ message: 'Failed to import books', error: error.message });
  }
};

// Store imported book data directly in the database
exports.storeBookData = async (req, res) => {
  const { 
    isbn, 
    title, 
    author, 
    description, 
    publishedDate, 
    imageUrl, 
    category,
    stock = 0,
    price = 0,
    discount = 0
  } = req.body;

  try {
    // Upsert the book - create if not exists, update if exists
    const book = await Book.findOneAndUpdate(
      { isbn }, 
      { 
        isbn, 
        title, 
        author, 
        description, 
        publishedDate, 
        imageUrl, 
        category,
        stock,
        price,
        discount
      }, 
      { 
        upsert: true, 
        new: true, 
        setDefaultsOnInsert: true 
      }
    );
    
    res.json(book);
  } catch (error) {
    console.error('Store Book Data Error:', error);
    res.status(500).json({ message: 'Failed to store book data', error: error.message });
  }
};

// Update local book data from API
exports.updateBookData = async (req, res) => {
  const { isbn } = req.params;
  const updatedData = req.body;

  try {
    const book = await Book.findOneAndUpdate(
      { isbn }, 
      updatedData, 
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Update Book Data Error:', error);
    res.status(500).json({ message: 'Failed to update book', error: error.message });
  }
};

// Combined View of Books
exports.getBooks = async (req, res) => {
  try {
    const localBooks = await Book.find({ status: 'active' }).lean();

    const combinedBooks = localBooks.map(book => ({
      ...book,
      source: 'local',
    }));

    res.json(combinedBooks);
  } catch (error) {
    console.error('Get Books Error:', error);
    res.status(500).json({ message: 'Failed to retrieve books', error: error.message });
  }
};

// Update Stock for books
exports.updateStock = async (req, res) => {
  const { isbn } = req.params;
  const { stock } = req.body;

  try {
    const book = await Book.findOneAndUpdate(
      { isbn }, 
      { stock }, 
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Update Stock Error:', error);
    res.status(500).json({ message: 'Failed to update stock', error: error.message });
  }
};

// Pricing and Discount Settings
exports.updatePriceAndDiscount = async (req, res) => {
  const { isbn } = req.params;
  const { price, discount } = req.body;

  try {
    const book = await Book.findOneAndUpdate(
      { isbn }, 
      { price, discount }, 
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Update Price and Discount Error:', error);
    res.status(500).json({ message: 'Failed to update price and discount', error: error.message });
  }
};

// Manage Book Status (Active/Inactive)
exports.updateBookStatus = async (req, res) => {
  const { isbn } = req.params;
  const { status } = req.body;  // status should be either 'active' or 'inactive'

  try {
    const book = await Book.findOneAndUpdate(
      { isbn }, 
      { status }, 
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Update Book Status Error:', error);
    res.status(500).json({ message: 'Failed to update book status', error: error.message });
  }
};

// Manage Image for Books (OpenLibrary covers + custom uploads)
exports.updateBookImage = async (req, res) => {
  const { isbn } = req.params;
  const { imageUrl } = req.body;

  try {
    const book = await Book.findOneAndUpdate(
      { isbn }, 
      { imageUrl }, 
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Update Book Image Error:', error);
    res.status(500).json({ message: 'Failed to update book image', error: error.message });
  }
};

// Manage Custom Categorization and Tags
exports.updateCustomTagsAndCategory = async (req, res) => {
  const { isbn } = req.params;
  const { category, tags } = req.body;

  try {
    const book = await Book.findOneAndUpdate(
      { isbn }, 
      { category, tags }, 
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Update Custom Tags and Category Error:', error);
    res.status(500).json({ message: 'Failed to update tags and category', error: error.message });
  }
};