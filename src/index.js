require('dotenv').config();

// Modules
const express = require('express');
const bodyParser = require('body-parser');

// Controllers
const AppController = require('./controllers/appController');
const EventsController = require('./controllers/eventsController');
const SlashController = require('./controllers/slashController');
const InteractionsController = require('./controllers/interactionsController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', AppController.index);
app.get('/status', AppController.status);

// Endpoint to receive all events
app.post('/events', EventsController);

// Endpoint to receive slash commands
app.post('/slash/intro', SlashController.intro);

// Endpoint to receive interactive messages
app.post('/interactions', InteractionsController);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
