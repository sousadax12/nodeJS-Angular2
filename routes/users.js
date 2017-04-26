const server = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = server.Router();

router.post("/register", (req, res, next) => {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    newUser.validate(function (err) {

        if (err) {
            console.log('nope!');
            res.json(422, err);
        }
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json(422, err);
        } else {
            res.json(user);
        }
    });


});

router.get("/autheticate", (req, res, next) => {

    const username = res.body.username;
    const password = res.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err)
            throw err;
        if (!user) {
            res.json(401, {});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                
            } else {
                res.json(401, {});
            }

        });

    });

});

router.get("/profile", (req, res, next) => {
    res.send("PROFILE");
});

router.get("/validate", (req, res, next) => {
    res.send("VALIDATE");
});

module.exports = router;