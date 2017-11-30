const AppController = { index, status };

function index (request, response) {
  response.status(200);
  response.send();
}

function status (request, response) {
  response.json({
    app_name: 'stackbot',
    status: 'running'
  })
}

module.exports = AppController;
