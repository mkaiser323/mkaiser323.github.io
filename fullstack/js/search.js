

class SearchBar extends React.Component {
  render() {
    return (
        <div className="row">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search for images" />
            <div className="input-group-append">
              <span className="btn btn-success" id="basic-addon2">Search</span>
            </div>
          </div>
        </div>
    );
  }
}

class SearchResults extends React.Component {
  render() {
    return (
      <div className="row">
        <p>Hello</p>
      </div>    
    );
  }
}

class SearchPage extends React.Component {

  render() {
      return (
          <div className="container">
            <div id="search-page-wrapper">
              <SearchBar />
              <hr />
              <SearchResults />
            </div>
          </div>
    );
  }

}

ReactDOM.render(
  <SearchPage />,
  document.getElementById("searchPage")  
);
