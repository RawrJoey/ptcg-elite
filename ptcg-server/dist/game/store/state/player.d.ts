import { CardList } from './card-list';
import { CardTarget, PlayerType } from '../actions/play-card-action';
import { PokemonCard } from '../card/pokemon-card';
import { PokemonCardList } from './pokemon-card-list';
import { Marker } from './card-marker';
export declare class Player {
    id: number;
    name: string;
    deck: CardList;
    hand: CardList;
    discard: CardList;
    lostzone: CardList;
    stadium: CardList;
    supporter: CardList;
    active: PokemonCardList;
    bench: PokemonCardList[];
    prizes: CardList[];
    supporterTurn: number;
    retreatedTurn: number;
    energyPlayedTurn: number;
    stadiumPlayedTurn: number;
    stadiumUsedTurn: number;
    marker: Marker;
    attackMarker: Marker;
    abilityMarker: Marker;
    avatarName: string;
    usedVSTAR: boolean;
    usedGX: boolean;
    readonly ATTACK_USED_MARKER = "ATTACK_USED_MARKER";
    readonly ATTACK_USED_2_MARKER = "ATTACK_USED_2_MARKER";
    usedRapidStrikeSearchThisTurn: any;
    usedExcitingStageThisTurn: any;
    usedSquawkAndSeizeThisTurn: any;
    usedTurnSkip: any;
    getPrizeLeft(): number;
    forEachPokemon(player: PlayerType, handler: (cardList: PokemonCardList, pokemonCard: PokemonCard, target: CardTarget) => void): void;
    switchPokemon(target: PokemonCardList): void;
}
