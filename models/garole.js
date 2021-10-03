const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    Guild: String,
    giveawayr: String,
})

module.exports = mongoose.model('giveawayrole', schema)