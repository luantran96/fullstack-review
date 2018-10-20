const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  login: String,
  // id
  id: Number,
  // login
  name: String,
  // followers # 
  created_at: String,
  // following #
  pushed_at: String,
  // avatar url
  size: Number,
  // total_private_repos 
  forks_count: Number,
  // repos #
  default_branch: String,
  // html url
  html_url: String,
  // Repo html url
  repo_html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, cb) => {

  //console.log('repos in save:', repos); 

  repos.forEach( (repo) => {
    let {id, name, created_at, pushed_at, size, forks_count, default_branch} = repo;
    let repo_html_url = repo.html_url;
    let {login, html_url} = repo.owner;
    Repo.findOne({id}, (err, repo) => {
      if (!repo) {
        Repo.create({login, id, name, created_at, pushed_at, size, forks_count, default_branch, html_url, repo_html_url}, (err, currentRepo) =>{
          console.log('currentRepo:\n',currentRepo);
          if (err) throw err;
        });
      }
    });

    cb();

   });
}

let fetch = (cb) => {
  Repo.find({})
  .limit(25)
  .sort('-size')  // or .sort({size: -1})
  .exec( (err, repos) => {
    if (err) throw err;
    console.log('repos in fetch:',repos);
    cb(repos);
  });
}

let fetchAll = (cb) => {
  Repo.find({}, (err, repos) =>{
    cb(repos.length);
  });
}

let reset = () => {
	Repo.deleteMany({},(err) =>{
    if (err) throw err;
    console.log('DONE');
  });
}

module.exports.save = save;
module.exports.fetch = fetch;
module.exports.fetchAll = fetchAll;
module.exports.reset = reset;
