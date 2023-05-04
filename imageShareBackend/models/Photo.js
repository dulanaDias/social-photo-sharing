const mongoose = require('mongoose')
const Comment = require('./Comment')

const schema = mongoose.Schema({
    sourceId: {
        required: true,
        type: String
    },
    postedBy: {
        required: true,
        type: mongoose.Types.ObjectId
    },
    comments: {
        type: [{comment: String, like: Number, dislike: Number, love: Number, funny: Number}],
        default: []
    }
})

module.exports = mongoose.model("Photo", schema)