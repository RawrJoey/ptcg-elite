"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishfulBatonArt = exports.PlumeriaArt = exports.NecrozmaGXArt = exports.MarillArt = exports.GuzmaArt = exports.GloomArt = exports.GardevoirGXArt = exports.DarkraiGXArt = exports.AcerolaArt = void 0;
const acerola_1 = require("./acerola");
const marill_1 = require("./marill");
const darkrai_gx_1 = require("./darkrai-gx");
const gloom_1 = require("./gloom");
const guzma_1 = require("./guzma");
const plumeria_1 = require("./plumeria");
const wishful_baton_1 = require("./wishful-baton");
const gardevoir_gx_1 = require("./gardevoir-gx");
const necrozma_gx_1 = require("./necrozma-gx");
class AcerolaArt extends acerola_1.Acerola {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BUS/BUS_112_R_EN_LG.png';
    }
}
exports.AcerolaArt = AcerolaArt;
class DarkraiGXArt extends darkrai_gx_1.DarkraiGX {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BUS/BUS_088_R_EN.png';
    }
}
exports.DarkraiGXArt = DarkraiGXArt;
class GardevoirGXArt extends gardevoir_gx_1.GardevoirGX {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BUS/BUS_093_R_EN_LG.png';
    }
}
exports.GardevoirGXArt = GardevoirGXArt;
class GloomArt extends gloom_1.Gloom {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BUS/BUS_005_R_EN.png';
    }
}
exports.GloomArt = GloomArt;
class GuzmaArt extends guzma_1.Guzma {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BUS/BUS_115_R_EN_LG.png';
    }
}
exports.GuzmaArt = GuzmaArt;
class MarillArt extends marill_1.Marill {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BUS/BUS_034_R_EN_LG.png';
    }
}
exports.MarillArt = MarillArt;
class NecrozmaGXArt extends necrozma_gx_1.NecrozmaGX {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BUS/BUS_063_R_EN.png';
    }
}
exports.NecrozmaGXArt = NecrozmaGXArt;
class PlumeriaArt extends plumeria_1.Plumeria {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BUS/BUS_120_R_EN_LG.png';
    }
}
exports.PlumeriaArt = PlumeriaArt;
class WishfulBatonArt extends wishful_baton_1.WishfulBaton {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/BUS/BUS_128_R_EN_LG.png';
    }
}
exports.WishfulBatonArt = WishfulBatonArt;
