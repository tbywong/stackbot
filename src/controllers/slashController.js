const dialog = require('../../lib/json/dialogs');
const SlackApi = require('../../lib/helpers/SlackApi');

const SlashController = {
  intro: function (request, response) {
    if (request.body.token === process.env.SLACK_VERIFICATION_TOKEN) {
      const body = {
        trigger_id: request.body.trigger_id,
        dialog: {
          callback_id: 'slash_intro',
          title: dialog.intro.title,
          submit_label: dialog.intro.submit_label,
          elements: dialog.intro.elements
        }
      };

      return SlackApi
        .call('dialog', body)
        .then((result) => {
          if (result === 'OK') {
            console.info(`Slash command /intro initiated by User: ${request.body.user_name}`);

            response.status(200);
            response.send();
          }
        })
        .catch(() => {
          response.status(500);
          response.send();
        });
    } else {
      response.sendStatus(500);
    }
  }
};

module.exports = SlashController;
