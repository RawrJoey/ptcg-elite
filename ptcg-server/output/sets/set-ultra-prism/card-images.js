"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonFanClubArt = void 0;
const pokemon_fan_club_1 = require("./pokemon-fan-club");
class PokemonFanClubArt extends pokemon_fan_club_1.PokemonFanClub {
    constructor() {
        super(...arguments);
        this.cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/UPR/UPR_133_R_EN.png';
    }
}
exports.PokemonFanClubArt = PokemonFanClubArt;
