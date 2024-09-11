"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicPsychicEnergyHR = exports.SwitchHR = exports.MewexHR = exports.GiovannisCharismaSIR = exports.ErikasInvitationSIR = exports.ZapdosexSIR = exports.AlakazamexSIR = exports.BlastoiseexSIR = exports.CharizardexSIR = exports.VenusaurexSIR = exports.GiovannisCharismaFA = exports.ErikasInvitationFA = exports.MewexFA = exports.ZapdosexFA = exports.KangaskhanexFA = exports.AlakazamexFA = exports.ArbokexFA = exports.BlastoiseexFA = exports.CharizardexFA = exports.VenusaurexFA = exports.NidokingIR = exports.WartortleIR = exports.SquirtleIR = exports.CharmeleonIR = exports.CharmanderIR = exports.IvysaurIR = exports.BulbasaurIR = void 0;
const blastoise_ex_1 = require("./blastoise-ex");
const alakazam_ex_1 = require("./alakazam-ex");
const bulbasaur_1 = require("./bulbasaur");
const charizard_ex_1 = require("./charizard-ex");
const charmander_1 = require("./charmander");
const charmeleon_1 = require("./charmeleon");
const giovannis_charisma_1 = require("./giovannis-charisma");
const ivysaur_1 = require("./ivysaur");
const kangaskhan_ex_1 = require("./kangaskhan-ex");
const mew_ex_1 = require("./mew-ex");
const MEW_24_Arbok_ex_1 = require("./MEW_24_Arbok_ex");
const nidoking_1 = require("./nidoking");
const squirtle_1 = require("./squirtle");
const venusaur_ex_1 = require("./venusaur-ex");
const wartortle_1 = require("./wartortle");
const zapdos_ex_1 = require("./zapdos-ex");
const erikas_invitation_1 = require("./erikas-invitation");
const switch_1 = require("../set-scarlet-and-violet/switch");
const psychic_energy_1 = require("../set-scarlet-and-violet-energy/psychic-energy");
class BulbasaurIR extends bulbasaur_1.Bulbasaur {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_166_R_EN_LG.png';
        this.setNumber = '166';
        this.fullName = 'BulbasaurIR MEW';
    }
}
exports.BulbasaurIR = BulbasaurIR;
class IvysaurIR extends ivysaur_1.Ivysaur {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_167_R_EN_LG.png';
        this.setNumber = '167';
        this.fullName = 'IvysaurIR MEW';
    }
}
exports.IvysaurIR = IvysaurIR;
class CharmanderIR extends charmander_1.Charmander {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_168_R_EN_LG.png';
        this.setNumber = '168';
        this.fullName = 'CharmanderIR MEW';
    }
}
exports.CharmanderIR = CharmanderIR;
class CharmeleonIR extends charmeleon_1.Charmeleon {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_169_R_EN_LG.png';
        this.setNumber = '169';
        this.fullName = 'CharmeleonIR MEW';
    }
}
exports.CharmeleonIR = CharmeleonIR;
class SquirtleIR extends squirtle_1.Squirtle {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_170_R_EN_LG.png';
        this.setNumber = '170';
        this.fullName = 'SquirtleIR MEW';
    }
}
exports.SquirtleIR = SquirtleIR;
class WartortleIR extends wartortle_1.Wartortle {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_171_R_EN_LG.png';
        this.setNumber = '171';
        this.fullName = 'WartortleIR MEW';
    }
}
exports.WartortleIR = WartortleIR;
// export class CaterpieIR extends Caterpie {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_172_R_EN_LG.png';
//   public setNumber = '172';
//   public fullName: string = 'CaterpieIR MEW';
// }
// export class PikachuIR extends Pikachu {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_173_R_EN_LG.png';
//   public setNumber = '173';
//   public fullName: string = 'PikachuIR MEW';
// }
class NidokingIR extends nidoking_1.Nidoking {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_174_R_EN_LG.png';
        this.setNumber = '174';
        this.fullName = 'NidokingIR MEW';
    }
}
exports.NidokingIR = NidokingIR;
// export class PsyduckIR extends Psyduck {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_175_R_EN_LG.png';
//   public setNumber = '175';
//   public fullName: string = 'PsyduckIR MEW';
// }
// export class PoliwhirlIR extends Poliwhirl {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_176_R_EN_LG.png';
//   public setNumber = '176';
//   public fullName: string = 'PoliwhirlIR MEW';
// }
// export class MachokeIR extends Machoke {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_177_R_EN_LG.png';
//   public setNumber = '177';
//   public fullName: string = 'MachokeIR MEW';
// }
// export class TangelaIR extends Tangela {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_178_R_EN_LG.png';
//   public setNumber = '178';
//   public fullName: string = 'TangelaIR MEW';
// }
// export class MrMimeIR extends MrMime {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_179_R_EN_LG.png';
//   public setNumber = '179';
//   public fullName: string = 'Mr. MimeIR MEW';
// }
// export class OmanyteIR extends Omanyte {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_180_R_EN_LG.png';
//   public setNumber = '180';
//   public fullName: string = 'OmanyteIR MEW';
// }
// export class DragonairIR extends Dragonair {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_181_R_EN_LG.png';
//   public setNumber = '181';
//   public fullName: string = 'DragonairIR MEW';
// }
class VenusaurexFA extends venusaur_ex_1.Venusaurex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_182_R_EN_LG.png';
        this.setNumber = '182';
        this.fullName = 'Venusaur exFA MEW';
    }
}
exports.VenusaurexFA = VenusaurexFA;
class CharizardexFA extends charizard_ex_1.Charizardex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_183_R_EN_LG.png';
        this.setNumber = '183';
        this.fullName = 'Charizard exFA MEW';
    }
}
exports.CharizardexFA = CharizardexFA;
class BlastoiseexFA extends blastoise_ex_1.Blastoiseex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_184_R_EN_LG.png';
        this.setNumber = '184';
        this.fullName = 'Blastoise exFA MEW';
    }
}
exports.BlastoiseexFA = BlastoiseexFA;
class ArbokexFA extends MEW_24_Arbok_ex_1.Arbokex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_185_R_EN_LG.png';
        this.setNumber = '185';
        this.fullName = 'Arbok exFA MEW';
    }
}
exports.ArbokexFA = ArbokexFA;
// export class NinetalesexFA extends Ninetalesex {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_186_R_EN_LG.png';
//   public setNumber = '186';
//   public fullName: string = 'Ninetales exFA MEW';
// }
// export class WigglytuffexFA extends Wigglytuffex {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_187_R_EN_LG.png';
//   public setNumber = '187';
//   public fullName: string = 'Wigglytuff exFA MEW';
// }
class AlakazamexFA extends alakazam_ex_1.Alakazamex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_188_R_EN_LG.png';
        this.setNumber = '188';
        this.fullName = 'Alakazam exFA MEW';
    }
}
exports.AlakazamexFA = AlakazamexFA;
// export class GolemexFA extends Golemex {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_189_R_EN_LG.png';
//   public setNumber = '189';
//   public fullName: string = 'Golem exFA MEW';
// }
class KangaskhanexFA extends kangaskhan_ex_1.Kangaskhanex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_190_R_EN_LG.png';
        this.setNumber = '190';
        this.fullName = 'Kangaskhan exFA MEW';
    }
}
exports.KangaskhanexFA = KangaskhanexFA;
// export class JynxexFA extends Jynxex {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_191_R_EN_LG.png';
//   public setNumber = '191';
//   public fullName: string = 'Jynx exFA MEW';
// }
class ZapdosexFA extends zapdos_ex_1.Zapdosex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_192_R_EN_LG.png';
        this.setNumber = '192';
        this.fullName = 'Zapdos exFA MEW';
    }
}
exports.ZapdosexFA = ZapdosexFA;
class MewexFA extends mew_ex_1.Mewex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_193_R_EN_LG.png';
        this.setNumber = '193';
        this.fullName = 'Mew exFA MEW';
    }
}
exports.MewexFA = MewexFA;
// export class BillsTransferFA extends BillsTransfer {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_194_R_EN_LG.png';
//   public setNumber = '194';
//   public fullName: string = 'Bill\'s TransferFA MEW';
// }
// export class DaisysHelpFA extends DaisysHelp {
//   public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_195_R_EN_LG.png';
//   public setNumber = '195';
//   public fullName: string = 'Daisy\'s HelpFA MEW';
// }
class ErikasInvitationFA extends erikas_invitation_1.EreikasInvitation {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_196_R_EN_LG.png';
        this.setNumber = '196';
        this.fullName = 'Erika\'s InvitationFA MEW';
    }
}
exports.ErikasInvitationFA = ErikasInvitationFA;
class GiovannisCharismaFA extends giovannis_charisma_1.GiovannisCharisma {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_197_R_EN_LG.png';
        this.setNumber = '197';
        this.fullName = 'Giovanni\'s CharismaFA MEW';
    }
}
exports.GiovannisCharismaFA = GiovannisCharismaFA;
class VenusaurexSIR extends venusaur_ex_1.Venusaurex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_198_R_EN_LG.png';
        this.setNumber = '198';
        this.fullName = 'Venusaur exSIR MEW';
    }
}
exports.VenusaurexSIR = VenusaurexSIR;
class CharizardexSIR extends charizard_ex_1.Charizardex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_199_R_EN_LG.png';
        this.setNumber = '199';
        this.fullName = 'Charizard exSIR MEW';
    }
}
exports.CharizardexSIR = CharizardexSIR;
class BlastoiseexSIR extends blastoise_ex_1.Blastoiseex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_200_R_EN_LG.png';
        this.setNumber = '200';
        this.fullName = 'Blastoise exSIR MEW';
    }
}
exports.BlastoiseexSIR = BlastoiseexSIR;
class AlakazamexSIR extends alakazam_ex_1.Alakazamex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_201_R_EN_LG.png';
        this.setNumber = '201';
        this.fullName = 'Alakazam exSIR MEW';
    }
}
exports.AlakazamexSIR = AlakazamexSIR;
class ZapdosexSIR extends zapdos_ex_1.Zapdosex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_202_R_EN_LG.png';
        this.setNumber = '202';
        this.fullName = 'Zapdos exSIR MEW';
    }
}
exports.ZapdosexSIR = ZapdosexSIR;
class ErikasInvitationSIR extends erikas_invitation_1.EreikasInvitation {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_203_R_EN_LG.png';
        this.setNumber = '203';
        this.fullName = 'Erika\'s InvitationSIR MEW';
    }
}
exports.ErikasInvitationSIR = ErikasInvitationSIR;
class GiovannisCharismaSIR extends giovannis_charisma_1.GiovannisCharisma {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_204_R_EN_LG.png';
        this.setNumber = '204';
        this.fullName = 'Giovanni\'s CharismaSIR MEW';
    }
}
exports.GiovannisCharismaSIR = GiovannisCharismaSIR;
class MewexHR extends mew_ex_1.Mewex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_205_R_EN_LG.png';
        this.setNumber = '205';
        this.fullName = 'Mew exHR MEW';
    }
}
exports.MewexHR = MewexHR;
class SwitchHR extends switch_1.Switch {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_206_R_EN_LG.png';
        this.setNumber = '206';
        this.fullName = 'SwitchHR MEW';
    }
}
exports.SwitchHR = SwitchHR;
class BasicPsychicEnergyHR extends psychic_energy_1.PsychicEnergy {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_207_R_EN_LG.png';
        this.setNumber = '207';
        this.fullName = 'Psychic Energy MEW';
    }
}
exports.BasicPsychicEnergyHR = BasicPsychicEnergyHR;
