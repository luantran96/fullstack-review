const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  // login
  login: String,
  // followers # 
  followers: Number,
  // following #
  following: Number,
  // avatar url
  avatar_url: String,
  // total_private_repos 
  total_private_repos: Number,
  // repos #
  public_repos: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (userInfo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log('userInfo in save:', userInfo); 

  const {login, followers, following, total_private_repos, avatar_url, public_repos} = userInfo;

  	console.log('\n\n');
	console.log(login);
 	console.log(followers);
	console.log(following);
	console.log(total_private_repos);
	console.log(avatar_url);
	console.log(public_repos);
	console.log('\n\n');

  let currentUser = new Repo( {login,followers, following, total_private_repos, public_repos, avatar_url});

  currentUser.save( (err, currentUser) => {
	if (err) throw (err);
	console.log('currentUser in save():\n',currentUser);
  });

}

module.exports.save = save;