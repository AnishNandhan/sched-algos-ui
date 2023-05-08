class Proc{
    constructor(id, at, bt, prior = 1) {
        this.id = id
        this.AT = at
        this.BT = bt
        this.prior = prior
        this.RT = 0
        this.WT = 0
        this.TAT = 0
        this.CT = 0
        this.BBT = bt
    }
    minus() {
        this.BT = this.BT - 1;
    }
}