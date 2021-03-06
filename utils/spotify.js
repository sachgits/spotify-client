const request = require('request');
const qs = require('query-string');
const objectAssign = require('object-assign');

const ACCOUNT_URI = 'https://accounts.spotify.com';

const AUTH = `${ACCOUNT_URI}/authorize?`;
const GET_TOKEN = `${ACCOUNT_URI}/api/token`;

const getAuthURL = (config, state) => `${AUTH}${
    qs.stringify(objectAssign({}, config, { state: state }))
}`;


const getTokens = (code, config, cb) => {
  const authOptions = {
    url: GET_TOKEN,
    form: {
      code: code,
      redirect_uri: config.redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': `Basic ${(
        new Buffer(config.client_id + ':' + config.client_secret)
        .toString('base64')
      )}`
    },
    json: true
  };

  request.post(
    authOptions,
    (error, { statusCode }, { access_token, refresh_token }) => {
      if (error) cb(error, null);
      else cb(null, { access_token, refresh_token })
    }
  );
}


module.exports = {
  getAuthURL,
  getTokens
};
