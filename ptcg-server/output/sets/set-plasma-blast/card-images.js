"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WartortleArt = exports.MasterBallArt = exports.VirizionExArt = exports.UltraBallArt = exports.SilverBangleArt = exports.ScoopUpCycloneArt = exports.JirachiExArt = void 0;
const ultra_ball_1 = require("../set-scarlet-and-violet/ultra-ball");
const master_ball_1 = require("../set-temporal-forces/master-ball");
const scoop_up_cyclone_1 = require("../set-twilight-masquerade/scoop-up-cyclone");
const jirachi_ex_1 = require("./jirachi-ex");
const silver_bangle_1 = require("./silver-bangle");
const virizion_ex_1 = require("./virizion-ex");
const wartortle_1 = require("./wartortle");
class JirachiExArt extends jirachi_ex_1.JirachiEx {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PLB/PLB_060_R_EN.png';
    }
}
exports.JirachiExArt = JirachiExArt;
class ScoopUpCycloneArt extends scoop_up_cyclone_1.ScoopUpCyclone {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PLB/PLB_095_R_EN.png';
        this.setNumber = '95';
        this.fullName = 'Scoop Up Cyclone PLB';
    }
}
exports.ScoopUpCycloneArt = ScoopUpCycloneArt;
class SilverBangleArt extends silver_bangle_1.SilverBangle {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PLB/PLB_088_R_EN.png';
    }
}
exports.SilverBangleArt = SilverBangleArt;
class UltraBallArt extends ultra_ball_1.UltraBall {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PLB/PLB_090_R_EN.png';
        this.setNumber = '90';
        this.fullName = 'Ultra ball PLB';
    }
}
exports.UltraBallArt = UltraBallArt;
class VirizionExArt extends virizion_ex_1.VirizionEx {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PLB/PLB_009_R_EN.png';
    }
}
exports.VirizionExArt = VirizionExArt;
class MasterBallArt extends master_ball_1.MasterBall {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PLB/PLB_094_R_EN_LG.png';
        this.setNumber = '94';
        this.fullName = 'Master Ball PLB';
    }
}
exports.MasterBallArt = MasterBallArt;
class WartortleArt extends wartortle_1.Wartortle {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/PLB/PLB_015_R_EN_LG.png';
    }
}
exports.WartortleArt = WartortleArt;
