require('dotenv').config();

// Modules
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// Controllers
const AppController = require('./controllers/appController');
const EventsController = require('./controllers/eventsController');
const SlashController = require('./controllers/slashController');
const InteractiveMsgController = require('./controllers/interactiveMsgController');

const app = express();

/*
 * parse application/x-www-form-urlencoded && application/json
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', AppController.index);
app.get('/status', AppController.status);

/*
 * Endpoint to receive events from Slack's Events API.
 * Handles:
 *   - url_verification: Returns challenge token sent when present.
 *   - event_callback: Confirm verification token & handle `team_join` event.
 */
app.post('/events', EventsController.welcome);

/*
 * Endpoint to receive slash command /welcome-bio
 * Handles:
 *   - url_verification: Returns challenge token sent when present.
 */
app.post('/welcome-bio', SlashController.bio);

/*
 * Endpoint to receive welcome bio submission
 * Handles:
 *   - url_verification: Returns challenge token sent when present.
 */
app.post('/submission', InteractiveMsgController.bioSubmission);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
