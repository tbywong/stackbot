const axios = require('axios');
const InteractiveMsgController = { bioSubmission };

function bioSubmission (request, response) {
  const payload = JSON.parse(request.body.payload);

  if (payload.token === process.env.SLACK_VERIFICATION_TOKEN) {
    const body = {
      token: process.env.SLACK_TOKEN,
      as_user: true,
      link_names: true,
      channel: payload.user.id,
      text: 'Thanks for playing with an experimental feature! Your response was not saved. \nIf you have any questions, post \'em in #dev'
    };

    const config = {
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + process.env.SLACK_TOKEN
      }
    };

    return axios
      .post('https://slack.com/api/chat.postMessage', body, config)
      .then((submissionResponse) => {
        const data = submissionResponse.data;

        if (data.ok) {
          console.info(`Bio successfully submitted by User: ${payload.user.name}`);

          response.status(200);
          response.send();
        }
      });
  }
}

module.exports = InteractiveMsgController;
