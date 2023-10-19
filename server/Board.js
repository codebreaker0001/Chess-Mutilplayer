"use strict";
exports.__esModule = true;
exports.Piece = void 0;
var Board = /** @class */ (function () {
    function Board(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.player1.colour = 'white';
        this.player2.colour = 'black';
        this.turn = 'white';
    }
    Board.prototype.startGame = function () {
        this.board = [];
        this.addPieces();
    };
    Board.prototype.movePiece = function (connection, from, to, attack) {
        var piece = this.board[from.y][from.x];
        if ((connection.colour === piece.colour) || // Move opponent Piece
            this.turn != piece.colour // Wrong turn
        ) {
            return false;
        }
        if (piece.isValidMove(to.x - from.x, to.y - from.y, attack)) {
            this.board[to.y][to.x] = piece;
            this.board[from.y][from.x] = null;
            this.switchTurn();
            return true;
        }
        else {
            return false;
        }
    };
    Board.prototype.switchTurn = function () {
        this.turn = this.turn === 'white' ? 'black' : 'white';
    };
    Board.prototype.addPieces = function () {
        for (var i = 0; i < 8; i++) {
            this.board[i] = [];
            for (var j = 0; j < 8; j++) {
                this.board[i][j] = null;
            }
        }
        for (var i = 0; i < 8; i++) {
            this.board[1][i] = new Piece('p', 'white');
            this.board[6][i] = new Piece('p', 'black');
        }
        this.board[0][0] = new Piece('R', 'white');
        this.board[0][7] = new Piece('R', 'white');
        this.board[7][0] = new Piece('R', 'black');
        this.board[7][7] = new Piece('R', 'black');
        this.board[0][1] = new Piece('N', 'white');
        this.board[0][6] = new Piece('N', 'white');
        this.board[7][1] = new Piece('N', 'black');
        this.board[7][6] = new Piece('N', 'black');
        this.board[0][2] = new Piece('B', 'white');
        this.board[0][5] = new Piece('B', 'white');
        this.board[7][2] = new Piece('B', 'black');
        this.board[7][5] = new Piece('B', 'black');
        this.board[0][3] = new Piece('Q', 'white');
        this.board[7][3] = new Piece('Q', 'black');
        this.board[0][4] = new Piece('K', 'white');
        this.board[7][4] = new Piece('K', 'black');
    };
    return Board;
}());
exports["default"] = Board;
var Piece = /** @class */ (function () {
    function Piece(type, colour) {
        this.type = type;
        this.colour = colour;
        this.moveCount = 0;
    }
    /**
     * @param dx delta x
     * @param dy delta y
     * @param attacking is it an attacking move (mainly for pawns)
     * @returns if the move is valid
     */
    Piece.prototype.isValidMove = function (dx, dy, attacking) {
        switch (this.type) {
            case 'p':
                var direction = (this.colour === 'white' ? 1 : -1);
                if (attacking) {
                    return Math.abs(dx) === 1 && dy === direction;
                }
                return (dx == 0 && // Vertical Move
                    (dy === direction || // Move 1 step
                        (dy === 2 * direction && this.moveCount === 0) // Move two on first move
                    ));
            case 'R':
                return Math.abs(dx) === 0 || Math.abs(dy) === 0;
            case 'N':
                return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
            case 'B':
                return Math.abs(dx) === Math.abs(dy);
            case 'Q':
                return Math.abs(dx) === 0 || Math.abs(dy) === 0 || Math.abs(dx) === Math.abs(dy);
            case 'K':
                return Math.abs(dx) === 1 || Math.abs(dy) === 1;
            default:
                return false;
        }
    };
    return Piece;
}());
exports.Piece = Piece;
