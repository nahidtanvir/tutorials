import { Component, xml } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useClicker } from "./clicker_hook";
import { ClickerValue } from "./clicker_value";


export class ClientAction extends Component {
    static template = xml`
        <div class="ms-1 mt-1">
            <span>Clicks: <ClickerValue /></span>
            <button class="btn btn-primary ms-1" t-on-click="() => this.clicker.increment(9)">
                Increment
            </button>
        </div>
        <div t-if="this.clicker.level >= 1" class="ms-1 mt-1">
            <h2> Bots </h2>
<!--            <div class="card">-->
<!--                <div class="card-header">-->
<!--                    <t t-esc="this.clicker.clickBots"/>x ClickBots (10 clicks/10seconds)-->
<!--                    <i class="fa fa-android"></i>-->
<!--                </div>-->
<!--                <div class="card-body">-->
<!--                    <button t-on-click="() => this.clicker.buyClickBot()" class="btn btn-primary" t-att-disabled="this.clicker.clicks lt 1000">-->
<!--                        Buy ClickBot (1000 clicks)-->
<!--                    </button>-->
<!--                </div>-->
<!--            </div>-->
            <div class="d-flex flex-row">
                <t t-foreach="this.clicker.bots" t-as="bot" t-key="bot">
                    <div t-if="bot_value.level lte this.clicker.level" class="card me-3">
                        <div class="card-header">
                            <t t-esc="bot_value.purchased"/>x <t t-esc="bot"/> (<t t-esc="bot_value.increment"/> clicks/10seconds)
                            <i class="fa fa-android"></i>
                        </div>
                        <div class="card-body">
                            <button t-on-click="() => this.clicker.buyBot(bot)" class="btn btn-primary" t-att-disabled="this.clicker.clicks lt bot_value.price">
                                Buy <t t-esc="bot"/> (<t t-esc="bot_value.price"/> clicks)
                            </button>
                        </div>
                    </div>
                </t>
            </div>
        </div>
    `
    static components = { ClickerValue };
    setup() {
        this.clicker = useClicker();
    }
}

registry.category("actions").add("awesome_clicker.client_action", ClientAction);