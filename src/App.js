import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookListItem from './components/BookListItem';
import Pagination from './components/Pagination';
import Books from './components/Books';
import Book from './components/Book';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  const [booklist, setBookList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setPostsPerPage] = useState(8);

  const API_KEY = 'bP67ifZkHddhvX3NH5RD9bE1c9sqxrCA';
  const bookListUrl = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(bookListUrl)
      .then(({ data }) => {
        setBookList(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  console.log(booklist);

  // paginate
  const indexOfLastBookItem = currentPage * itemsPerPage;
  const indexOfFirstBookItem = indexOfLastBookItem - itemsPerPage;
  const currentBookList = booklist.slice(indexOfFirstBookItem, indexOfLastBookItem);

  // page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="pt-4 pb-2">
        <Switch>
          <Route exact path="/" render={(props) =>
            <BookListItem {...props} booklist={currentBookList} loading={loading} />
          } />
          <Route exact path="/:title" component={Books} />
          <Route exact path="/:title/:book" component={Book} />
        </Switch>
      </div>
      <div className="d-flex justify-content-center py-4">
        <Route exact path="/" render={(props) => <Pagination {...props} itemsPerPage={itemsPerPage} totalBookItems={booklist.length} paginate={paginate} />} />
      </div>
    </div>
  );
}

export default App;
