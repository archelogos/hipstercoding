/**
* Server Side HC. Testing node running on GAE YIPE!
*/

'use strict';

var express = require('express');
var gcloud = require('gcloud');
var bodyParser = require('body-parser');
var Event = require('./models/event');
var Preference = require('./models/preference');


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.send('hipstercoding api');
});

/*
* Insert event
*/
router.post('/api/event/insert', function(req, res){
  var eventProperties = {
    _x : req.body._x,
    _y : req.body._y,
    _type : req.body._type
  };
  Event.insertEvent(eventProperties, function(err) {
    if (err)
        res.send(err);

    res.json({ message: 'OK' });
  });
});

/*
* GetAll event
*/
router.get('/api/event/getAll', function(req, res){
  Event.getAllEvents(function(err, entities){
    if (err)
        res.send(err);

    res.json({ entities });
  });
});

/*
* @description:
* @params:
* @return:
*/
router.post('/api/preference/insert', function(req, res){
  var preferenceProperties = {
    animal : req.body.animal
  };
  Preference.insertPreference(preferenceProperties, function(err) {
    if (err)
        res.send(err);

    res.json({ message: 'OK' });
  });
});

router.get('/api/preference/getAll', function(req, res){
  Preference.getAllPreferences(function(err, entities){
    if (err)
        res.send(err);

    res.json({ entities });
  });
});


app.use('/', router);


var port = process.env.PORT || 8080;        // set our port

var server = app.listen(port, '0.0.0.0', function() {
  console.log('App listening at http://%s:%s', server.address().address,
    server.address().port);
  console.log('Press Ctrl+C to quit.');
});
