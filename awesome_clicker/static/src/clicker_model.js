import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";
import { rewards } from "./click_rewards";
import { choose } from "./utils";

export class ClickerModel extends Reactive {
    constructor() {
        super();
        this.clicks = 0;
        this.level = 0;
        // this.clickBots = 0;
        this.bus = new EventBus();
        // used to trigger events and increase level
        this.milestones = [
            { clicks: 1000, unlock: "clickBot" },
            { clicks: 5000, unlock: "bigBot" },
            { clicks: 100000, unlock: "power multiplier" },
        ];
        // used to calculate bot clicks every 10 seconds
        this.bots = {
            clickbot: {
                price: 1000,
                level: 1,
                increment: 10,
                purchased: 0,
            },
            bigbot: {
                price: 5000,
                level: 2,
                increment: 100,
                purchased: 0,
            }
        };
        this.multiplier = 1;
        this.trees = {
            pearTree: {
                price: 1000000,
                level: 4,
                produce: "pear",
                purchased: 0,
            },
            cherryTree: {
                price: 1000000,
                level: 4,
                produce: "cherry",
                purchased: 0,
            },
        }
        this.fruits = {
            pear: 0,
            cherry: 0,
        }
    }

    addClick() {
        this.increment(1);
    }

    /**
     * This method is supposed to be periodically called by outside code, at some
     * proper interval
     */
    tick() {
        // this.clicks += this.clickBots * 10;
        for (const bot in this.bots) {
            this.clicks += this.bots[bot].increment * this.bots[bot].purchased * this.multiplier;
        }
    }

    increment(inc) {
        this.clicks += inc;
        // if (this.level < 1 && this.clicks >= 1000) {
        //     this.bus.trigger("MILESTONE_1k");
        //     this.level++;
        // }
        if (
            this.milestones[this.level] &&
            this.clicks >= this.milestones[this.level].clicks
        ) {
            this.bus.trigger("MILESTONE", this.milestones[this.level]);
            this.level += 1;
        }
    }

    // buyClickBot() {
    //     const clickBotPrice = 1000;
    //     if (this.clicks < clickBotPrice) {
    //         return false;
    //     }
    //     this.clicks -= clickBotPrice;
    //     this.clickBots += 1;
    // }

    buyBot(name) {
        if (!Object.keys(this.bots).includes(name)) {
            throw new Error(`Invalid bot name ${name}`);
        }
        if (this.clicks < this.bots[name].price) {
            return false;
        }

        this.clicks -= this.bots[name].price;
        this.bots[name].purchased += 1;
    }

    buyMultiplier() {
        if (this.clicks < 50000) {
            return false;
        }
        this.clicks -= 50000;
        this.multiplier++;
    }

    giveReward() {
        const availableReward = [];
        for (const reward of rewards) {
            if (reward.minLevel <= this.level || !reward.minLevel) {
                if (reward.maxLevel >= this.level || !reward.maxLevel) {
                    availableReward.push(reward);
                }
            }
        }
        const reward = choose(availableReward);
        this.bus.trigger("REWARD", reward);
        return reward;
    }
}