const qs = require('querystring');
const axios = require('axios');

const postResult = (result) => {
  if (process.env.APP_ENV === 'dev') {
    console.log(result.data);
  } else {
    console.log(`Welcomed User #${result.data.message.user} to the organization`);
  }
}

const message = {
  token: process.env.SLACK_TOKEN,
  as_user: true,
  link_names: true,
  text: 'Welcome to the 401[stac]Ks Slack Org!',
  attachments: JSON.stringify([
    {
      title: 'Rules and Conventions',
      text: '1. Add your MS level to your display name\n 2. Add your professional title to your profile \n3. Join any channel and contribute!',
      color: '#7CD197'
    }
  ]),
};

const initialMessage = (teamId, userId) => {
  // send the default message as a DM to the user
  message.channel = userId;

  const params = qs.stringify(message);
  const sendMessage = axios.post('https://slack.com/api/chat.postMessage', params);

  sendMessage.then(postResult);
};

module.exports = { initialMessage };
