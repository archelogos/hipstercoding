/**
* API NODEJS TO DATASTORE.
* GOOGLE APP ENGINE
* @author: @Sergio_Gordillo
*/

'use strict';

var express = require('express');
var gcloud = require('gcloud');
var bodyParser = require('body-parser');
var cors = require('cors');
var Event = require('./models/event');
var Preference = require('./models/preference');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(function(req, res, next) {
  next(); // make sure we go to the next routes and don't stop here
});

var whitelist = ['http://hipstercoding.sergiogordillo.com', 'http://localhost:9000'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

/****************************************************************
******************************************************************/

/**
* Routing home. Dummy routing
*/
router.get('/', function(req, res) {
    res.send('NodeJS API. HipsterCoding. @Sergio_Gordillo');
});

/**
* @description: Insert Event. Get Method. Pixel Tracking
* @param: route
* @param: callback
* Using Request > Query. Params _x, _y, _type
* @return: JSON if OK, Error 400 if Bad Request, Random Datastore Error
*/
//TODO: Handle Datastore errors
router.get('/api/event/insert', cors(corsOptions), function(req, res){

  //Weak Validation
  if(typeof req.query._x === 'undefined' || typeof req.query._y === 'undefined'
    || typeof req.query._type === 'undefined')
      return res.status(400).send({code: 400, error: 'Bad Request'});

  var eventProperties = {
    _x : req.query._x,
    _y : req.query._y,
    _type : req.query._type
  };

  Event.insertEvent(eventProperties, function(err, entity) {
    if (err)
      return res.status(err.code).send(err);

  res.writeHead(200, {'Content-Type': 'image/gif' });
  res.end(new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'), 'binary');
  });

});

/**
* @description: GetAll Events. Get Method.
* @param: route
* @param: callback
* @return: JSON if OK, Random Datastore Error
*/
//TODO: Handle Datastore errors
router.get('/api/event/getAll', cors(corsOptions), function(req, res){
  Event.getAllEvents(function(err, entities){
    if (err)
      return res.status(err.code).send(err);

    res.json({ entities });
  });
});

/**
* @description: Insert Preference. Post Method.
* @param: route
* @param: callback
* @return: JSON if OK, Error 400 if Bad Request, Random Datastore Error
*/
//TODO: Handle Datastore errors
router.post('/api/preference/insert', cors(corsOptions), function(req, res){

  //Weak Validation
  if(typeof req.body.animal === 'undefined')
      return res.status(400).send({code: 400, error: 'Bad Request'});

  var preferenceProperties = {
    animal : req.body.animal
  };

  Preference.insertPreference(preferenceProperties, function(err, entity) {
    if (err)
      return res.status(err.code).send(err);

    res.json({ entity });
  });
});

/**
* @description: GetAll Preferences. Get Method.
* @param: route
* @param: callback
* @return: JSON if OK, Random Datastore Error
*/
//TODO: Handle Datastore errors
router.get('/api/preference/getAll', cors(corsOptions), function(req, res){
  Preference.getAllPreferences(function(err, entities){
    if (err)
      return res.status(err.code).send(err);

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
