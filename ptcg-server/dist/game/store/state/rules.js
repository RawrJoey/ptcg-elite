export class Rules {
    constructor(init = {}) {
        this.firstTurnDrawCard = true;
        this.firstTurnUseSupporter = true;
        this.attackFirstTurn = false;
        this.unlimitedEnergyAttachments = false;
        Object.assign(this, init);
    }
}
