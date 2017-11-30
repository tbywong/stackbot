const axios = require('axios');
const SlashController = { bio };

function bio (request, response) {
  if (request.body.token === process.env.SLACK_VERIFICATION_TOKEN) {
    const body = {
      token: process.env.SLACK_TOKEN,
      trigger_id: request.body.trigger_id,
      dialog: {
        "title": "Fill out your bio",
        "callback_id": "welcome_bio",
        "submit_label": "Submit",
        "elements": [
          {
            "type": "text",
            "label": "What is your name?",
            "name": "user_name"
          },
          {
            "type": "text",
            "label": "What level are you?",
            "name": "user_level"
          }
        ]
      }
    };

    const config = {
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + process.env.SLACK_TOKEN
      }
    }

    return axios
      .post('https://slack.com/api/dialog.open', body, config)
      .then((dialogResponse) => {
        const data = dialogResponse && dialogResponse.data;

        if (data.ok) {
          console.info(`Welcome bio dialog opened by User: ${request.body.user_name}`);

          response.status(200)
          response.send();
        }
      });
  }
}

module.exports = SlashController;
