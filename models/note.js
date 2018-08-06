var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    time: {type: String, required: true},
    isShared: {type: Boolean, required: true},
    file: {type: String, required: true},
    page: {type: Number, required: true}
});

schema.post('remove', function(note) {
    User.findById(note.user, function (err, user) {
        user.notes.pull(note._id); //CHANGE HERE
        user.save();
    });
});

module.exports = mongoose.model('Note', schema);
