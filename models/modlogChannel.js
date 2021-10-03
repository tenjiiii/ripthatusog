const mongo = require('mongoose');

const Schema = mongo.Schema({
  Guildlog: String,
  modlogChannel: String,
});

module.exports = mongo.model('Guildmodlog', Schema)