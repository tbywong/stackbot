require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const onboard = require('./onboard');

const app = express();

/*
 * parse application/x-www-form-urlencoded && application/json
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send('<h2>Stackbot is up and running</h2>');
});

/*
 * Endpoint to receive events from Slack's Events API.
 * Handles:
 *   - url_verification: Returns challenge token sent when present.
 *   - event_callback: Confirm verification token & handle `team_join` event.
 */
app.post('/events', (request, response) => {
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
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});
