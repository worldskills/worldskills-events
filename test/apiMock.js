
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.use(function(req, res, next) {
  console.log("Mock server request: " + req.url);
  next();
});

app.use(function(req, res, next) {
  console.log("Mock server request: " + req.url);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/auth/users/loggedIn', function (req, res) {
  res.sendFile(__dirname + '/fixtures/auth/users/user.json');
});

app.get('/org/countries', function (req, res) {
  res.sendFile(__dirname + '/fixtures/org/countries/countries.json');
});

app.get('/auth/ws_entities', function (req, res) {
  res.sendFile(__dirname + '/fixtures/auth/ws_entities/ws_entities.json');
});

app.get('/events', function (req, res) {
  res.sendFile(__dirname + '/fixtures/events/events/events.json');
});

app.use(function(req, res, next) {
  console.log('Mock server request without response!')
  res.status(404).send('Sorry cant find that!');
});

app.listen(8080, function () {
  console.log('Mock server listening on port 8080');
});
