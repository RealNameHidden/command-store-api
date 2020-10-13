const mongoose = require('mongoose')

const commandSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    command: {
        type: String,
    }
})
const Command = mongoose.model('command', commandSchema)

module.exports = Command