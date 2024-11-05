"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeafeonexArt = exports.GlaceonexArt = exports.UmbreonexArt = exports.EspeonexArt = exports.VaporeonexArt = exports.FlareonexArt = exports.JolteonexArt = exports.EeveeexArt = void 0;
const eevee_ex_1 = require("./eevee-ex");
const espeon_ex_1 = require("./espeon-ex");
const flareon_ex_1 = require("./flareon-ex");
const glaceon_ex_1 = require("./glaceon-ex");
const jolteon_ex_1 = require("./jolteon-ex");
const leafeon_ex_1 = require("./leafeon-ex");
const umbreon_ex_1 = require("./umbreon-ex");
const vaporeon_ex_1 = require("./vaporeon-ex");
class EeveeexArt extends eevee_ex_1.Eeveeex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://www.pokebeach.com/news/2024/10/hero-card-1.png';
    }
}
exports.EeveeexArt = EeveeexArt;
class JolteonexArt extends jolteon_ex_1.Jolteonex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://www.pokebeach.com/news/2024/10/hero-card-3.png';
    }
}
exports.JolteonexArt = JolteonexArt;
class FlareonexArt extends flareon_ex_1.Flareonex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://www.pokebeach.com/news/2024/10/new-card-4.png';
    }
}
exports.FlareonexArt = FlareonexArt;
class VaporeonexArt extends vaporeon_ex_1.Vaporeonex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://www.pokebeach.com/news/2024/10/hero-card-2.png';
    }
}
exports.VaporeonexArt = VaporeonexArt;
class EspeonexArt extends espeon_ex_1.Espeonex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://www.pokebeach.com/news/2024/10/hero-card-5.png';
    }
}
exports.EspeonexArt = EspeonexArt;
class UmbreonexArt extends umbreon_ex_1.Umbreonex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://www.pokebeach.com/news/2024/10/hero-card-6.png';
    }
}
exports.UmbreonexArt = UmbreonexArt;
class GlaceonexArt extends glaceon_ex_1.Glaceonex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://www.pokebeach.com/news/2024/10/hero-card-8.png';
    }
}
exports.GlaceonexArt = GlaceonexArt;
class LeafeonexArt extends leafeon_ex_1.Leafeonex {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://www.pokebeach.com/news/2024/10/hero-card-7.png';
    }
}
exports.LeafeonexArt = LeafeonexArt;
