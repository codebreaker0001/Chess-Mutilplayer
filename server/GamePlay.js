"use strict";
/**
 * For game handling
 */
exports.__esModule = true;
exports.boards = exports.registerGameEvents = void 0;
var users = require("./Users");
var registerGameEvents = function (socket) {
    socket.on('startGame', function (data) {
        var connection = users.connnections.get(socket.id);
        var board = exports.boards[connection.boardId];
        board.startGame();
        socket.emit('start', {
            board: board.board,
            colour: connection.colour
        });
        connection.opponent.socket.emit('start', {
            board: board.board,
            colour: connection.opponent.colour
        });
    });
    socket.on('movePiece', function (_a) {
        var from = _a.from, to = _a.to, attack = _a.attack;
        var connection = users.connnections.get(socket.id);
        var board = exports.boards[connection.boardId];
        var valid = board.movePiece(connection, from, to, attack);
        connection.opponent.socket.emit('update', {
            board: board.board,
            turn: board.turn
        });
        connection.socket.emit('update', {
            board: board.board,
            turn: board.turn
        });
        socket.emit('movePieceReply', {
            error: !valid ? 'Invalid Move!' : false
        });
    });
    socket.on('getUpdate', function () {
        var connection = users.connnections.get(socket.id);
        var board = exports.boards[connection.boardId];
        socket.emit('update', {
            board: board === null || board === void 0 ? void 0 : board.board,
            turn: board === null || board === void 0 ? void 0 : board.turn
        });
    });
};
exports.registerGameEvents = registerGameEvents;
exports.boards = [];
