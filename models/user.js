const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../configs/configs")

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username: username
    };
    User.findOne(query, callback);
}

module.exports.comparePassword = function (password, userPassword, callback) {
    const query = {
        username: username
    };
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    console.log(newUser.password);
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err)
                throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}