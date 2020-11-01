const mongoose = require('mongoose');
const {Schema} = mongoose

const UrlSchema =  new Schema({
    oldurl: {type: String, required: true},
    newurl: {type: String, required: true},
    userId: {type: String},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0}
})

module.exports = mongoose.model('Url', UrlSchema)