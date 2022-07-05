import React, { Component } from "react";

class App extends Component {
  controller = new AbortController();

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      title: "",
      films: [],
    }
  }

  // handleSearch = (e) => {
  //   let filteredList = this.state.films.filter((film) =>
  //     film.title.toLowerCase().includes(e.target.value.toLowerCase()));
  //     this.setState({ films: filteredList, title: e.target.value });
  // };

  handleSearch = (e) => {
    this.setState({ title: e.target.value });
  }

  filterResultsJSX() {
    return this.state.films.filter((film) => film.title.toLowerCase().includes(this.state.title.toLowerCase()))
    .map(
      (film) => <li key={film.id}>{film.title}</li>)
  }

  componentDidMount() {
    console.log("App - Mount");
    fetch("https://ghibliapi.herokuapp.com/films", {
      signal: this.controller.signal,
    })
    .then((res) => res.json())
    .then((films) => {
      console.log(films);
      this.setState({ isLoaded: true, films });
    })
    .catch((err) => console.error(err));
  }

  componentDidUpdate() {
    console.log("App - Update");
  }

  componentWillUnmount(reason) {
    if (reason) this.controller.abort();
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          <h1>Studio Ghibli Films</h1>
          <input
          type="search"
          placeholder="Search"
          id="title"
          name="title"
          aria-label="Search Title"
          value={this.state.title}
          onChange={this.handleSearch}
          />
          <ul>{this.filterResultsJSX()}</ul>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export default App;
