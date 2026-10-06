const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const request = async (url, options = {}) => {
  const response = await fetch(`${API_URL}${url}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

const bookService = {
  getBooks: () => request('/books'),
  getBookById: (id) => request(`/books/${id}`),
  createBook: (book) => request('/books', { method: 'POST', body: JSON.stringify(book) }),
  updateBook: (id, book) => request(`/books/${id}`, { method: 'PUT', body: JSON.stringify(book) }),
  deleteBook: (id) => request(`/books/${id}`, { method: 'DELETE' }),
  searchBooks: (keyword) => request(`/books/search?keyword=${encodeURIComponent(keyword)}`),
  getBooksByCategory: (category) => request(`/books/category/${encodeURIComponent(category)}`),
};

export default bookService;
