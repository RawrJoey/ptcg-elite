"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZekromArt = exports.WashWaterEnergyArt = exports.WailordArt = exports.WailmerArt = exports.TaillowArt = exports.StoneFightingEnergyArt = exports.SnorlaxArt = exports.RaikouArt = exports.NessaArt = exports.MagearnaArt = exports.LeonArt = exports.JirachiArt = exports.DhelmiseArt = exports.CoatingMetalEnergyArt = exports.CharmeleonArt = exports.CharmanderArt = exports.CharizardArt = void 0;
const charizard_1 = require("./charizard");
const charmander_1 = require("./charmander");
const charmeleon_1 = require("./charmeleon");
const coating_metal_energy_1 = require("./coating-metal-energy");
const jirachi_1 = require("./jirachi");
const leon_1 = require("./leon");
const nessa_1 = require("./nessa");
const raikou_1 = require("./raikou");
const snorlax_1 = require("./snorlax");
const stone_fighting_energy_1 = require("./stone-fighting-energy");
const VIV_128_Magearna_1 = require("./VIV_128_Magearna");
const VIV_133_Taillow_1 = require("./VIV_133_Taillow");
const VIV_19_Dhelmise_1 = require("./VIV_19_Dhelmise");
const VIV_60_Zekrom_1 = require("./VIV_60_Zekrom");
const wailmer_1 = require("./wailmer");
const wailord_1 = require("./wailord");
const wash_water_energy_1 = require("./wash-water-energy");
class CharizardArt extends charizard_1.Charizard {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_025_R_EN.png';
    }
}
exports.CharizardArt = CharizardArt;
class CharmanderArt extends charmander_1.Charmander {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_023_R_EN.png';
    }
}
exports.CharmanderArt = CharmanderArt;
class CharmeleonArt extends charmeleon_1.Charmeleon {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_024_R_EN.png';
    }
}
exports.CharmeleonArt = CharmeleonArt;
class CoatingMetalEnergyArt extends coating_metal_energy_1.CoatingMetalEnergy {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_163_R_EN_LG.png';
    }
}
exports.CoatingMetalEnergyArt = CoatingMetalEnergyArt;
class DhelmiseArt extends VIV_19_Dhelmise_1.Dhelmise {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_019_R_EN_LG.png';
    }
}
exports.DhelmiseArt = DhelmiseArt;
class JirachiArt extends jirachi_1.Jirachi {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_119_R_EN_LG.png';
    }
}
exports.JirachiArt = JirachiArt;
class LeonArt extends leon_1.Leon {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_154_R_EN.png';
    }
}
exports.LeonArt = LeonArt;
class MagearnaArt extends VIV_128_Magearna_1.Magearna {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_128_R_EN_LG.png';
    }
}
exports.MagearnaArt = MagearnaArt;
class NessaArt extends nessa_1.Nessa {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_157_R_EN_LG.png';
    }
}
exports.NessaArt = NessaArt;
class RaikouArt extends raikou_1.Raikou {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_050_R_EN.png';
    }
}
exports.RaikouArt = RaikouArt;
class SnorlaxArt extends snorlax_1.Snorlax {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_131_R_EN.png';
    }
}
exports.SnorlaxArt = SnorlaxArt;
class StoneFightingEnergyArt extends stone_fighting_energy_1.StoneFightingEnergy {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_164_R_EN.png';
    }
}
exports.StoneFightingEnergyArt = StoneFightingEnergyArt;
class TaillowArt extends VIV_133_Taillow_1.Taillow {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_133_R_EN_LG.png';
    }
}
exports.TaillowArt = TaillowArt;
class WailmerArt extends wailmer_1.Wailmer {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_031_R_EN_LG.png';
    }
}
exports.WailmerArt = WailmerArt;
class WailordArt extends wailord_1.Wailord {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_032_R_EN.png';
    }
}
exports.WailordArt = WailordArt;
class WashWaterEnergyArt extends wash_water_energy_1.WashWaterEnergy {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_165_R_EN_LG.png';
    }
}
exports.WashWaterEnergyArt = WashWaterEnergyArt;
class ZekromArt extends VIV_60_Zekrom_1.Zekrom {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/VIV/VIV_060_R_EN_LG.png';
    }
}
exports.ZekromArt = ZekromArt;
