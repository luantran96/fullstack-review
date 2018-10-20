const request = require('request');
const config = require('../server/config.js');

let getReposByUsername = (term, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  console.log('term in getReposByUsername: ',term);


  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${term}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };  

  request(options, (err, res, body) => {
    console.log('error:', err); 
    console.log('statusCode:', res && res.statusCode); 

    let result = JSON.parse(body);

    if (res.statusCode !== 404) {
      let repo_url = result.repos_url;
      request({
        url: repo_url,
        headers: {
          'User-Agent': 'request',
          'Authorization': `token ${config.TOKEN}`
        }     
      }, (err, res, body) => {

        cb(JSON.parse(body));
      });

    } else {
      console.log('User doesnt exist!');
    }

  });
}

module.exports.getReposByUsername = getReposByUsername;