const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    Guild: String,
    heistr: String,
})

module.exports = mongoose.model('heistrole', schema)