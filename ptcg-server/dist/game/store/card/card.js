import { CardList } from '../state/card-list';
export class Card {
    constructor() {
        this.id = -1;
        this.regulationMark = '';
        this.tags = [];
        this.setNumber = '';
        this.cardImage = '';
        this.retreat = [];
        this.cards = new CardList;
    }
    reduceEffect(store, state, effect) {
        return state;
    }
}
