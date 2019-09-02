const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    console.log('Inside register fn.');
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.firstname = req.body.firstname;
    user.phone = req.body.phone;
    user.gender = req.body.gender;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        console.log(err);
        console.log(doc);
    });
}   

module.exports.authenticate = (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(400).json(err);

        else if (user) return res.status(200).json({ "token": user.generateJwt() });

        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['firstname', 'email']) });
        }
    );
}