import axios from 'axios';

const SERVER_URL = 'http://localhost:3000'; // Replace with your server's actual URL

/**
 * Fetches the list of books from the server.
 * @returns {Promise<Array>} A promise that resolves to the list of books.
 * @throws {Error} If the request fails or no books are found.
 */
export const fetchBooksFromServer = async (query = '') => {
  try {
    const response = await axios.get(`${SERVER_URL}/fetch-books`, {
      params: { query }
    });
    if (response.status === 200 && response.data.books) {
      return response.data.books;
    } else {
      throw new Error('No books found in the response.');
    }
  } catch (error) {
    console.error('Error fetching books from server:', error.message);
    throw new Error('Failed to fetch books. Please try again later.');
  }
};