const axios = require('axios');

const SlackApi = { call };

function call (method, body) {
  var apiUrl = 'https://slack.com/api/';
  const config = {
    headers: {
      'Content-type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + process.env.SLACK_TOKEN
    }
  };

  if (method === 'message') {
    apiUrl += 'chat.postMessage';

    body.as_user = true;
    body.link_names = true;
  } else if (method === 'dialog') {
    apiUrl += 'dialog.open';
  } else {
    console.error('SlackApi Error: `method` argument not provided');

    return Promise.reject();
  }

  if (body) {
    body.token = process.env.SLACK_TOKEN;
  } else {
    console.error('SlackApi Error: `body` argument not provided');

    return Promise.reject();
  }

  return axios
    .post(apiUrl, body, config)
    .then((result) => {
      const data = result.data;

      if (data.ok) {
        console.info(`SlackApi: called method "${method}"`);

        return 'OK';
      } else {
        console.error(`SlackApi Error: method "${method}" failed with error: "${data.error}"`);

        return Promise.reject();
      }
    });
}

module.exports = SlackApi;
