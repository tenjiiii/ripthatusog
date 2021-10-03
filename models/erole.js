const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    Guild: String,
    eventr: String,
})

module.exports = mongoose.model('eventrole', schema)