import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Books.css';

const Books = () => {
  const API='https://potterapi-fedeperin.vercel.app/en';

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(false);

  const [filterBooks, setFilterBooks] = useState(false);

  const [searchBooks, setSearchBooks] = useState([]);

  const navigate = useNavigate();

  const searchHandler = (event) => {
    setSearchBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const filteredBooks = (e) => {
    console.log(e.target.value);

    if (e.target.value === "asc") {
      const asc = books.sort((a, b) => a.pages - b.pages);
      setBooks(asc);
      setFilterBooks(!filterBooks);
    } else {
      const dsc = books.sort((a, b) => b.pages - a.pages);
      setBooks(dsc);
      setFilterBooks(!filterBooks);
    }
  };

  useEffect(() => {
       const getProducts = async () => {
      try {
        setLoading(true);
        const booksData = await axios.get(`${API}/books`)
          if (booksData.data) {
          setLoading(false);
          setBooks(booksData.data);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const allBooks = searchBooks.length ? searchBooks : books;

  const bookItems = allBooks.map((book, index) => {
    return (
      <div key={index} className=" w-25 text-center m-1 p-3 bg-light box">
        <img height={250} src={book.cover} alt="image" />
        <h6 className="mt-2">Title of Book : {book.title}</h6>
        <h6 className="text-dark">Price : &#8377;{book.pages}</h6>
        <h6 className="text-primary">Release Date: {book.releaseDate}</h6>
        <Link className="btn btn-primary m-1" to={`/bookInfo/${book.index}`} state={book}>View</Link>
      </div>
    );
  });

  return (
    <div>
      <div className="w-50 m-auto">
        <input onChange={searchHandler} type="text" placeholder="Search your Book...." className="form-control mt-2"/>
        <select onChange={filteredBooks} className="form-control mt-2">
          <option value="">Filter the Books by price</option>
          <option value="asc">Low to High</option>
          <option value="dsc">High to low</option>
        </select>
      </div>
      <div style={styles}>{loading && <Spinner variant="dark" />}</div>
      <div className="d-flex flex-wrap justify-content-center mt-4">
        {bookItems}
      </div>
    </div>
  );
};
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-55%, -55%)",
};

export default Books;
