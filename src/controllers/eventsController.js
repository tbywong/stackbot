const onboard = require('../helpers/onboard');
const EventsController = { welcome };

function welcome (request, response) {
  switch (request.body.type) {
    case 'url_verification': {
      // verify Events API endpoint by returning challenge if present
      response.send({ challenge: request.body.challenge });

      break;
    }

    case 'event_callback': {
      if (request.body.token === process.env.SLACK_VERIFICATION_TOKEN) {
        const event = request.body.event;

        // `team_join` is fired whenever a new user (incl. a bot) joins the team
        // check if `event.is_restricted == true` to limit to guest accounts
        if (event.type === 'team_join' && !event.is_bot) {
          const { team_id, id } = event.user;
          onboard.initialMessage(team_id, id);
        }

        response.sendStatus(200);
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

module.exports = EventsController;
