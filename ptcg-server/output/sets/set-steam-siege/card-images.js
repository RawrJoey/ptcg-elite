"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialChargeArt = exports.NinjaBoyArt = exports.CobalionArt = void 0;
const cobalion_1 = require("./cobalion");
const ninja_boy_1 = require("./ninja-boy");
const special_charge_1 = require("./special-charge");
class CobalionArt extends cobalion_1.Cobalion {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/STS/STS_074_R_EN.png';
    }
}
exports.CobalionArt = CobalionArt;
class NinjaBoyArt extends ninja_boy_1.NinjaBoy {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/STS/STS_103_R_EN.png';
    }
}
exports.NinjaBoyArt = NinjaBoyArt;
class SpecialChargeArt extends special_charge_1.SpeicalCharge {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/STS/STS_105_R_EN_LG.png';
    }
}
exports.SpecialChargeArt = SpecialChargeArt;
