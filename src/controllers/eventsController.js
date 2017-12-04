const messages = require('../../lib/json/messages');
const SlackApi = require('../../lib/helpers/SlackApi');

function EventsController(request, response) {
  switch (request.body.type) {
    case 'url_verification': {
      response.send({ challenge: request.body.challenge });

      break;
    }

    case 'event_callback': {
      if (request.body.token === process.env.SLACK_VERIFICATION_TOKEN) {
        // `team_join` is fired whenever a new user (incl. a bot) joins the team
        // check if `event.is_restricted == true` to limit to guest accounts
        if (event.type === 'team_join' && !event.is_bot) {
          teamJoinEvent();
        }
      } else {
        response.sendStatus(500);
      }

      break;
    }

    default: {
      response.sendStatus(500);
    }
  }
}

function teamJoinEvent() {
  const event = request.body.event;
  const userId = event.user.id;
  const body = {
    channel: userId,
    text: messages.welcome.text,
    attachments: messages.welcome.attachments
  };

  return SlackApi
    .call('message', body)
    .then((result) => {
      console.info('SlackBot welcomed new user to the organization');

      response.sendStatus(200);
    })
    .catch((result) => {
      response.sendStatus(500);
    });
}

module.exports = EventsController;
