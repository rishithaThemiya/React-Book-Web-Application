import React from 'react'
import { useHistory } from 'react-router-dom'

const BookListItem = ({ booklist, loading }) => {

  const history = useHistory();

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="mt-2">
       <h1><span className="badge badge-primary">New York Times Best Sellers List</span></h1>
      <ul className="list-group mt-3">
        {booklist.map(item => (
          <li key={item.display_name}
            className="btn list-group-item list-group-item-action"
            onClick={() => { history.push(item.list_name_encoded) }}
          >
            {item.list_name}
            <span className="ml-4 badge badge-warning">
              {item.updated}
            </span>
            <span className="ml-1 badge badge-primary">
              {item.newest_published_date}
            </span>
          </li>
        ))
        }
      </ul >
    </div>
  )
}
export default BookListItem;