import { Rules } from './rules';
export var GamePhase;
(function (GamePhase) {
    GamePhase[GamePhase["WAITING_FOR_PLAYERS"] = 0] = "WAITING_FOR_PLAYERS";
    GamePhase[GamePhase["SETUP"] = 1] = "SETUP";
    GamePhase[GamePhase["PLAYER_TURN"] = 2] = "PLAYER_TURN";
    GamePhase[GamePhase["ATTACK"] = 3] = "ATTACK";
    GamePhase[GamePhase["BETWEEN_TURNS"] = 4] = "BETWEEN_TURNS";
    GamePhase[GamePhase["FINISHED"] = 5] = "FINISHED";
})(GamePhase || (GamePhase = {}));
export var GameWinner;
(function (GameWinner) {
    GameWinner[GameWinner["NONE"] = -1] = "NONE";
    GameWinner[GameWinner["PLAYER_1"] = 0] = "PLAYER_1";
    GameWinner[GameWinner["PLAYER_2"] = 1] = "PLAYER_2";
    GameWinner[GameWinner["DRAW"] = 3] = "DRAW";
})(GameWinner || (GameWinner = {}));
export class State {
    constructor() {
        this.cardNames = [];
        this.logs = [];
        this.rules = new Rules();
        this.prompts = [];
        this.phase = GamePhase.WAITING_FOR_PLAYERS;
        this.turn = 0;
        this.activePlayer = 0;
        this.winner = GameWinner.NONE;
        this.players = [];
        this.skipOpponentTurn = false;
        this.lastAttack = null;
    }
}
