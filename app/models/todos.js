// load mongoose inorder ot define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: String,
    done: Boolean
});
