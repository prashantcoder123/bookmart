// src/components/Dashboard.tsx
import React, { useState, useEffect } from "react";
import "../Styles/Dashboard.css";

const LOCAL_STORAGE_KEY = "books";

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  cover: string;
}

const dummyBooks: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: "$10.99",
    cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    price: "$8.99",
    cover: "https://covers.openlibrary.org/b/id/11153228-L.jpg"
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: "$12.50",
    cover: "https://covers.openlibrary.org/b/id/8228691-L.jpg"
  }
];

const Dashboard = ({ userType }: { userType: "buyer" | "seller" }) => {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : dummyBooks;
  });

  const [newBook, setNewBook] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    price: "",
    cover: ""
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    const book: Book = { ...newBook, id: Date.now() };
    setBooks([...books, book]);
    setNewBook({ title: "", author: "", price: "", cover: "" });
  };

  const handleDelete = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="User Avatar"
          className="avatar"
        />
        <h2>{userType === "buyer" ? "Buyer Dashboard" : "Seller Dashboard"}</h2>
      </div>

      {userType === "seller" && (
        <form className="upload-form" onSubmit={handleAddBook}>
          <h3>Add New Book</h3>
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Price"
            value={newBook.price}
            onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Cover Image URL"
            value={newBook.cover}
            onChange={(e) => setNewBook({ ...newBook, cover: e.target.value })}
            required
          />
          <button type="submit">Add Book</button>
        </form>
      )}

      <div className="book-list">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.cover} alt={book.title} className="book-cover" />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: {book.price}</p>
            {userType === "seller" ? (
              <div className="actions">
                <button>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            ) : (
              <button>Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


