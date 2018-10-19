import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  componentDidMount() {
    console.log('IN HERE');

    $.ajax({
      url: '/repos',
      method: 'GET',
      contentType: 'application/json'
    })
    .done( (res) => {
      console.log('res in get /repos:\n\n',res);
    });

  }

  search (term) {
    console.log(`${term} was searched`);

    $.ajax({
      url: '/repos',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ term: term})
    })
    .done ((res) => {
      console.log(res);
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));