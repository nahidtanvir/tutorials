import { registry } from "@web/core/registry";
import { Component, xml } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "./clicker_hook";
import { ClickerValue } from "./clicker_value";

export class ClickerSystray extends Component {
    static template = xml`
        <div class="o_nav_entry d-flex gap-1">
            Clicks: <ClickerValue />
            <button class="btn btn-secondary" t-on-click="() => this.clicker.increment(9999)">
                <i class="fa fa-lg fa-plus"></i>
            </button>
            <button class="btn btn-secondary" t-on-click="openClientAction">
                Open
            </button>
        </div>
    `;
    static props = {};
    static components = { ClickerValue };

    setup() {
        this.action = useService("action");
        this.clicker = useClicker();
    }

    openClientAction() {
        this.action.doAction({
            type: "ir.actions.client",
            tag: "awesome_clicker.client_action",
            target: "new",
            name: "Clicker Game"
        });
    }

}

export const systrayItem = {
    Component: ClickerSystray,
};

registry.category("systray").add("awesome_clicker.ClickerSystray", systrayItem, { sequence: 1000 });