import React from 'react'

const Book = (props) => {

  const book = JSON.parse(props.location.state.book);
  const bookBuy = book.buy_links;

  return (
    <div className="container">
      <h1><span className="badge badge-primary">Book Details</span></h1>
      <div className="row">
        <div className="col-5">
          <img
            width={book.book_image_width}
            height={book.book_image_height}
            src={book.book_image} alt={book.title}
          />
        </div>
        <div className="col-6">
          <h3 className="mt-5">{book.title}</h3>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Rank</th>
                <td>{book.rank}</td>
              </tr>
              <tr>
                <th scope="row">Author</th>
                <td>{book.author}</td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>{book.description}</td>
              </tr>
              <tr>
                <th scope="row">ISBNv1</th>
                <td>{book.primary_isbn10}</td>
              </tr>
              <tr>
                <th scope="row">ISBNv2</th>
                <td>{book.primary_isbn13}</td>
              </tr>
            </tbody>
          </table>
          <div className="col">
            <h3>purchase book</h3>
            {bookBuy.map(element => (
              <h3
                className="d-inline"
                onClick={() => { window.open(element.url, '_blank') }}
              >
                <span className="btn badge badge-warning m-2">{element.name}</span>
              </h3>
            ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book;