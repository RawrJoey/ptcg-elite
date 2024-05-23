import { CardList } from './card-list';
import { Marker } from './card-marker';
import { AbilityUsed, SpecialCondition } from '../card/card-types';
import { PokemonCard } from '../card/pokemon-card';
import { Card } from '../card/card';
import { Power, Attack } from '../card/pokemon-types';
export declare class PokemonCardList extends CardList {
    damage: number;
    hp: number;
    specialConditions: SpecialCondition[];
    poisonDamage: number;
    burnDamage: number;
    marker: Marker;
    attackMarker: Marker;
    abilityMarker: Marker;
    pokemonPlayedTurn: number;
    abilityHasBeenUsed: AbilityUsed[];
    static readonly ATTACK_USED_MARKER = "ATTACK_USED_MARKER";
    static readonly ATTACK_USED_2_MARKER = "ATTACK_USED_2_MARKER";
    static readonly CLEAR_KNOCKOUT_MARKER = "CLEAR_KNOCKOUT_MARKER";
    static readonly KNOCKOUT_MARKER = "KNOCKOUT_MARKER";
    static readonly PREVENT_ALL_DAMAGE_AND_EFFECTS_DURING_OPPONENTS_NEXT_TURN = "PREVENT_ALL_DAMAGE_AND_EFFECTS_DURING_OPPONENTS_NEXT_TURN";
    static readonly CLEAR_PREVENT_ALL_DAMAGE_AND_EFFECTS_DURING_OPPONENTS_NEXT_TURN = "CLEAR_PREVENT_ALL_DAMAGE_AND_EFFECTS_DURING_OPPONENTS_NEXT_TURN";
    static readonly PREVENT_OPPONENTS_ACTIVE_FROM_ATTACKING_DURING_OPPONENTS_NEXT_TURN = "PREVENT_OPPONENTS_ACTIVE_FROM_ATTACKING_DURING_OPPONENTS_NEXT_TURN";
    static readonly CLEAR_PREVENT_OPPONENTS_ACTIVE_FROM_ATTACKING_DURING_OPPONENTS_NEXT_TURN = "CLEAR_PREVENT_OPPONENTS_ACTIVE_FROM_ATTACKING_DURING_OPPONENTS_NEXT_TURN";
    static readonly OPPONENTS_POKEMON_CANNOT_USE_THAT_ATTACK_MARKER = "OPPONENTS_POKEMON_CANNOT_USE_THAT_ATTACK_MARKER";
    static readonly DEFENDING_POKEMON_CANNOT_RETREAT_MARKER = "DEFENDING_POKEMON_CANNOT_RETREAT_MARKER";
    static readonly PREVENT_DAMAGE_DURING_OPPONENTS_NEXT_TURN_MARKER = "PREVENT_DAMAGE_DURING_OPPONENTS_NEXT_TURN_MARKER";
    static readonly CLEAR_PREVENT_DAMAGE_DURING_OPPONENTS_NEXT_TURN_MARKER = "CLEAR_PREVENT_DAMAGE_DURING_OPPONENTS_NEXT_TURN_MARKER";
    static readonly DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER = "DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER";
    static readonly CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER = "CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER";
    static readonly DEFENDING_POKEMON_CANNOT_ATTACK_MARKER = "DEFENDING_POKEMON_CANNOT_ATTACK_MARKER";
    static readonly DURING_OPPONENTS_NEXT_TURN_DEFENDING_POKEMON_TAKES_MORE_DAMAGE_MARKER = "DURING_OPPONENTS_NEXT_TURN_DEFENDING_POKEMON_TAKES_MORE_DAMAGE_MARKER";
    static readonly CLEAR_DURING_OPPONENTS_NEXT_TURN_DEFENDING_POKEMON_TAKES_MORE_DAMAGE_MARKER = "CLEAR_DURING_OPPONENTS_NEXT_TURN_DEFENDING_POKEMON_TAKES_MORE_DAMAGE_MARKER";
    static readonly PREVENT_DAMAGE_FROM_BASIC_POKEMON_MARKER: string;
    static readonly CLEAR_PREVENT_DAMAGE_FROM_BASIC_POKEMON_MARKER: string;
    static readonly PREVENT_ALL_DAMAGE_BY_POKEMON_WITH_ABILITIES_MARKER = "PREVENT_ALL_DAMAGE_BY_POKEMON_WITH_ABILITIES_MARKER";
    static readonly OPPONENT_CANNOT_PLAY_ITEM_CARDS_MARKER = "OPPONENT_CANNOT_PLAY_ITEM_CARDS_MARKER";
    tool: Card | undefined;
    stadium: Card | undefined;
    getPokemons(): PokemonCard[];
    getPokemonCard(): PokemonCard | undefined;
    isBasic(): boolean;
    clearAttackEffects(): void;
    clearEffects(): void;
    removeSpecialCondition(sp: SpecialCondition): void;
    addSpecialCondition(sp: SpecialCondition): void;
    addAbilityUsedTag(sp: AbilityUsed): void;
    removeAbilityUsedTag(sp: AbilityUsed): void;
    hasRuleBox(): boolean;
    vPokemon(): boolean;
    exPokemon(): boolean;
    getToolEffect(): Power | Attack | undefined;
}
