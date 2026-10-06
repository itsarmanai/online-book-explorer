CREATE DATABASE IF NOT EXISTS book_explorer;
USE book_explorer;

CREATE TABLE IF NOT EXISTS books (
  id BIGINT NOT NULL AUTO_INCREMENT,
  book_name VARCHAR(255) NOT NULL,
  author_name VARCHAR(255) NOT NULL,
  isbn VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  available BOOLEAN NOT NULL,
  image_url VARCHAR(500),
  PRIMARY KEY (id)
);

INSERT INTO books (book_name, author_name, isbn, category, price, description, available, image_url)
VALUES
('Java Programming', 'Herbert Schildt', '9780071809252', 'Programming', 599.00, 'A practical guide to Java programming concepts, object-oriented design, and software development.', TRUE, 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80'),
('Clean Code', 'Robert C. Martin', '9780132350884', 'Programming', 750.00, 'A classic text on writing readable, maintainable, and professional-quality code.', TRUE, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80'),
('Database System Concepts', 'Abraham Silberschatz', '9780078022159', 'Database', 820.00, 'A comprehensive introduction to database systems, design principles, and SQL fundamentals.', TRUE, 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80'),
('HTML and CSS', 'Jon Duckett', '9781118008188', 'Web Development', 680.00, 'An engaging visual guide to understanding HTML, CSS, and layout design principles.', TRUE, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'),
('Artificial Intelligence', 'Stuart Russell', '9780136042594', 'Artificial Intelligence', 980.00, 'A foundational exploration of AI algorithms, reasoning, and modern machine learning concepts.', TRUE, 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'),
('The Alchemist', 'Paulo Coelho', '9780061122413', 'Fiction', 420.00, 'A philosophical fiction novel about purpose, destiny, and the journey of self-discovery.', TRUE, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80');
