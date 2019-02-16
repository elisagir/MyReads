import React from "react";
import { Link } from "react-router-dom";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

import * as BooksAPI from "../BooksAPI";

class SearchPage extends React.Component {
  state = {
    query: "",
    resultBooks: []
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
    this.updateResults(query);
  };

  updateResults = query => {
    if (query !== "") {
      BooksAPI.search(query).then(resultBooks => {
        if (resultBooks.error) {
          this.setState({ resultBooks: [] });
        } else {
          this.setState({ resultBooks });
        }
      });
    } else {
      this.setState({ resultBooks: [] });
    }
  };

  render() {
    const { query, resultBooks } = this.state;
    const { changeBookShelf, books } = this.props;
    const defaultValue = " ";
    let showingBooks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingBooks = resultBooks.filter(book => match.test(book.title));
    } else {
      showingBooks = resultBooks;
    }
    showingBooks.sort(sortBy("title"));

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results" />
        <ol className="books-grid">
          {showingBooks.map(book => {
            // set shelf value
            let setShelf;
            books.map(b =>
              b.id === book.id ? (setShelf = b.shelf) : defaultValue
            );
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        value={setShelf || "read"}
                        onChange={e => changeBookShelf(book, e.target.value)}
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default SearchPage;
