import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import bookService from './services/bookService';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Online Book Explorer</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/books">Books</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/categories">Categories</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="btn btn-warning ms-lg-3" to="/add-book">Add Book</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <span>© 2026 Online Book Explorer</span>
        <span>Built for APSIT academic project demonstration</span>
      </div>
    </footer>
  );
}

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const books = await bookService.getBooks();
        setFeatured(books.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <span className="badge text-bg-light mb-3 px-3 py-2">Discover · Learn · Explore</span>
              <h1 className="display-4 fw-bold text-dark">Discover Your Next Great Book</h1>
              <p className="lead text-secondary mt-3">
                Explore books across programming, databases, web development, artificial intelligence, fiction and more.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link className="btn btn-primary btn-lg" to="/books">Explore Books</Link>
                <Link className="btn btn-outline-primary btn-lg" to="/add-book">Add a Book</Link>
              </div>
            </div>
            <div className="col-lg-5 text-center">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80"
                alt="Books on table"
                className="hero-image img-fluid rounded-4 shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row text-center g-4">
          <div className="col-md-3"><div className="stat-box"><h3>{loading ? '...' : '100+'}</h3><p>Books</p></div></div>
          <div className="col-md-3"><div className="stat-box"><h3>{loading ? '...' : '5+'}</h3><p>Categories</p></div></div>
          <div className="col-md-3"><div className="stat-box"><h3>{loading ? '...' : '20+'}</h3><p>Authors</p></div></div>
          <div className="col-md-3"><div className="stat-box"><h3>Easy</h3><p>Book Discovery</p></div></div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="section-title">Popular Categories</h2>
        <div className="row g-3">
          {['Programming', 'Database', 'Web Development', 'Artificial Intelligence', 'Fiction'].map((cat) => (
            <div key={cat} className="col-md-2 col-6">
              <div className="category-tile text-center">
                <i className="bi bi-bookmark-fill fs-3 d-block mb-2"></i>
                <strong>{cat}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <h2 className="section-title">Featured Books</h2>
        <div className="row g-4">
          {featured.map((book) => (
            <div className="col-md-4" key={book.id}>
              <div className="card h-100 border-0 shadow-sm book-card">
                <img src={book.imageUrl || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80'} alt={book.bookName} className="card-img-top" style={{ height: '240px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{book.bookName}</h5>
                  <p className="text-muted mb-2">by {book.authorName}</p>
                  <span className="badge bg-light text-dark mb-2">{book.category}</span>
                  <p className="fw-bold text-primary">₹{book.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <h2 className="section-title">Why Use Online Book Explorer?</h2>
        <div className="row g-4">
          <div className="col-md-4"><div className="feature-box"><i className="bi bi-search fs-2"></i><h5>Smart Search</h5><p>Find books by title, author, and category in seconds.</p></div></div>
          <div className="col-md-4"><div className="feature-box"><i className="bi bi-filter-circle fs-2"></i><h5>Category Filters</h5><p>Browse precise book groups based on your interest.</p></div></div>
          <div className="col-md-4"><div className="feature-box"><i className="bi bi-shield-check fs-2"></i><h5>Secure Management</h5><p>Admin-ready CRUD flows with clean backend validation.</p></div></div>
        </div>
      </section>
    </>
  );
}

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const loadBooks = async (search = '', category = 'All') => {
    setLoading(true);
    try {
      let result = [];
      if (search.trim()) {
        result = await bookService.searchBooks(search);
      } else if (category !== 'All') {
        result = await bookService.getBooksByCategory(category);
      } else {
        result = await bookService.getBooks();
      }
      setBooks(result);
    } catch (error) {
      console.error(error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks(keyword, selectedCategory);
  }, [selectedCategory]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setKeyword(value);
    loadBooks(value, selectedCategory);
  };

  return (
    <div className="container py-5">
      <h2 className="section-title">Browse Books</h2>
      <div className="row g-3 align-items-center mb-4">
        <div className="col-md-8">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Search by title, author, or category"
            value={keyword}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select form-select-lg" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Database">Database</option>
            <option value="Web Development">Web Development</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Fiction">Fiction</option>
          </select>
        </div>
      </div>

      {loading ? <div className="text-center py-5">Loading books...</div> : books.length === 0 ? <div className="alert alert-info">No books found for your search.</div> : (
        <div className="row g-4">
          {books.map((book) => (
            <div key={book.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border-0 book-card">
                <img src={book.imageUrl || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80'} className="card-img-top" alt={book.bookName} style={{ height: '220px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.bookName}</h5>
                  <p className="text-muted mb-2">{book.authorName}</p>
                  <span className="badge bg-light text-dark mb-2 align-self-start">{book.category}</span>
                  <p className="fw-bold text-primary mb-3">₹{book.price}</p>
                  <span className={`badge ${book.available ? 'bg-success' : 'bg-secondary'} mb-3`}>{book.available ? 'Available' : 'Not Available'}</span>
                  <Link className="btn btn-primary mt-auto" to={`/books/${book.id}`}>View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Categories() {
  return (
    <div className="container py-5">
      <h2 className="section-title">Categories</h2>
      <div className="row g-4">
        {['Programming', 'Database', 'Web Development', 'Artificial Intelligence', 'Fiction'].map((category) => (
          <div key={category} className="col-md-4">
            <div className="card shadow-sm border-0 h-100 category-card">
              <div className="card-body">
                <h4>{category}</h4>
                <p className="text-muted">Explore curated books in this domain.</p>
                <Link to="/books" className="btn btn-outline-primary">Browse {category}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="container py-5">
      <h2 className="section-title">About Online Book Explorer</h2>
      <p className="lead text-secondary">
        Online Book Explorer is a full-stack student project designed to demonstrate Java, Spring Boot, React.js, Bootstrap, and MySQL integration in a real-world academic application.
      </p>
      <p className="text-secondary">
        The platform helps users search, filter, and manage books while showcasing MVC architecture, REST APIs, and modern responsive UI practices.
      </p>
    </div>
  );
}

function AddBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bookName: '',
    authorName: '',
    isbn: '',
    category: 'Programming',
    price: '',
    description: '',
    available: true,
    imageUrl: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.bookName || !form.authorName || !form.isbn || !form.category || !form.description || Number(form.price) <= 0) {
      setError('Please complete all required fields with valid values.');
      return;
    }

    try {
      await bookService.createBook({ ...form, price: Number(form.price) });
      navigate('/books');
    } catch (err) {
      setError('Unable to add the book. Please check the form and try again.');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="section-title">Add a New Book</h2>
      <form className="card p-4 shadow-sm border-0" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row g-3">
          <div className="col-md-6"><label className="form-label">Book Name</label><input className="form-control" name="bookName" value={form.bookName} onChange={handleChange} /></div>
          <div className="col-md-6"><label className="form-label">Author Name</label><input className="form-control" name="authorName" value={form.authorName} onChange={handleChange} /></div>
          <div className="col-md-6"><label className="form-label">ISBN</label><input className="form-control" name="isbn" value={form.isbn} onChange={handleChange} /></div>
          <div className="col-md-6"><label className="form-label">Category</label><select className="form-select" name="category" value={form.category} onChange={handleChange}>
            <option>Programming</option>
            <option>Database</option>
            <option>Web Development</option>
            <option>Artificial Intelligence</option>
            <option>Fiction</option>
          </select></div>
          <div className="col-md-4"><label className="form-label">Price</label><input className="form-control" type="number" min="1" name="price" value={form.price} onChange={handleChange} /></div>
          <div className="col-md-8"><label className="form-label">Image URL</label><input className="form-control" name="imageUrl" value={form.imageUrl} onChange={handleChange} /></div>
          <div className="col-12"><label className="form-label">Book Description</label><textarea className="form-control" rows="5" name="description" value={form.description} onChange={handleChange} /></div>
          <div className="col-12"><label className="form-check-label me-3">Available</label><input className="form-check-input" type="checkbox" name="available" checked={form.available} onChange={handleChange} /></div>
        </div>
        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="reset" className="btn btn-outline-secondary" onClick={() => setForm({ ...form, bookName: '', authorName: '', isbn: '', description: '', price: '' })}>Reset</button>
        </div>
      </form>
    </div>
  );
}

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await bookService.getBookById(id);
        setBook(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="container py-5">Loading book details...</div>;
  if (!book) return <div className="container py-5">Book not found.</div>;

  return (
    <div className="container py-5">
      <div className="row g-4 align-items-center">
        <div className="col-md-5">
          <img src={book.imageUrl || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80'} alt={book.bookName} className="img-fluid rounded-4 shadow" />
        </div>
        <div className="col-md-7">
          <span className="badge bg-primary mb-2">Book ID: {book.id}</span>
          <h2>{book.bookName}</h2>
          <h5 className="text-muted">by {book.authorName}</h5>
          <div className="my-3">
            <span className="badge bg-light text-dark me-2">{book.category}</span>
            <span className={`badge ${book.available ? 'bg-success' : 'bg-secondary'}`}>{book.available ? 'Available' : 'Not Available'}</span>
          </div>
          <p className="fs-4 text-primary fw-bold">₹{book.price}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p>{book.description}</p>
          <Link className="btn btn-primary me-2" to="/books">Back to Books</Link>
          <Link className="btn btn-outline-primary" to={`/edit-book/${book.id}`}>Edit Book</Link>
        </div>
      </div>
    </div>
  );
}

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await bookService.getBookById(id);
      setForm(data);
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await bookService.updateBook(id, { ...form, price: Number(form.price) });
    navigate(`/books/${id}`);
  };

  if (!form) return <div className="container py-5">Loading form...</div>;

  return (
    <div className="container py-5">
      <h2 className="section-title">Edit Book</h2>
      <form className="card p-4 shadow-sm border-0" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6"><label className="form-label">Book Name</label><input className="form-control" name="bookName" value={form.bookName} onChange={handleChange} /></div>
          <div className="col-md-6"><label className="form-label">Author Name</label><input className="form-control" name="authorName" value={form.authorName} onChange={handleChange} /></div>
          <div className="col-md-6"><label className="form-label">ISBN</label><input className="form-control" name="isbn" value={form.isbn} onChange={handleChange} /></div>
          <div className="col-md-6"><label className="form-label">Category</label><select className="form-select" name="category" value={form.category} onChange={handleChange}>
            <option>Programming</option>
            <option>Database</option>
            <option>Web Development</option>
            <option>Artificial Intelligence</option>
            <option>Fiction</option>
          </select></div>
          <div className="col-md-4"><label className="form-label">Price</label><input className="form-control" type="number" name="price" value={form.price} onChange={handleChange} /></div>
          <div className="col-md-8"><label className="form-label">Image URL</label><input className="form-control" name="imageUrl" value={form.imageUrl || ''} onChange={handleChange} /></div>
          <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows="5" name="description" value={form.description} onChange={handleChange} /></div>
          <div className="col-12"><label className="form-check-label me-3">Available</label><input className="form-check-input" type="checkbox" name="available" checked={!!form.available} onChange={handleChange} /></div>
        </div>
        <div className="mt-4"><button type="submit" className="btn btn-primary">Save Changes</button></div>
      </form>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
