const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {    
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Password is Required!"]
    },
    firstname: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    saltSecret: String
});


userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id }, 
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}

mongoose.model('User', userSchema);