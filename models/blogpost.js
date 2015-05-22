var mongoose = require('mongoose');

var blogpostSchema = new mongoose.Schema({
    title: String,
    text: String
});

module.exports = mongoose.model('blogpost', blogpostSchema);

