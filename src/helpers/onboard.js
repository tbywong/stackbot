// TODO: Remove helpers and move into controller logic
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
  text: 'Hello! Welcome to the Stacks-Slack, also known as "401stacKs", a resource and space for Main Stacks graduates to discuss work, career opportunities, and overall life tips. We may have finished dancing together, but we’re not done yet.',
  attachments: JSON.stringify([
    {
      title: 'HOUSE RULES:',
      text: '1) Must be out of college minimum 1 year. \n2) Must follow naming convention for display name: “First Last [Lv#]” \n3)Must add professional title to your profile.',
      color: '#7CB6D1'
    }, {
      title: 'HOW TO GET STARTED:',
      text: '1) Click on “Channels” to the left side bar. \n2) Scroll through, join any channel that excites you. \n3) If there isn’t a space that you are looking for, create it yourself! (Please create a “Private” channel for a space that does not apply to the larger MS group.) \n4) Jump in, ask questions, give tips, send gifs, connect, connect, connect. :heart:',
      color: '#7CD197'
    }
  ])
};

const initialMessage = (teamId, userId) => {
  // send the default message as a DM to the user
  message.channel = userId;

  const params = qs.stringify(message);
  const sendMessage = axios.post('https://slack.com/api/chat.postMessage', params);

  sendMessage.then(postResult);
};

module.exports = { initialMessage };
