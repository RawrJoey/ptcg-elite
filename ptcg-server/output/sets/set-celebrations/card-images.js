"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZacianVArt = exports.YVeltalArt = exports.MewArt = exports.KyogreArt = exports.FlyingPikachuVMAXArt = exports.FlyingPikachuVArt = void 0;
const flying_pikachu_v_1 = require("./flying-pikachu-v");
const flying_pikachu_vmax_1 = require("./flying-pikachu-vmax");
const kyogre_1 = require("./kyogre");
const mew_1 = require("./mew");
const yveltal_1 = require("./yveltal");
const zacian_v_1 = require("./zacian-v");
class FlyingPikachuVArt extends flying_pikachu_v_1.FlyingPikachuV {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/CEL/CEL_006_R_EN_LG.png';
    }
}
exports.FlyingPikachuVArt = FlyingPikachuVArt;
class FlyingPikachuVMAXArt extends flying_pikachu_vmax_1.FlyingPikachuVMAX {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/CEL/CEL_007_R_EN_LG.png';
    }
}
exports.FlyingPikachuVMAXArt = FlyingPikachuVMAXArt;
class KyogreArt extends kyogre_1.Kyogre {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/CEL/CEL_003_R_EN_LG.png';
    }
}
exports.KyogreArt = KyogreArt;
class MewArt extends mew_1.Mew {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/CEL/CEL_011_R_EN_LG.png';
    }
}
exports.MewArt = MewArt;
class YVeltalArt extends yveltal_1.Yveltal {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/CEL/CEL_019_R_EN_LG.png';
    }
}
exports.YVeltalArt = YVeltalArt;
class ZacianVArt extends zacian_v_1.ZacianV {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/CEL/CEL_016_R_EN_LG.png';
    }
}
exports.ZacianVArt = ZacianVArt;
