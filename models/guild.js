const mongo = require('mongoose');

const Schema = mongo.Schema({
  Guild: String,
  freeloaderChannel: String,
});

module.exports = mongo.model('Guild', Schema)