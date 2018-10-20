const express = require('express');
const bodyParser = require('body-parser');
const github = require('./../helpers/github');
const db = require('./../database/index');

let app = express();


app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  const {term} = req.body;

  github.getReposByUsername(term, (repos) => {
  	console.log('repoInfo: \n\n',repos);
  	db.save(repos);
  });

  res.end('OK');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
	db.fetch((users) => {
 		 res.json(users);
 	});
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

app.get('/reset', function (req, res) {
	db.reset();
	res.end('Reset db');
});
