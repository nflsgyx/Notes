var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    file: {type: String, required: true},
});

module.exports = mongoose.model('Markdown', schema);
