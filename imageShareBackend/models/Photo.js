const mongoose = require('mongoose')
const Comment = require('./Comment')

const schema = mongoose.Schema({
    sourceId: {
        required: true,
        type: String
    },
    comments: {
        type: [{comment: String, like: Number, dislike: Number}],
        default: []
    }
})

module.exports = mongoose.model("Photo", schema)