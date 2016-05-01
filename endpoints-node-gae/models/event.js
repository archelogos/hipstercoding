'use strict';

var gcloud = require('gcloud');

var datastore = gcloud.datastore({
  projectId: process.env.GCLOUD_PROJECT
  }
);

/*
* Insert an event
*/
function insertEvent(properties, callback) {
  var eventKey = datastore.key('Event');

  datastore.save({
    key: eventKey,
    data: {
      created: new Date().toJSON(),
      _x: properties._y,
      _y: properties._y,
      _type: properties._type
    }
  }, function(err) {
    if (err) {
      callback(err);
      return;
    }

    callback(null, eventKey);
  });
}

/*
* Get all EVENTs
*/
function getAllEvents(callback) {
    var query = datastore.createQuery('Event')
      .order('created');

    datastore.runQuery(query, callback);
}

module.exports.insertEvent = insertEvent;
module.exports.getAllEvents = getAllEvents;
