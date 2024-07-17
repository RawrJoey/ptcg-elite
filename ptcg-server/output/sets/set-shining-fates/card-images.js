"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThwackeyArt = exports.SnomArt = exports.RillaboomArt = exports.KoffingArt = exports.GalarianWeezingArt = exports.FrosmothArt = exports.BuizelArt = exports.BallGuyArt = void 0;
const ball_guy_1 = require("./ball-guy");
const buizel_1 = require("./buizel");
const frosmoth_1 = require("./frosmoth");
const galarian_weezing_1 = require("./galarian-weezing");
const koffing_1 = require("./koffing");
const rillaboom_1 = require("./rillaboom");
const snom_1 = require("./snom");
const thwackey_1 = require("./thwackey");
class BallGuyArt extends ball_guy_1.BallGuy {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SHF/SHF_057_R_EN_LG.png';
    }
}
exports.BallGuyArt = BallGuyArt;
class BuizelArt extends buizel_1.Buizel {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SHF/SHF_022_R_EN_LG.png';
    }
}
exports.BuizelArt = BuizelArt;
class FrosmothArt extends frosmoth_1.Frosmoth {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SHF/SHF_030_R_EN_LG.png';
    }
}
exports.FrosmothArt = FrosmothArt;
class GalarianWeezingArt extends galarian_weezing_1.GalarianWeezing {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SHF/SHF_042_R_EN.png';
    }
}
exports.GalarianWeezingArt = GalarianWeezingArt;
class KoffingArt extends koffing_1.Koffing {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SHF/SHF_041_R_EN_LG.png';
    }
}
exports.KoffingArt = KoffingArt;
class RillaboomArt extends rillaboom_1.Rillaboom {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SHF/SHF_SV6_R_EN_LG.png';
    }
}
exports.RillaboomArt = RillaboomArt;
class SnomArt extends snom_1.Snom {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SHF/SHF_029_R_EN_LG.png';
    }
}
exports.SnomArt = SnomArt;
class ThwackeyArt extends thwackey_1.Thwackey {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SHF/SHF_SV5_R_EN_LG.png';
    }
}
exports.ThwackeyArt = ThwackeyArt;
