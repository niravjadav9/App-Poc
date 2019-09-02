const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var postSchema = new mongoose.Schema({
    title: {    
        type: String,
        required: true
    },
    description: {
        type: String,
        required: [true, "Description is Required!"]
    },
    comments: [{
        comment: { type: String },
        commentator: { type: String }
    }]
});

mongoose.model('Post', postSchema);