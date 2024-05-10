export declare enum GameCoreError {
    ERROR_BOT_NOT_FOUND = "ERROR_BOT_NOT_FOUND",
    ERROR_BOT_NOT_INITIALIZED = "ERROR_BOT_NOT_INITIALIZED",
    ERROR_BOT_NO_DECK = "ERROR_BOT_NO_DECK",
    ERROR_CLIENT_NOT_CONNECTED = "ERROR_CLIENT_NOT_CONNECTED",
    ERROR_GAME_NOT_FOUND = "ERROR_GAME_NOT_FOUND",
    ERROR_INVALID_STATE = "ERROR_INVALID_STATE",
    ERROR_SERIALIZER = "ERROR_SERIALIZER",
    ERROR_SIMULATOR_NOT_STABLE = "ERROR_SIMULATOR_NOT_STABLE",
    MUST_BE_IN_ACTIVE_SPOT = "MUST_BE_IN_ACTIVE_SPOT"
}
export declare enum GameStoreMessage {
    ACTION_IN_PROGRESS = "ACTION_IN_PROGRESS",
    ALREADY_PLAYING = "ALREADY_PLAYING",
    BLOCKED_BY_ABILITY = "BLOCKED_BY_ABILITY",
    BLOCKED_BY_EFFECT = "BLOCKED_BY_EFFECT",
    BLOCKED_BY_SPECIAL_CONDITION = "BLOCKED_BY_SPECIAL_CONDITION",
    CAN_ONLY_SELECT_TWO_DIFFERENT_ENERGY_TYPES = "CAN_ONLY_SELECT_TWO_DIFFERENT_ENERGY_TYPES",
    CANNOT_RETREAT = "CANNOT_RETREAT",
    CANNOT_PLAY_THIS_CARD = "CANNOT_PLAY_THIS_CARD",
    CANNOT_USE_POWER = "CANNOT_USE_POWER",
    CANNOT_USE_ATTACK = "CANNOT_USE_ATTACK",
    CANNOT_ATTACK_ON_FIRST_TURN = "CANNOT_ATTACK_ON_FIRST_TURN",
    CANNOT_USE_STADIUM = "CANNOT_USE_STADIUM",
    CHOOSE_NEW_ACTIVE_POKEMON = "CHOOSE_NEW_ACTIVE_POKEMON",
    CHOOSE_PRIZE_CARD = "CHOOSE_PRIZE_CARD",
    CHOOSE_STARTING_POKEMONS = "CHOOSE_STARTING_POKEMONS",
    ENERGY_ALREADY_ATTACHED = "ENERGY_ALREADY_ATTACHED",
    FLIP_ASLEEP = "FLIP_ASLEEP",
    FLIP_BURNED = "FLIP_BURNED",
    FLIP_CONFUSION = "FLIP_CONFUSION",
    ILLEGAL_ACTION = "ILLEGAL_ACTION",
    INVALID_DECK = "INVALID_DECK",
    INVALID_GAME_STATE = "INVALID_GAME_STATE",
    INVALID_PROMPT_RESULT = "INVALID_PROMPT_RESULT",
    INVALID_TARGET = "INVALID_TARGET",
    INVITATION_MESSAGE = "INVITATION_MESSAGE",
    LEEK_SLAP_CANNOT_BE_USED_AGAIN = "LEEK_SLAP_CANNOT_BE_USED_AGAIN",
    MAX_PLAYERS_REACHED = "MAX_PLAYERS_REACHED",
    NOT_ENOUGH_ENERGY = "NOT_ENOUGH_ENERGY",
    NOT_YOUR_TURN = "NOT_YOUR_TURN",
    NO_STADIUM_IN_PLAY = "NO_STADIUM_IN_PLAY",
    POKEMON_CANT_EVOLVE_THIS_TURN = "POKEMON_CANT_EVOLVE_THIS_TURN",
    POKEMON_TOOL_ALREADY_ATTACHED = "POKEMON_TOOL_ALREADY_ATTACHED",
    POWER_ALREADY_USED = "POWER_ALREADY_USED",
    PROMPT_ALREADY_RESOLVED = "PROMPT_ALREADY_RESOLVED",
    RETREAT_ALREADY_USED = "RETREAT_ALREADY_USED",
    SAME_STADIUM_ALREADY_IN_PLAY = "SAME_STADIUM_ALREADY_IN_PLAY",
    SETUP_OPPONENT_NO_BASIC = "SETUP_OPPONENT_NO_BASIC",
    SETUP_PLAYER_NO_BASIC = "SETUP_PLAYER_NO_BASIC",
    SETUP_WHO_BEGINS_FLIP = "SETUP_WHO_BEGINS_FLIP",
    STADIUM_ALREADY_PLAYED = "STADIUM_ALREADY_PLAYED",
    STADIUM_ALREADY_USED = "STADIUM_ALREADY_USED",
    SUPPORTER_ALREADY_PLAYED = "SUPPORTER_ALREADY_PLAYED",
    UNKNOWN_ATTACK = "UNKNOWN_ATTACK",
    UNKNOWN_CARD = "UNKNOWN_CARD",
    UNKNOWN_POWER = "UNKNOWN_POWER"
}
export declare enum GameCardMessage {
    HEADS = "HEADS",
    TAILS = "TAILS",
    FLIP_COIN = "FLIP_COIN",
    GO_FIRST = "GO_FIRST",
    YES = "YES",
    NO = "NO",
    DISCARD_AND_DRAW = "DISCARD_AND_DRAW",
    SWITCH_POKEMON = "SWITCH_POKEMON",
    CHOOSE_OPTION = "CHOOSE_OPTION",
    CHOOSE_POKEMON = "CHOOSE_POKEMON",
    CHOOSE_TOOL = "CHOOSE_TOOL",
    CHOOSE_STADIUM = "CHOOSE_STADIUM",
    ALL_FIRE_ENERGIES = "ALL_FIRE_ENERGIES",
    ALL_LIGHTNING_ENERGIES = "ALL_LIGHTNING_ENERGIES",
    ALL_WATER_ENERGIES = "ALL_WATER_ENERGIES",
    ATTACH_ENERGY_CARDS = "ATTACH_ENERGY_CARDS",
    ATTACH_ENERGY_TO_ACTIVE = "ATTACH_ENERGY_TO_BENCH",
    ATTACH_ENERGY_TO_BENCH = "ATTACH_ENERGY_TO_BENCH",
    CARDS_SHOWED_BY_EFFECT = "CARDS_SHOWED_BY_EFFECT",
    CARDS_SHOWED_BY_THE_OPPONENT = "CARDS_SHOWED_BY_THE_OPPONENT",
    CHOOSE_ATTACK_TO_COPY = "CHOOSE_ATTACK_TO_COPY",
    CHOOSE_ATTACK_TO_DISABLE = "CHOOSE_ATTACK_TO_DISABLE",
    CHOOSE_CARDS_ORDER = "CHOOSE_CARDS_ORDER",
    CHOOSE_CARD_TO_ATTACH = "CHOOSE_CARD_TO_ATTACH",
    CHOOSE_CARD_TO_COPY_EFFECT = "CHOOSE_CARD_TO_COPY_EFFECT",
    CHOOSE_BASIC_POKEMON_TO_BENCH = "CHOOSE_BASIC_POKEMON_TO_BENCH",
    CHOOSE_OPPONENTS_BASIC_POKEMON_TO_BENCH = "CHOOSE_OPPONENTS_BASIC_POKEMON_TO_BENCH",
    CHOOSE_CARD_TO_DECK = "CHOOSE_CARD_TO_DECK",
    CHOOSE_CARD_TO_DISCARD = "CHOOSE_CARD_TO_DISCARD",
    CHOOSE_CARD_TO_HAND = "CHOOSE_CARD_TO_HAND",
    CHOOSE_CARD_TO_EVOLVE = "CHOOSE_CARD_TO_EVOLVE",
    CHOOSE_CARD_TO_PUT_ONTO_BENCH = "CHOOSE_CARD_TO_PUT_ONTO_BENCH",
    CHOOSE_ENERGIES_TO_DISCARD = "CHOOSE_ENERGIES_TO_DISCARD",
    CHOOSE_ENERGIES_TO_HAND = "CHOOSE_ENERGIES_TO_HAND",
    CHOOSE_ENERGY_TYPE = "CHOOSE_ENERGY_TYPE",
    CHOOSE_POKEMON_TO_ATTACH_CARDS = "CHOOSE_POKEMON_TO_ATTACH_CARDS",
    CHOOSE_POKEMON_TO_DAMAGE = "CHOOSE_POKEMON_TO_DAMAGE",
    CHOOSE_POKEMON_TO_DISCARD = "CHOOSE_POKEMON_TO_DISCARD",
    CHOOSE_POKEMON_TO_DISCARD_CARDS = "CHOOSE_POKEMON_TO_DISCARD_CARDS",
    CHOOSE_POKEMON_TO_EVOLVE = "CHOOSE_POKEMON_TO_EVOLVE",
    CHOOSE_POKEMON_TO_HEAL = "CHOOSE_POKEMON_TO_HEAL",
    CHOOSE_POKEMON_TO_PICK_UP = "CHOOSE_POKEMON_TO_PICK_UP",
    CHOOSE_POKEMON_TO_SWITCH = "CHOOSE_POKEMON_TO_SWITCH",
    CHOOSE_SPECIAL_CONDITION = "CHOOSE_SPECIAL_CONDITION",
    COIN_FLIP = "COIN_FLIP",
    MOVE_DAMAGE = "MOVE_DAMAGE",
    MOVE_ENERGY_CARDS = "MOVE_ENERGY_CARDS",
    MOVE_GRASS_ENERGY = "MOVE_GRASS_ENERGY",
    MOVE_ENERGY_TO_ACTIVE = "MOVE_ENERGY_CARDS_TO_ACTIVE",
    MOVE_ENERGY_TO_BENCH = "MOVE_ENERGY_CARDS_TO_BENCH",
    SPECIAL_CONDITION_ASLEEP = "ASLEEP",
    SPECIAL_CONDITION_BURNED = "BURNED",
    SPECIAL_CONDITION_CONFUSED = "CONFUSED",
    SPECIAL_CONDITION_PARALYZED = "PARALYZED",
    SPECIAL_CONDITION_POISONED = "POISONED",
    WANT_TO_DISCARD_ENERGY = "WANT_TO_DISCARD_ENERGY",
    WANT_TO_DRAW_CARDS = "WANT_TO_DRAW_CARDS",
    WANT_TO_PICK_UP_POKEMON = "WANT_TO_PICK_UP_POKEMON",
    WANT_TO_PLAY_BOTH_CARDS_AT_ONCE = "WANT_TO_PLAY_BOTH_CARDS_AT_ONCE",
    WANT_TO_SHUFFLE_POKEMON_INTO_DECK = "WANT_TO_SHUFFLE_POKEMON_INTO_DECK",
    WANT_TO_SWITCH_POKEMON = "WANT_TO_SWITCH_POKEMON",
    WANT_TO_USE_ABILITY = "WANT_TO_USE_ABILITY",
    CALAMITY_STORM = "CALAMITY_STORM",
    INCREASE_DAMAGE_BY_30_AGAINST_OPPONENTS_EX_AND_V_POKEMON = "INCREASE_DAMAGE_BY_30_AGAINST_OPPONENTS_EX_AND_V_POKEMON"
}
export declare enum GameLog {
    LOG_BANNED_BY_ARBITER = "LOG_BANNED_BY_ARBITER",
    LOG_FLIP_ASLEEP = "LOG_FLIP_ASLEEP",
    LOG_FLIP_CONFUSION = "LOG_FLIP_CONFUSION",
    LOG_GAME_FINISHED = "LOG_GAME_FINISHED",
    LOG_GAME_FINISHED_BEFORE_STARTED = "LOG_GAME_FINISHED_BEFORE_STARTED",
    LOG_GAME_FINISHED_DRAW = "LOG_GAME_FINISHED_DRAW",
    LOG_GAME_FINISHED_WINNER = "LOG_GAME_FINISHED_WINNER",
    LOG_HURTS_ITSELF = "LOG_HURTS_ITSELF",
    LOG_INVITATION_NOT_ACCEPTED = "LOG_INVITATION_NOT_ACCEPTED",
    LOG_PLAYER_ATTACHES_CARD = "LOG_PLAYER_ATTACHES_CARD",
    LOG_PLAYER_RETURNS_TO_DECK_FROM_DISCARD = "LOG_PLAYER_RETURNS_TO_DECK_FROM_DISCARD",
    LOG_PLAYER_COPIES_ATTACK = "LOG_PLAYER_COPIES_ATTACK",
    LOG_PLAYER_DISABLES_ATTACK = "LOG_PLAYER_DISABLES_ATTACK",
    LOG_PLAYER_DRAWS_CARD = "LOG_PLAYER_DRAWS_CARD",
    LOG_PLAYER_ENDS_TURN = "LOG_PLAYER_ENDS_TURN",
    LOG_PLAYER_EVOLVES_POKEMON = "LOG_PLAYER_EVOLVES_POKEMON",
    LOG_PLAYER_FLIPS_HEADS = "LOG_PLAYER_FLIPS_HEADS",
    LOG_PLAYER_FLIPS_TAILS = "LOG_PLAYER_FLIPS_TAILS",
    LOG_PLAYER_LEFT_THE_GAME = "LOG_PLAYER_LEFT_THE_GAME",
    LOG_PLAYER_NO_ACTIVE_POKEMON = "LOG_PLAYER_NO_ACTIVE_POKEMON",
    LOG_PLAYER_NO_CARDS_IN_DECK = "LOG_PLAYER_NO_CARDS_IN_DECK",
    LOG_PLAYER_NO_PRIZE_CARD = "LOG_PLAYER_NO_PRIZE_CARD",
    LOG_PLAYER_PLAYS_BASIC_POKEMON = "LOG_PLAYER_PLAYS_BASIC_POKEMON",
    LOG_PLAYER_PLAYS_ITEM = "LOG_PLAYER_PLAYS_ITEM",
    LOG_PLAYER_PLAYS_STADIUM = "LOG_PLAYER_PLAYS_STADIUM",
    LOG_PLAYER_PLAYS_SUPPORTER = "LOG_PLAYER_PLAYS_SUPPORTER",
    LOG_PLAYER_PLAYS_TOOL = "LOG_PLAYER_PLAYS_TOOL",
    LOG_PLAYER_RETREATS = "LOG_PLAYER_RETREATS",
    LOG_PLAYER_USES_ABILITY = "LOG_PLAYER_USES_ABILITY",
    LOG_PLAYER_USES_ATTACK = "LOG_PLAYER_USES_ATTACK",
    LOG_PLAYER_USES_STADIUM = "LOG_PLAYER_USES_STADIUM",
    LOG_POKEMON_KO = "LOG_POKEMON_KO",
    LOG_SETUP_NO_BASIC_POKEMON = "LOG_SETUP_NO_BASIC_POKEMON",
    LOG_STARTS_BECAUSE_OF_ABILITY = "LOG_STARTS_BECAUSE_OF_ABILITY",
    LOG_TEXT = "LOG_TEXT",
    LOG_TIME_ELAPSED = "LOG_TIME_ELAPSED",
    LOG_TURN = "LOG_TURN",
    LOG_PLAYER_PUTS_CARD_IN_HAND = "LOG_PLAYER_PUTS_CARD_IN_HAND"
}
export declare const GameMessage: {
    HEADS: GameCardMessage.HEADS;
    TAILS: GameCardMessage.TAILS;
    FLIP_COIN: GameCardMessage.FLIP_COIN;
    GO_FIRST: GameCardMessage.GO_FIRST;
    YES: GameCardMessage.YES;
    NO: GameCardMessage.NO;
    DISCARD_AND_DRAW: GameCardMessage.DISCARD_AND_DRAW;
    SWITCH_POKEMON: GameCardMessage.SWITCH_POKEMON;
    CHOOSE_OPTION: GameCardMessage.CHOOSE_OPTION;
    CHOOSE_POKEMON: GameCardMessage.CHOOSE_POKEMON;
    CHOOSE_TOOL: GameCardMessage.CHOOSE_TOOL;
    CHOOSE_STADIUM: GameCardMessage.CHOOSE_STADIUM;
    ALL_FIRE_ENERGIES: GameCardMessage.ALL_FIRE_ENERGIES;
    ALL_LIGHTNING_ENERGIES: GameCardMessage.ALL_LIGHTNING_ENERGIES;
    ALL_WATER_ENERGIES: GameCardMessage.ALL_WATER_ENERGIES;
    ATTACH_ENERGY_CARDS: GameCardMessage.ATTACH_ENERGY_CARDS;
    ATTACH_ENERGY_TO_ACTIVE: GameCardMessage.ATTACH_ENERGY_TO_ACTIVE;
    ATTACH_ENERGY_TO_BENCH: GameCardMessage.ATTACH_ENERGY_TO_ACTIVE;
    CARDS_SHOWED_BY_EFFECT: GameCardMessage.CARDS_SHOWED_BY_EFFECT;
    CARDS_SHOWED_BY_THE_OPPONENT: GameCardMessage.CARDS_SHOWED_BY_THE_OPPONENT;
    CHOOSE_ATTACK_TO_COPY: GameCardMessage.CHOOSE_ATTACK_TO_COPY;
    CHOOSE_ATTACK_TO_DISABLE: GameCardMessage.CHOOSE_ATTACK_TO_DISABLE;
    CHOOSE_CARDS_ORDER: GameCardMessage.CHOOSE_CARDS_ORDER;
    CHOOSE_CARD_TO_ATTACH: GameCardMessage.CHOOSE_CARD_TO_ATTACH;
    CHOOSE_CARD_TO_COPY_EFFECT: GameCardMessage.CHOOSE_CARD_TO_COPY_EFFECT;
    CHOOSE_BASIC_POKEMON_TO_BENCH: GameCardMessage.CHOOSE_BASIC_POKEMON_TO_BENCH;
    CHOOSE_OPPONENTS_BASIC_POKEMON_TO_BENCH: GameCardMessage.CHOOSE_OPPONENTS_BASIC_POKEMON_TO_BENCH;
    CHOOSE_CARD_TO_DECK: GameCardMessage.CHOOSE_CARD_TO_DECK;
    CHOOSE_CARD_TO_DISCARD: GameCardMessage.CHOOSE_CARD_TO_DISCARD;
    CHOOSE_CARD_TO_HAND: GameCardMessage.CHOOSE_CARD_TO_HAND;
    CHOOSE_CARD_TO_EVOLVE: GameCardMessage.CHOOSE_CARD_TO_EVOLVE;
    CHOOSE_CARD_TO_PUT_ONTO_BENCH: GameCardMessage.CHOOSE_CARD_TO_PUT_ONTO_BENCH;
    CHOOSE_ENERGIES_TO_DISCARD: GameCardMessage.CHOOSE_ENERGIES_TO_DISCARD;
    CHOOSE_ENERGIES_TO_HAND: GameCardMessage.CHOOSE_ENERGIES_TO_HAND;
    CHOOSE_ENERGY_TYPE: GameCardMessage.CHOOSE_ENERGY_TYPE;
    CHOOSE_POKEMON_TO_ATTACH_CARDS: GameCardMessage.CHOOSE_POKEMON_TO_ATTACH_CARDS;
    CHOOSE_POKEMON_TO_DAMAGE: GameCardMessage.CHOOSE_POKEMON_TO_DAMAGE;
    CHOOSE_POKEMON_TO_DISCARD: GameCardMessage.CHOOSE_POKEMON_TO_DISCARD;
    CHOOSE_POKEMON_TO_DISCARD_CARDS: GameCardMessage.CHOOSE_POKEMON_TO_DISCARD_CARDS;
    CHOOSE_POKEMON_TO_EVOLVE: GameCardMessage.CHOOSE_POKEMON_TO_EVOLVE;
    CHOOSE_POKEMON_TO_HEAL: GameCardMessage.CHOOSE_POKEMON_TO_HEAL;
    CHOOSE_POKEMON_TO_PICK_UP: GameCardMessage.CHOOSE_POKEMON_TO_PICK_UP;
    CHOOSE_POKEMON_TO_SWITCH: GameCardMessage.CHOOSE_POKEMON_TO_SWITCH;
    CHOOSE_SPECIAL_CONDITION: GameCardMessage.CHOOSE_SPECIAL_CONDITION;
    COIN_FLIP: GameCardMessage.COIN_FLIP;
    MOVE_DAMAGE: GameCardMessage.MOVE_DAMAGE;
    MOVE_ENERGY_CARDS: GameCardMessage.MOVE_ENERGY_CARDS;
    MOVE_GRASS_ENERGY: GameCardMessage.MOVE_GRASS_ENERGY;
    MOVE_ENERGY_TO_ACTIVE: GameCardMessage.MOVE_ENERGY_TO_ACTIVE;
    MOVE_ENERGY_TO_BENCH: GameCardMessage.MOVE_ENERGY_TO_BENCH;
    SPECIAL_CONDITION_ASLEEP: GameCardMessage.SPECIAL_CONDITION_ASLEEP;
    SPECIAL_CONDITION_BURNED: GameCardMessage.SPECIAL_CONDITION_BURNED;
    SPECIAL_CONDITION_CONFUSED: GameCardMessage.SPECIAL_CONDITION_CONFUSED;
    SPECIAL_CONDITION_PARALYZED: GameCardMessage.SPECIAL_CONDITION_PARALYZED;
    SPECIAL_CONDITION_POISONED: GameCardMessage.SPECIAL_CONDITION_POISONED;
    WANT_TO_DISCARD_ENERGY: GameCardMessage.WANT_TO_DISCARD_ENERGY;
    WANT_TO_DRAW_CARDS: GameCardMessage.WANT_TO_DRAW_CARDS;
    WANT_TO_PICK_UP_POKEMON: GameCardMessage.WANT_TO_PICK_UP_POKEMON;
    WANT_TO_PLAY_BOTH_CARDS_AT_ONCE: GameCardMessage.WANT_TO_PLAY_BOTH_CARDS_AT_ONCE;
    WANT_TO_SHUFFLE_POKEMON_INTO_DECK: GameCardMessage.WANT_TO_SHUFFLE_POKEMON_INTO_DECK;
    WANT_TO_SWITCH_POKEMON: GameCardMessage.WANT_TO_SWITCH_POKEMON;
    WANT_TO_USE_ABILITY: GameCardMessage.WANT_TO_USE_ABILITY;
    CALAMITY_STORM: GameCardMessage.CALAMITY_STORM;
    INCREASE_DAMAGE_BY_30_AGAINST_OPPONENTS_EX_AND_V_POKEMON: GameCardMessage.INCREASE_DAMAGE_BY_30_AGAINST_OPPONENTS_EX_AND_V_POKEMON;
    ACTION_IN_PROGRESS: GameStoreMessage.ACTION_IN_PROGRESS;
    ALREADY_PLAYING: GameStoreMessage.ALREADY_PLAYING;
    BLOCKED_BY_ABILITY: GameStoreMessage.BLOCKED_BY_ABILITY;
    BLOCKED_BY_EFFECT: GameStoreMessage.BLOCKED_BY_EFFECT;
    BLOCKED_BY_SPECIAL_CONDITION: GameStoreMessage.BLOCKED_BY_SPECIAL_CONDITION;
    CAN_ONLY_SELECT_TWO_DIFFERENT_ENERGY_TYPES: GameStoreMessage.CAN_ONLY_SELECT_TWO_DIFFERENT_ENERGY_TYPES;
    CANNOT_RETREAT: GameStoreMessage.CANNOT_RETREAT;
    CANNOT_PLAY_THIS_CARD: GameStoreMessage.CANNOT_PLAY_THIS_CARD;
    CANNOT_USE_POWER: GameStoreMessage.CANNOT_USE_POWER;
    CANNOT_USE_ATTACK: GameStoreMessage.CANNOT_USE_ATTACK;
    CANNOT_ATTACK_ON_FIRST_TURN: GameStoreMessage.CANNOT_ATTACK_ON_FIRST_TURN;
    CANNOT_USE_STADIUM: GameStoreMessage.CANNOT_USE_STADIUM;
    CHOOSE_NEW_ACTIVE_POKEMON: GameStoreMessage.CHOOSE_NEW_ACTIVE_POKEMON;
    CHOOSE_PRIZE_CARD: GameStoreMessage.CHOOSE_PRIZE_CARD;
    CHOOSE_STARTING_POKEMONS: GameStoreMessage.CHOOSE_STARTING_POKEMONS;
    ENERGY_ALREADY_ATTACHED: GameStoreMessage.ENERGY_ALREADY_ATTACHED;
    FLIP_ASLEEP: GameStoreMessage.FLIP_ASLEEP;
    FLIP_BURNED: GameStoreMessage.FLIP_BURNED;
    FLIP_CONFUSION: GameStoreMessage.FLIP_CONFUSION;
    ILLEGAL_ACTION: GameStoreMessage.ILLEGAL_ACTION;
    INVALID_DECK: GameStoreMessage.INVALID_DECK;
    INVALID_GAME_STATE: GameStoreMessage.INVALID_GAME_STATE;
    INVALID_PROMPT_RESULT: GameStoreMessage.INVALID_PROMPT_RESULT;
    INVALID_TARGET: GameStoreMessage.INVALID_TARGET;
    INVITATION_MESSAGE: GameStoreMessage.INVITATION_MESSAGE;
    LEEK_SLAP_CANNOT_BE_USED_AGAIN: GameStoreMessage.LEEK_SLAP_CANNOT_BE_USED_AGAIN;
    MAX_PLAYERS_REACHED: GameStoreMessage.MAX_PLAYERS_REACHED;
    NOT_ENOUGH_ENERGY: GameStoreMessage.NOT_ENOUGH_ENERGY;
    NOT_YOUR_TURN: GameStoreMessage.NOT_YOUR_TURN;
    NO_STADIUM_IN_PLAY: GameStoreMessage.NO_STADIUM_IN_PLAY;
    POKEMON_CANT_EVOLVE_THIS_TURN: GameStoreMessage.POKEMON_CANT_EVOLVE_THIS_TURN;
    POKEMON_TOOL_ALREADY_ATTACHED: GameStoreMessage.POKEMON_TOOL_ALREADY_ATTACHED;
    POWER_ALREADY_USED: GameStoreMessage.POWER_ALREADY_USED;
    PROMPT_ALREADY_RESOLVED: GameStoreMessage.PROMPT_ALREADY_RESOLVED;
    RETREAT_ALREADY_USED: GameStoreMessage.RETREAT_ALREADY_USED;
    SAME_STADIUM_ALREADY_IN_PLAY: GameStoreMessage.SAME_STADIUM_ALREADY_IN_PLAY;
    SETUP_OPPONENT_NO_BASIC: GameStoreMessage.SETUP_OPPONENT_NO_BASIC;
    SETUP_PLAYER_NO_BASIC: GameStoreMessage.SETUP_PLAYER_NO_BASIC;
    SETUP_WHO_BEGINS_FLIP: GameStoreMessage.SETUP_WHO_BEGINS_FLIP;
    STADIUM_ALREADY_PLAYED: GameStoreMessage.STADIUM_ALREADY_PLAYED;
    STADIUM_ALREADY_USED: GameStoreMessage.STADIUM_ALREADY_USED;
    SUPPORTER_ALREADY_PLAYED: GameStoreMessage.SUPPORTER_ALREADY_PLAYED;
    UNKNOWN_ATTACK: GameStoreMessage.UNKNOWN_ATTACK;
    UNKNOWN_CARD: GameStoreMessage.UNKNOWN_CARD;
    UNKNOWN_POWER: GameStoreMessage.UNKNOWN_POWER;
    ERROR_BOT_NOT_FOUND: GameCoreError.ERROR_BOT_NOT_FOUND;
    ERROR_BOT_NOT_INITIALIZED: GameCoreError.ERROR_BOT_NOT_INITIALIZED;
    ERROR_BOT_NO_DECK: GameCoreError.ERROR_BOT_NO_DECK;
    ERROR_CLIENT_NOT_CONNECTED: GameCoreError.ERROR_CLIENT_NOT_CONNECTED;
    ERROR_GAME_NOT_FOUND: GameCoreError.ERROR_GAME_NOT_FOUND;
    ERROR_INVALID_STATE: GameCoreError.ERROR_INVALID_STATE;
    ERROR_SERIALIZER: GameCoreError.ERROR_SERIALIZER;
    ERROR_SIMULATOR_NOT_STABLE: GameCoreError.ERROR_SIMULATOR_NOT_STABLE;
    MUST_BE_IN_ACTIVE_SPOT: GameCoreError.MUST_BE_IN_ACTIVE_SPOT;
};
export declare type GameMessage = GameCoreError | GameStoreMessage | GameCardMessage;
