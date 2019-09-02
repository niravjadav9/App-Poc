const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const User = mongoose.model('User');
const Post = mongoose.model('Post');

module.exports.createPost = (req, res, next) => {
    console.log('Inside post fn.');
    var post = new Post();
    post.title = req.body.title;
    post.description = req.body.description;
    post.save((err, doc) => {
        if (!err)
            res.send(doc);
        console.log(err);
        console.log(doc);
    });
}


module.exports.listPost = (req, res, next) => {
    Post.find({},
        (err, result) => {
            if (!result)
                return res.status(404).json({ message: 'Post record not found.' });
            else
                return res.status(200).json({ post: result });
        }
    );
}

module.exports.deletePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No record with given id : ${req.params.id}`);

    Post.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Post delete: ' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.comment = (req, res) => {
    console.log(req.body);
    var post = new Post();
    if (!req.body.comment) {
        res.json({ success: false, message: 'No comment provided' }); // Return error message
    } else {
        if (!req.body.id) {
            res.json({ success: false, message: 'No id was provided' }); // Return error message
        } else {
            Post.findOne({ _id: req.body.id }, (err, post) => {
                if (err) {
                    res.json({ success: false, message: 'Invalid blog id' }); // Return error message
                } else {
                    if (!post) {
                        res.json({ success: false, message: 'Blog not found.' }); // Return error message
                    } else {
                        console.log(post);
                        User.findOne({ _id: req._id }, async (err, user) => {
                            if (err) {
                                res.json({ success: false, message: 'Something went wrong' }); // Return error message
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'User not found.' }); // Return error message
                                } else {
                                    let pushComment =  {
                                        comment: req.body.comment,
                                        commentator: user.firstname  
                                    };
                                    const result = await Post.findOneAndUpdate({_id: req.body.id}, 
                                        {                                            
                                          $push: {
                                            comments: pushComment                            
                                          }
                                        });
                                        console.log(result);
                                        res.send(result);
                                }
                            }
                        });
                    }
                }
            });
        }
    }
};
