export enum GameCoreError {
  ERROR_BOT_NOT_FOUND = 'ERROR_BOT_NOT_FOUND',
  ERROR_BOT_NOT_INITIALIZED = 'ERROR_BOT_NOT_INITIALIZED',
  ERROR_BOT_NO_DECK = 'ERROR_BOT_NO_DECK',
  ERROR_CLIENT_NOT_CONNECTED = 'ERROR_CLIENT_NOT_CONNECTED',
  ERROR_GAME_NOT_FOUND = 'ERROR_GAME_NOT_FOUND',
  ERROR_INVALID_STATE = 'ERROR_INVALID_STATE',
  ERROR_SERIALIZER = 'ERROR_SERIALIZER',
  ERROR_SIMULATOR_NOT_STABLE = 'ERROR_SIMULATOR_NOT_STABLE',
  MUST_BE_IN_ACTIVE_SPOT = 'MUST_BE_IN_ACTIVE_SPOT'
}

export enum GameStoreMessage {
  ACTION_IN_PROGRESS = 'ACTION_IN_PROGRESS',
  ALREADY_PLAYING = 'ALREADY_PLAYING',
  BLOCKED_BY_ABILITY = 'BLOCKED_BY_ABILITY',
  BLOCKED_BY_EFFECT = 'BLOCKED_BY_EFFECT',
  BLOCKED_BY_SPECIAL_CONDITION = 'BLOCKED_BY_SPECIAL_CONDITION',
  CAN_ONLY_SELECT_TWO_DIFFERENT_ENERGY_TYPES = 'CAN_ONLY_SELECT_TWO_DIFFERENT_ENERGY_TYPES',
  CANNOT_RETREAT = 'CANNOT_RETREAT',
  CANNOT_PLAY_THIS_CARD = 'CANNOT_PLAY_THIS_CARD',
  CANNOT_USE_POWER = 'CANNOT_USE_POWER',
  CANNOT_USE_ATTACK = 'CANNOT_USE_ATTACK',
  CANNOT_ATTACK_ON_FIRST_TURN = 'CANNOT_ATTACK_ON_FIRST_TURN',
  CANNOT_USE_STADIUM = 'CANNOT_USE_STADIUM',
  CHOOSE_NEW_ACTIVE_POKEMON = 'CHOOSE_NEW_ACTIVE_POKEMON',
  CHOOSE_PRIZE_CARD = 'CHOOSE_PRIZE_CARD',
  CHOOSE_STARTING_POKEMONS = 'CHOOSE_STARTING_POKEMONS',
  ENERGY_ALREADY_ATTACHED = 'ENERGY_ALREADY_ATTACHED',
  FLIP_ASLEEP = 'FLIP_ASLEEP',
  FLIP_BURNED = 'FLIP_BURNED',
  FLIP_CONFUSION = 'FLIP_CONFUSION',
  ILLEGAL_ACTION = 'ILLEGAL_ACTION',
  INVALID_DECK = 'INVALID_DECK',
  INVALID_GAME_STATE = 'INVALID_GAME_STATE',
  INVALID_PROMPT_RESULT = 'INVALID_PROMPT_RESULT',
  INVALID_TARGET = 'INVALID_TARGET',
  INVITATION_MESSAGE = 'INVITATION_MESSAGE',
  LEEK_SLAP_CANNOT_BE_USED_AGAIN = 'LEEK_SLAP_CANNOT_BE_USED_AGAIN',
  MAX_PLAYERS_REACHED = 'MAX_PLAYERS_REACHED',
  NOT_ENOUGH_ENERGY = 'NOT_ENOUGH_ENERGY',
  NOT_YOUR_TURN = 'NOT_YOUR_TURN',
  NO_STADIUM_IN_PLAY = 'NO_STADIUM_IN_PLAY',
  POKEMON_CANT_EVOLVE_THIS_TURN = 'POKEMON_CANT_EVOLVE_THIS_TURN',
  POKEMON_TOOL_ALREADY_ATTACHED = 'POKEMON_TOOL_ALREADY_ATTACHED',
  POWER_ALREADY_USED = 'POWER_ALREADY_USED',
  PROMPT_ALREADY_RESOLVED = 'PROMPT_ALREADY_RESOLVED',
  RETREAT_ALREADY_USED = 'RETREAT_ALREADY_USED',
  SAME_STADIUM_ALREADY_IN_PLAY = 'SAME_STADIUM_ALREADY_IN_PLAY',
  SETUP_OPPONENT_NO_BASIC = 'SETUP_OPPONENT_NO_BASIC',
  SETUP_PLAYER_NO_BASIC = 'SETUP_PLAYER_NO_BASIC',
  SETUP_WHO_BEGINS_FLIP = 'SETUP_WHO_BEGINS_FLIP',
  STADIUM_ALREADY_PLAYED = 'STADIUM_ALREADY_PLAYED',
  STADIUM_ALREADY_USED = 'STADIUM_ALREADY_USED',
  SUPPORTER_ALREADY_PLAYED = 'SUPPORTER_ALREADY_PLAYED',
  UNKNOWN_ATTACK = 'UNKNOWN_ATTACK',
  UNKNOWN_CARD = 'UNKNOWN_CARD',
  UNKNOWN_POWER = 'UNKNOWN_POWER',
  LABEL_VSTAR_USED = 'LABEL_VSTAR_USED',
  CAN_ONLY_ATTACH_TO_PSYCHIC = 'CAN_ONLY_ATTACH_TO_PSYCHIC'
}

