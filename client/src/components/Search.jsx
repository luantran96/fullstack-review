import React from 'react';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };

    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange (e,cb) {

    var searchValue = e.target.value;

    $.ajax({
      url: '/repos',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ searchValue: searchValue})
    })
    .done ((res) => {
      console.log(res);
      this.setState({
        term: searchValue
      });
    });

  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.terms} onChange={this.onChange}/>       
      <button onClick={this.search}> Add Repos </button>
    </div>) 
  }
}

export default Search;