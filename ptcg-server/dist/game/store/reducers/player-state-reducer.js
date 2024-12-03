import { ChangeAvatarAction } from '../actions/change-avatar-action';
import { ReorderBenchAction } from '../actions/reorder-actions';
export function playerStateReducer(store, state, action) {
    if (action instanceof ReorderBenchAction) {
        const player = state.players.find(p => p.id === action.id);
        if (player === undefined || player.bench[action.from] === undefined) {
            return state;
        }
        const temp = player.bench[action.from];
        player.bench[action.from] = player.bench[action.to];
        player.bench[action.to] = temp;
        return state;
    }
    // if (action instanceof ReorderHandAction) {
    //   const player = state.players.find(p => p.id === action.id);
    //   if (player === undefined || player.hand.cards.length !== action.order.length) {
    //     return state;
    //   }
    //   player.hand.applyOrder(action.order);
    //   return state;
    // }
    if (action instanceof ChangeAvatarAction) {
        const player = state.players.find(p => p.id === action.id);
        if (player === undefined) {
            return state;
        }
        player.avatarName = action.avatarName;
        if (action.log) {
            store.log(state, action.log.message, action.log.params, player.id);
        }
        return state;
    }
    return state;
}
