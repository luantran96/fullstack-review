import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListEntry from './components/RepoListEntry.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      length: 0
    }

    this.fetchData = this.fetchData.bind(this);
    this.createList = this.createList.bind(this);

  }

  fetchData() {
    $.ajax({
      url: '/repos',
      method: 'GET',
      contentType: 'application/json'
    })
    .done( (res) => {
      console.log('res in get /repos:\n\n',res);
        this.setState({
          repos: res.repos,
          length: res.length
        });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ term: term})
    })
    .then ( (res) => {
      console.log(res);
      this.fetchData();
    });
  }

  createList() {

    var list = [];
    this.state.repos.forEach( (repo) => {
            list.push(<RepoListEntry repo ={repo} />);
          });

    return list;
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList length={this.state.length}/>
      <Search onSearch={this.search.bind(this)}/>

      <table>
      <tbody>
          <tr>
            <th>Id</th>
            <th>Owner</th>
            <th>Repo Name</th>
            <th>Forks Count</th>
            <th> Created At </th>
            <th> Pushed At </th>
            <th> Default Branch </th>
            <th>Size</th>
          </tr>   
        {this.createList()}
      </tbody>
      </table>


    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));