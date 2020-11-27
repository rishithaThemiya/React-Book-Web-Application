import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ itemsPerPage, totalBookItems, paginate }) => {

  const pageNumbers = [];

  for (let index = 1; index <= (Math.ceil(totalBookItems / itemsPerPage)); index++) {
    pageNumbers.push(index);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(page => (
          <li key={page} className="page-item">
            <Link onClick={() => paginate(page)} to="/" className="page-link">
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination;