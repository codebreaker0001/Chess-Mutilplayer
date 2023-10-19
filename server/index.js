"use strict";
exports.__esModule = true;
var express = require("express");
var morgan = require("morgan");
var users = require("./Users");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('dotenv').config();
var port = process.env.PORT || 3000;
app.use(morgan('tiny'));
app.use(express.static('client'));
io.on('connection', users.connect);
http.listen(port, function () {
    console.log("Listening on http://localhost:" + port);
});
