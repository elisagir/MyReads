import React from "react";

class Book extends React.Component {
  render() {
    /* select value by shelf*/
    const shelf = this.props.shelf ? this.props.shelf : "none";
    const changeShelf = this.props.changeShelf;
    const insertBooks = this.props.books === undefined ? [] : this.props.books;

    return (
      <ol className="books-grid">
        {insertBooks.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url("${
                      book.imageLinks ? book.imageLinks.thumbnail : ""
                    }")`
                  }}
                />
                <div className="book-shelf-changer">
                  <select
                    onChange={e => changeShelf(book, e.target.value)}
                    value={book.shelf}
                  >
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">
                {book.authors ? book.authors.join(", ") : "None"}
              </div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

export default Book;