export enum GameCardMessage {
  HEADS = 'HEADS',
  TAILS = 'TAILS',
  FLIP_COIN = 'FLIP_COIN',
  GO_FIRST = 'GO_FIRST',
  YES = 'YES',
  NO = 'NO',
  UP = 'UP',
  DOWN = 'DOWN',
  DISCARD_AND_DRAW = 'DISCARD_AND_DRAW',
  SWITCH_POKEMON = 'SWITCH_POKEMON',
  CHOOSE_OPTION = 'CHOOSE_OPTION',
  CHOOSE_POKEMON = 'CHOOSE_POKEMON',
  CHOOSE_TOOL = 'CHOOSE_TOOL',
  CHOOSE_STADIUM = 'CHOOSE_STADIUM',
  ALL_FIRE_ENERGIES = 'ALL_FIRE_ENERGIES',
  ALL_LIGHTNING_ENERGIES = 'ALL_LIGHTNING_ENERGIES',
  ALL_WATER_ENERGIES = 'ALL_WATER_ENERGIES',
  ATTACH_ENERGY_CARDS = 'ATTACH_ENERGY_CARDS',
  ATTACH_ENERGY_TO_ACTIVE = 'ATTACH_ENERGY_TO_ACTIVE',
  ATTACH_ENERGY_TO_BENCH = 'ATTACH_ENERGY_TO_BENCH',
  CARDS_SHOWED_BY_EFFECT = 'CARDS_SHOWED_BY_EFFECT',
  CARDS_SHOWED_BY_THE_OPPONENT = 'CARDS_SHOWED_BY_THE_OPPONENT',
  CHOOSE_ATTACK_TO_COPY = 'CHOOSE_ATTACK_TO_COPY',
  CHOOSE_ATTACK_TO_DISABLE = 'CHOOSE_ATTACK_TO_DISABLE',
  CHOOSE_CARDS_ORDER = 'CHOOSE_CARDS_ORDER',
  CHOOSE_CARD_TO_ATTACH = 'CHOOSE_CARD_TO_ATTACH',
  CHOOSE_CARD_TO_COPY_EFFECT = 'CHOOSE_CARD_TO_COPY_EFFECT',
  CHOOSE_CARDS_TO_RETURN_TO_PRIZES = 'CHOOSE_CARDS_TO_RETURN_TO_PRIZES',
  CHOOSE_BASIC_POKEMON_TO_BENCH = 'CHOOSE_BASIC_POKEMON_TO_BENCH',  
  CHOOSE_OPPONENTS_BASIC_POKEMON_TO_BENCH = 'CHOOSE_OPPONENTS_BASIC_POKEMON_TO_BENCH',
  CHOOSE_CARD_TO_DECK = 'CHOOSE_CARD_TO_DECK',
  CHOOSE_CARD_TO_DISCARD = 'CHOOSE_CARD_TO_DISCARD',
  CHOOSE_CARD_TO_HAND = 'CHOOSE_CARD_TO_HAND',
  CHOOSE_CARDS_TO_PUT_ON_TOP_OF_THE_DECK = 'CHOOSE_CARDS_TO_PUT_ON_TOP_OF_THE_DECK',
  CHOOSE_ONE_ITEM_AND_ONE_TOOL_TO_HAND = 'CHOOSE_ONE_ITEM_AND_ONE_TOOL_TO_HAND',
  CHOOSE_ONE_DARK_POKEMON_AND_ONE_ENERGY_TO_HAND = 'CHOOSE_ONE_DARK_POKEMON_AND_ONE_ENERGY_TO_HAND',
  CHOOSE_ONE_ITEM_AND_ONE_LIGHTNING_ENERGY_TO_HAND = 'CHOOSE_ONE_ITEM_AND_ONE_LIGHTNING_ENERGY_TO_HAND',
  CHOOSE_CARD_TO_EVOLVE = 'CHOOSE_CARD_TO_EVOLVE',
  CHOOSE_CARD_TO_PUT_ONTO_BENCH = 'CHOOSE_CARD_TO_PUT_ONTO_BENCH',
  CHOOSE_ENERGIES_TO_DISCARD = 'CHOOSE_ENERGIES_TO_DISCARD',
  CHOOSE_ENERGIES_TO_HAND = 'CHOOSE_ENERGIES_TO_HAND',
  CHOOSE_ENERGY_TYPE = 'CHOOSE_ENERGY_TYPE',
  CHOOSE_POKEMON_TO_ATTACH_CARDS = 'CHOOSE_POKEMON_TO_ATTACH_CARDS',
  CHOOSE_POKEMON_TO_DAMAGE = 'CHOOSE_POKEMON_TO_DAMAGE',
  CHOOSE_POKEMON_TO_DISCARD = 'CHOOSE_POKEMON_TO_DISCARD',
  CHOOSE_POKEMON_TO_DISCARD_CARDS = 'CHOOSE_POKEMON_TO_DISCARD_CARDS',
  CHOOSE_POKEMON_TO_EVOLVE = 'CHOOSE_POKEMON_TO_EVOLVE',
  CHOOSE_POKEMON_TO_HEAL = 'CHOOSE_POKEMON_TO_HEAL',
  CHOOSE_POKEMON_TO_PICK_UP = 'CHOOSE_POKEMON_TO_PICK_UP',
  CHOOSE_POKEMON_TO_SWITCH = 'CHOOSE_POKEMON_TO_SWITCH',
  CHOOSE_ENERGY_TO_DISCARD = 'CHOOSE_ENERGY_TO_DISCARD',
  CHOOSE_SPECIAL_CONDITION = 'CHOOSE_SPECIAL_CONDITION',
  COIN_FLIP = 'COIN_FLIP',
  MOVE_DAMAGE = 'MOVE_DAMAGE',
  MOVE_ENERGY_CARDS = 'MOVE_ENERGY_CARDS',
  MOVE_GRASS_ENERGY = 'MOVE_GRASS_ENERGY',
  MOVE_ENERGY_TO_ACTIVE = 'MOVE_ENERGY_CARDS_TO_ACTIVE',
  MOVE_ENERGY_TO_BENCH = 'MOVE_ENERGY_CARDS_TO_BENCH',
  SHUFFLE_AND_DRAW_5_CARDS = 'SHUFFLE_AND_DRAW_5_CARDS',
  SPECIAL_CONDITION_ASLEEP = 'ASLEEP',
  SPECIAL_CONDITION_BURNED = 'BURNED',
  SPECIAL_CONDITION_CONFUSED = 'CONFUSED',
  SPECIAL_CONDITION_PARALYZED = 'PARALYZED',
  SPECIAL_CONDITION_POISONED = 'POISONED',
  WANT_TO_DISCARD_ENERGY = 'WANT_TO_DISCARD_ENERGY',
  WANT_TO_DRAW_CARDS = 'WANT_TO_DRAW_CARDS',
  WANT_TO_HEAL_POKEMON = 'WANT_TO_HEAL_POKEMON',
  WANT_TO_PICK_UP_POKEMON = 'WANT_TO_PICK_UP_POKEMON',
  WANT_TO_PLAY_BOTH_CARDS_AT_ONCE = 'WANT_TO_PLAY_BOTH_CARDS_AT_ONCE',
  WANT_TO_SHUFFLE_POKEMON_INTO_DECK = 'WANT_TO_SHUFFLE_POKEMON_INTO_DECK',
  WANT_TO_SWITCH_POKEMON = 'WANT_TO_SWITCH_POKEMON',
  WANT_TO_USE_ABILITY = 'WANT_TO_USE_ABILITY',
  WHICH_DIRECTION_TO_PLACE_STADIUM = 'WHICH_DIRECTION_TO_PLACE_STADIUM',
  CALAMITY_STORM = 'CALAMITY_STORM',
  INCREASE_DAMAGE_BY_30_AGAINST_OPPONENTS_EX_AND_V_POKEMON = 'INCREASE_DAMAGE_BY_30_AGAINST_OPPONENTS_EX_AND_V_POKEMON',
  DISCARD_STADIUM_OR_TOOL = 'DISCARD_STADIUM_OR_TOOL',
  CHOICE_TOOL = 'CHOICE_TOOL',
  CHOICE_STADIUM = 'CHOICE_STADIUM',
  WANT_TO_DISCARD_STADIUM = 'WANT_TO_DISCARD_STADIUM',
  WANT_TO_DRAW_UNTIL_6 = 'WANT_TO_DRAW_UNTIL_6',
  WANT_TO_USE_FESTIVAL_FEVER = 'WANT_TO_USE_FESTIVAL_FEVER',
  CANNOT_EVOLVE_ON_YOUR_FIRST_TURN = 'CANNOT_EVOLVE_ON_YOUR_FIRST_TURN',
  WANT_TO_USE_TORRENTIAL_PUMP = 'WANT_TO_USE_TORRENTIAL_PUMP',
  WANT_TO_ATTACH_ONLY_FIGHTING_ENERGY = 'WANT_TO_ATTACH_ONLY_FIGHTING_ENERGY',
  WANT_TO_ATTACH_ONLY_FIRE_ENERGY = 'WANT_TO_ATTACH_ONLY_FIRE_ENERGY',
  WANT_TO_ATTACH_ONE_OF_EACH = 'WANT_TO_ATTACH_ONE_OF_EACH',
  WANT_TO_DISCARD_CARDS = 'WANT_DISCARD_CARDS',
  MULLIGAN_CARDS = 'MULLIGAN_CARDS',
  DRAW = 'DRAW',
  CARD = 'CARD',
  CARDS = 'CARDS',
}

