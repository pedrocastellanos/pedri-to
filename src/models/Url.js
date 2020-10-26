const mongoose = require('mongoose');
const {Schema} = mongoose

const UrlSchema =  new Schema({
    oldurl: {type: String, required: true},
    newurl: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String},
    clicks: {type: Number}
})

module.exports = mongoose.model('Url', UrlSchema)