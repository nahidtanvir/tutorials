import { Component, xml } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useClicker } from "./clicker_hook";
import { ClickerValue } from "./clicker_value";


export class ClientAction extends Component {
    static template = xml`
        <div class="ms-1 mt-1">
            <span>Clicks: <ClickerValue />
            <button class="btn btn-primary ms-1" t-on-click="() => this.clicker.increment(9)">
                Increment
            </button>
        </div>
    `
    static components = { ClickerValue };
    setup() {
        this.clicker = useClicker();
    }
}

registry.category("actions").add("awesome_clicker.client_action", ClientAction);