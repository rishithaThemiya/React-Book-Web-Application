import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const Books = (props) => {

  const history = useHistory();

  const [books, setBooks] = useState([]);
  const [listTitle, setListTitle] = useState('');

  const API_KEY = 'bP67ifZkHddhvX3NH5RD9bE1c9sqxrCA';
  const bookEncodedLink = props.match.params.title;
  const bookDetailsURL = `https://api.nytimes.com/svc/books/v3/lists/current/${bookEncodedLink}?api-key=${API_KEY}`;

  useEffect(() => {
    axios
      .get(bookDetailsURL)
      .then(({ data }) => {
        setBooks(data.results.books);
        setListTitle(data.results.display_name)
        console.log('books', books);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  if (books.length === 0) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="container">
      <h1>
        <span className="badge badge-primary">{listTitle}</span>
      </h1>
      <div>
        <ul className="list-group mt-4">
          {books.map(book => (
            <li key={book.rank}
              className="btn list-group-item list-group-item-action"
              onClick={() => {
                history.push({
                  pathname: `/${bookEncodedLink}/${book.title}`,
                  state: { book: JSON.stringify(book) }
                })
              }}
            >
              <div className="row d-flex align-items-center">
                <div>
                  <h3 className="ml-2">#{book.rank}</h3>
                </div>
                <div className="col-2">
                  <img height="100px" alt={book.title} src={book.book_image}></img>
                </div>
                <div className="col">
                  <div className="row">
                    <span className="badge badge-primary mr-2">Title</span>{book.title}
                  </div>
                  <div className="row mt-2">
                    {book.description}
                  </div>
                  <div className="row mt-4">
                    <span className="badge badge-secondary mr-2">Author</span>{book.author}
                  </div>
                </div>
              </div>
            </li>
          ))
          }
        </ul >
      </div>
    </div>
  )
}

export default Books;