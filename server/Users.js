"use strict";
/**
 * For user handling
 */
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.connect = exports.connnections = void 0;
var game = require("./GamePlay");
var Board_1 = require("./Board");
exports.connnections = new Map();
var findOpponent = function (socket, connection, _a) {
    var e_1, _b;
    var name = _a.name;
    try {
        for (var _c = __values(exports.connnections.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
            var c = _d.value;
            if (c.name === name) {
                if (c.opponent) {
                    socket.emit('findOpponentError', { error: 'Player already in a game.' });
                    return;
                }
                var boardId = game.boards.push(new Board_1["default"](c, connection)) - 1;
                connection.opponent = c;
                c.opponent = connection;
                connection.boardId = boardId;
                c.boardId = boardId;
                c.socket.emit('playerConnect', {
                    opponent: connection.name
                });
                connection.socket.emit('playerConnect', {
                    opponent: c.name
                });
                console.log(connection.name + "(" + socket.id + ") connected with " + c.name + "(" + c.socket.id + ")!");
                return;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_b = _c["return"])) _b.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    socket.emit('findOpponentError', {
        error: 'Name not found'
    });
};
var connect = function (socket) {
    console.log("Connected - " + socket.id);
    var connection = {
        name: null,
        boardId: null,
        socket: socket,
        opponent: null,
        colour: 'white'
    };
    exports.connnections.set(socket.id, connection);
    socket.on('registerName', function (_a) {
        var e_2, _b;
        var username = _a.username;
        try {
            for (var _c = __values(exports.connnections.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var connection_1 = _d.value;
                if (connection_1.name === username) {
                    socket.emit('registerNameReply', { error: 'Username already taken' });
                    return;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c["return"])) _b.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        connection.name = username;
        console.log(socket.id + " registered as " + username + ".");
        socket.emit('registerNameReply', { success: true });
    });
    socket.on('findOpponent', function (data) { return findOpponent(socket, connection, data); });
    game.registerGameEvents(socket);
    socket.on('disconnect', function () {
        console.log("Disconnected - " + socket.id);
        exports.connnections["delete"](socket.id);
    });
};
exports.connect = connect;