export enum GameLog {
  LOG_BANNED_BY_ARBITER = 'LOG_BANNED_BY_ARBITER', // { name }
  LOG_FLIP_ASLEEP = 'LOG_FLIP_ASLEEP', // { name }
  LOG_FLIP_CONFUSION = 'LOG_FLIP_CONFUSION', // { name }
  LOG_GAME_FINISHED = 'LOG_GAME_FINISHED',
  LOG_GAME_FINISHED_BEFORE_STARTED = 'LOG_GAME_FINISHED_BEFORE_STARTED',
  LOG_GAME_FINISHED_DRAW = 'LOG_GAME_FINISHED_DRAW',
  LOG_GAME_FINISHED_WINNER = 'LOG_GAME_FINISHED_WINNER', // { name }
  LOG_HURTS_ITSELF = 'LOG_HURTS_ITSELF',
  LOG_INVITATION_NOT_ACCEPTED = 'LOG_INVITATION_NOT_ACCEPTED', // { name }
  LOG_PLAYER_ATTACHES_CARD = 'LOG_PLAYER_ATTACHES_CARD', // { name, card, pokemon }
  LOG_PLAYER_RETURNS_TO_DECK_FROM_DISCARD = 'LOG_PLAYER_RETURNS_TO_DECK_FROM_DISCARD', // { name, card }
  LOG_PLAYER_COPIES_ATTACK = 'LOG_PLAYER_COPIES_ATTACK', // { name, attack }
  LOG_PLAYER_DISABLES_ATTACK = 'LOG_PLAYER_DISABLES_ATTACK', // { name, attack }
  LOG_PLAYER_DRAWS_CARD = 'LOG_PLAYER_DRAWS_CARD', // { name }
  LOG_PLAYER_ENDS_TURN = 'LOG_PLAYER_ENDS_TURN', // { name }
  LOG_PLAYER_EVOLVES_POKEMON = 'LOG_PLAYER_EVOLVES_POKEMON', // { name, card, pokemon }
  LOG_PLAYER_FLIPS_HEADS = 'LOG_PLAYER_FLIPS_HEADS', // { name }
  LOG_PLAYER_FLIPS_TAILS = 'LOG_PLAYER_FLIPS_TAILS', // { name }
  LOG_PLAYER_LEFT_THE_GAME = 'LOG_PLAYER_LEFT_THE_GAME', // { name }
  LOG_PLAYER_HEALS_POKEMON = 'LOG_PLAYER_HEALS_POKEMON', // { name, pokemon, healingAmount }
  LOG_PLAYER_NO_ACTIVE_POKEMON = 'LOG_PLAYER_NO_ACTIVE_POKEMON', // { name }
  LOG_PLAYER_NO_CARDS_IN_DECK = 'LOG_PLAYER_NO_CARDS_IN_DECK', // { name }
  LOG_PLAYER_NO_PRIZE_CARD = 'LOG_PLAYER_NO_PRIZE_CARD', // { name }
  LOG_PLAYER_PLAYS_BASIC_POKEMON = 'LOG_PLAYER_PLAYS_BASIC_POKEMON', // { name, card }
  LOG_PLAYER_PLAYS_ITEM = 'LOG_PLAYER_PLAYS_ITEM', // { name, card }
  LOG_PLAYER_PLAYS_STADIUM = 'LOG_PLAYER_PLAYS_STADIUM', // { name, card }
  LOG_PLAYER_PLAYS_SUPPORTER = 'LOG_PLAYER_PLAYS_SUPPORTER', // { name, card }
  LOG_PLAYER_PLAYS_TOOL = 'LOG_PLAYER_PLAYS_TOOL', // { name, card, pokemon }
  LOG_PLAYER_RETREATS = 'LOG_PLAYER_RETREATS', // { name, active, benched }
  LOG_PLAYER_SWITCHES_POKEMON_WITH_POKEMON_FROM_DECK = 'LOG_PLAYER_SWITCHES_POKEMON_WITH_POKEMON_FROM_DECK',
  LOG_PLAYER_USES_ABILITY = 'LOG_PLAYER_USES_ABILITY', // { name, ability }
  LOG_PLAYER_USES_ATTACK = 'LOG_PLAYER_USES_ATTACK', // { name, attack }
  LOG_PLAYER_USES_STADIUM = 'LOG_PLAYER_USES_STADIUM',
  LOG_POKEMON_KO = 'LOG_POKEMON_KO', // { name }
  LOG_SETUP_NO_BASIC_POKEMON = 'LOG_SETUP_NO_BASIC_POKEMON', // { name }
  LOG_STARTS_BECAUSE_OF_ABILITY = 'LOG_STARTS_BECAUSE_OF_ABILITY', // { name, ability }
  LOG_TEXT = 'LOG_TEXT', // { text }
  LOG_TIME_ELAPSED = 'LOG_TIME_ELAPSED', // { name }
  LOG_TURN = 'LOG_TURN', // { turn }
  LOG_PLAYER_GUSTS_POKEMON_TO_ACTIVE = 'LOG_PLAYER_GUSTS_POKEMON_TO_ACTIVE', // { name, card }
  LOG_PLAYER_DISCARDS_WITH_FIELD_BLOWER = 'LOG_PLAYER_DISCARDS_WITH_FIELD_BLOWER', // { name, card }
  LOG_PLAYER_SWITCHES_POKEMON_TO_ACTIVE = 'LOG_PLAYER_SWITCHES_POKEMON_TO_ACTIVE', // { name, card }
  LOG_PLAYER_DISCARDS_CARD_FROM_HAND = 'LOG_PLAYER_DISCARDS_CARD_FROM_HAND', // { name, card }
  LOG_DISCARD_STADIUM_CHAOTIC_SWELL = 'LOG_DISCARD_STADIUM_CHAOTIC_SWELL', // { name, card }
  LOG_PLAYER_PUTS_CARD_IN_LOST_ZONE = 'LOG_PLAYER_PUTS_CARD_IN_LOST_ZONE', // { name, card }
  LOG_PLAYER_PUTS_CARD_IN_HAND = 'LOG_PLAYER_PUTS_CARD_IN_HAND', // { name, card, pokemon }
  LOG_HISUIAN_HEAVY_BALL = 'LOG_HISUIAN_HEAVY_BALL', // { name, card }
}

// tslint:disable-next-line
export const GameMessage = { ...GameCoreError, ...GameStoreMessage, ...GameCardMessage };
export type GameMessage = GameCoreError | GameStoreMessage | GameCardMessage;
