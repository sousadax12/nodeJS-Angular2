const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const usersRoute = require("./routes/users");
const configs = require("./configs/configs.js");
const WebSocket = require('ws');

//init database
mongoose.connect(configs.getConnectionString());

mongoose.connection.on('connected', () => {
    console.log("Connected to database");
})

mongoose.connection.error('connected', () => {
    console.log("error Connecting to database");
});

const server = express();
server.use(cors());
server.use(bodyParser.json());

//Set static folder
server.use(express.static(path.join(__dirname, 'public')));

//Set passport middleware
server.use(passport.initialize());
server.use(passport.session());
require("./configs/passport")(passport);

//Define Routes
server.use("/users", usersRoute);



server.get("/", (req, res) => {
    console.log("teste");
    res.send("teste");
});

server.listen(8082, function () {
    console.log('Server started on port %s', "8080");
});

const ws = new WebSocket('ws://localhost:8081', {
    perMessageDeflate: false
});

ws.on('open', function open() {
    ws.send('something');
});

ws.on('message', function incoming(data, flags) {
    // flags.binary will be set if a binary data is received.
    // flags.masked will be set if the data was masked.
    console.log(data);
});