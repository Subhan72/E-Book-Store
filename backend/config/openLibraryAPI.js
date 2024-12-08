const axios = require('axios');

// Function to search books by query from OpenLibrary
const searchBooks = async (query, page = 1, limit = 10) => {
  try {
    const url = 'https://openlibrary.org/search.json';
    const response = await axios.get(url, {
      params: {
        q: query,
        page: page,
        limit: limit
      }
    });

    // Transform the response into a more usable format
    if (response.data && response.data.docs) {
      return response.data.docs.map(book => ({
        isbn: book.isbn ? book.isbn[0] : null,
        title: book.title,
        author: book.author_name ? book.author_name[0] : 'Unknown Author',
        publishedDate: book.first_publish_year,
        description: book.description || 'No description available',
        imageUrl: book.cover_i 
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` 
          : null
      }));
    }

    return []; // Return empty array if no books found
  } catch (error) {
    console.error('Error searching books:', error);
    return []; // Return empty array on error
  }
};

// Function to bulk import books
const bulkImportBooks = async (isbns) => {
  try {
    const requests = isbns.map(isbn => {
      const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
      return axios.get(url).then(response => {
        const bookData = response.data[`ISBN:${isbn}`];
        if (bookData) {
          return {
            isbn: isbn,
            title: bookData.title,
            author: bookData.authors ? bookData.authors[0].name : 'Unknown Author',
            publishedDate: bookData.publish_date,
            description: bookData.notes || 'No description available',
            imageUrl: bookData.cover ? bookData.cover.large : null
          };
        }
        return null;
      });
    });

    const books = await Promise.all(requests);
    return books.filter(book => book !== null);
  } catch (error) {
    console.error('Error in bulk import:', error);
    return [];
  }
};

module.exports = { searchBooks, bulkImportBooks };