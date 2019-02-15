import React from "react";

import Book from "./Book";

class BookShelf extends React.Component {
  render() {
    const books = this.props.books;
    const changeShelf = this.props.changeBookShelf;

    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
              <Book books={books} changeShelf={changeShelf} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf;
