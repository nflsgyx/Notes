var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    //depCode: {type: Number, required: true},
    moduleCode: {type: String, required: true},
    weekNum: {type: String, required: true},
    intro: {type: String, required: true},
    // path: {type: String, required: true},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

// schema.post('remove', function(message) {
//     User.findById(message.user, function (err, user) {
//         user.messages.pull(message._id); //CHANGE HERE
//         user.save();
//     });
// });

module.exports = mongoose.model('File', schema);
