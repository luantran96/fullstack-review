const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  // id
  id: Number,
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

  const {id, login, followers, following, total_private_repos, avatar_url, public_repos} = userInfo;

  let currentUser = new Repo( {id, login,followers, following, total_private_repos, public_repos, avatar_url});

	Repo.find({id}, (err, results) => {
		console.log('results in .find:\n',results);
		if (!results.length) {
		  console.log('\nUser doesnt exists!\n');
		  currentUser.save( (err, currentUser) => {
			if (err) throw (err);
			console.log('currentUser in save():\n',currentUser);
		  });
		}
	});
}

let fetch = (cb) => {
	// Repo.find({}, (err, users) => {
	// var results = [];
	// 	users.forEach( (user) => {
	// 		var obj = { id: user.id, public_repos: user.public_repos };
	// 		results.push(obj);
	// 	});
	// 	cb(results);
	// });

  Repo.find({})
  .limit(25)
  .sort('-public_repos')  // or .sort({public_repos: -1})
  .exec( (err, users) => {
    console.log(users);
    cb(users);
  });

}

let reset = () => {
	mongoose.deleteModel('User');
}

module.exports.save = save;
module.exports.fetch = fetch;
module.exports.reset = reset;
