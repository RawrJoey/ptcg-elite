import { CardTarget, PlayerType } from '../actions/play-card-action';
import { PokemonCard } from '../card/pokemon-card';
import { CardList } from './card-list';
import { Marker } from './card-marker';
import { PokemonCardList } from './pokemon-card-list';
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
    readonly DAMAGE_DEALT_MARKER = "DAMAGE_DEALT_MARKER";
    readonly ATTACK_USED_MARKER = "ATTACK_USED_MARKER";
    readonly ATTACK_USED_2_MARKER = "ATTACK_USED_2_MARKER";
    readonly CLEAR_KNOCKOUT_MARKER = "CLEAR_KNOCKOUT_MARKER";
    readonly KNOCKOUT_MARKER = "KNOCKOUT_MARKER";
    readonly OPPONENTS_POKEMON_CANNOT_USE_THAT_ATTACK_MARKER = "OPPONENTS_POKEMON_CANNOT_USE_THAT_ATTACK_MARKER";
    readonly DEFENDING_POKEMON_CANNOT_RETREAT_MARKER = "DEFENDING_POKEMON_CANNOT_RETREAT_MARKER";
    readonly PREVENT_DAMAGE_DURING_OPPONENTS_NEXT_TURN_MARKER = "PREVENT_DAMAGE_DURING_OPPONENTS_NEXT_TURN_MARKER";
    readonly DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER = "DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER";
    readonly CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER = "CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER";
    readonly DEFENDING_POKEMON_CANNOT_ATTACK_MARKER = "DEFENDING_POKEMON_CANNOT_ATTACK_MARKER";
    readonly DURING_OPPONENTS_NEXT_TURN_DEFENDING_POKEMON_TAKES_MORE_DAMAGE_MARKER = "DURING_OPPONENTS_NEXT_TURN_DEFENDING_POKEMON_TAKES_MORE_DAMAGE_MARKER";
    readonly CLEAR_DURING_OPPONENTS_NEXT_TURN_DEFENDING_POKEMON_TAKES_MORE_DAMAGE_MARKER = "CLEAR_DURING_OPPONENTS_NEXT_TURN_DEFENDING_POKEMON_TAKES_MORE_DAMAGE_MARKER";
    readonly PREVENT_DAMAGE_FROM_BASIC_POKEMON_MARKER: string;
    readonly CLEAR_PREVENT_DAMAGE_FROM_BASIC_POKEMON_MARKER: string;
    readonly PREVENT_ALL_DAMAGE_BY_POKEMON_WITH_ABILITIES = "PREVENT_ALL_DAMAGE_BY_POKEMON_WITH_ABILITIES";
    readonly PREVENT_ALL_DAMAGE_DONE_BY_OPPONENTS_BASIC_POKEMON_MARKER = "PREVENT_ALL_DAMAGE_DONE_BY_OPPONENTS_BASIC_POKEMON_MARKER";
    readonly CLEAR_PREVENT_ALL_DAMAGE_DONE_BY_OPPONENTS_BASIC_POKEMON_MARKER = "CLEAR_PREVENT_ALL_DAMAGE_DONE_BY_OPPONENTS_BASIC_POKEMON_MARKER";
    usedRapidStrikeSearchThisTurn: any;
    usedExcitingStageThisTurn: any;
    usedSquawkAndSeizeThisTurn: any;
    usedTurnSkip: any;
    usedTableTurner: any;
    chainsOfControlUsed: any;
    usedDragonsWish: boolean;
    pecharuntexIsInPlay: boolean;
    usedFanCall: boolean;
    canEvolve: boolean;
    canAttackFirstTurn: boolean;
    usedAlteredCreation: boolean;
    alteredCreationDamage: boolean;
    getPrizeLeft(): number;
    forEachPokemon(player: PlayerType, handler: (cardList: PokemonCardList, pokemonCard: PokemonCard, target: CardTarget) => void): void;
    removePokemonEffects(target: PokemonCardList): void;
    vPokemon(): boolean;
    singleStrike(): boolean;
    fusionStrike(): boolean;
    rapidStrike(): boolean;
    switchPokemon(target: PokemonCardList): void;
}
