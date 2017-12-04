const messages = require('../../lib/json/messages');
const SlackApi = require('../../lib/helpers/SlackApi');

function InteractionsController(request, response) {
  const payload = JSON.parse(request.body.payload);

  if (payload && payload.token === process.env.SLACK_VERIFICATION_TOKEN) {
    if (payload.callback_id === 'slash_intro') {
      const body = {
        channel: payload.user.id,
        text: messages.responses.slash_intro
      };

      return SlackApi
        .call('message', body)
        .then((result) => {
          if (result === 'OK') {
            console.info(`Intro successfully submitted by User: ${payload.user.name}`);

            response.status(200);
            response.send();
          }
        })
        .catch(() => {
          response.status(500);
          response.send();
        });
    }
  } else {
    response.sendStatus(500);
  }
}

module.exports = InteractionsController;
