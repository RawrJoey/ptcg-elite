"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokegear30Art = exports.MewArt = exports.CleffaArt = void 0;
const cleffa_1 = require("./cleffa");
const mew_1 = require("./mew");
const pokegear_30_1 = require("./pokegear-30");
class CleffaArt extends cleffa_1.Cleffa {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/UNB/UNB_131_R_EN.png';
    }
}
exports.CleffaArt = CleffaArt;
class MewArt extends mew_1.Mew {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/UNB/UNB_076_R_EN_LG.png';
    }
}
exports.MewArt = MewArt;
class Pokegear30Art extends pokegear_30_1.Pokegear30 {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/UNB/UNB_182_R_EN.png';
    }
}
exports.Pokegear30Art = Pokegear30Art;
