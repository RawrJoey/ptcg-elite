"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysteriousPearlArt = exports.MiracleDiamondArt = void 0;
const miracle_diamond_1 = require("./miracle-diamond");
const mysterious_pearl_1 = require("./mysterious-pearl");
class MiracleDiamondArt extends miracle_diamond_1.MiracleDiamond {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://archives.bulbagarden.net/media/upload/c/c9/MiracleDiamondBattleRoadPromo.jpg';
    }
}
exports.MiracleDiamondArt = MiracleDiamondArt;
class MysteriousPearlArt extends mysterious_pearl_1.MysteriousPearl {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://archives.bulbagarden.net/media/upload/f/f2/MysteriousPearlBattleRoadPromo.jpg';
    }
}
exports.MysteriousPearlArt = MysteriousPearlArt;
