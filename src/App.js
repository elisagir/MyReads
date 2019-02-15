import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import SearchPage from "./components/SearchPage";
import BookShelf from "./components/BookShelf";
import SearchButton from "./components/SearchButton";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  setBooksShelf(shelf) {
    return this.state.books.filter(book => book.shelf === shelf);
  }

  updateBookShelf = (book, shelf) => {
    this.setState(resp => ({
      books: resp.books
        .filter(b => b.id !== book.id)
        .concat({ ...book, shelf: shelf })
    }));
    BooksAPI.update(book, shelf);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route
            path="/search"
            render={() => (
              <SearchPage
                books={this.state.books}
                changeBookShelf={this.updateBookShelf}
              />
            )}
          />

          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <BookShelf
                  title="Currently Reading"
                  books={this.setBooksShelf("currentlyReading")}
                  changeBookShelf={this.updateBookShelf}
                />
                <BookShelf
                  title="Want to Read"
                  books={this.setBooksShelf("wantToRead")}
                  changeBookShelf={this.updateBookShelf}
                />
                <BookShelf
                  title="Read"
                  books={this.setBooksShelf("read")}
                  changeBookShelf={this.updateBookShelf}
                />
                <SearchButton />
              </div>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
