'use strict';

var gcloud = require('gcloud');

var datastore = gcloud.datastore({
  projectId: process.env.GCLOUD_PROJECT
  }
);

/*
* Insert an preference
*/
function insertPreference(properties, callback) {
  var preferenceKey = datastore.key('Preference');

  datastore.save({
    key: preferenceKey,
    data: {
      created: new Date().toJSON(),
      animal: properties.animal
    }
  }, function(err) {
    if (err) {
      callback(err);
      return;
    }

    callback(null, preferenceKey);
  });
}

/*
* Get all EVENTs
*/
function getAllPreferences(callback) {
    var query = datastore.createQuery('Preference')
      .order('created');

    datastore.runQuery(query, callback);
}

module.exports.insertPreference = insertPreference;
module.exports.getAllPreferences = getAllPreferences;
