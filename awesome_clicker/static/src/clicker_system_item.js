import { registry } from "@web/core/registry";
import { Component, xml } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "./clicker_hook";
import { ClickerValue } from "./clicker_value";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";

export class ClickerSystray extends Component {
    static template = xml`
        <div class="o_nav_entry d-flex gap-1">
<!--            Clicks: <ClickerValue />-->
<!--            <button class="btn btn-secondary" t-on-click="() => this.clicker.increment(9999)">-->
<!--                <i class="fa fa-lg fa-plus"></i>-->
<!--            </button>-->
<!--            <button class="btn btn-secondary" t-on-click="openClientAction">-->
<!--                Open-->
<!--            </button>-->
            <Dropdown>
                <button>
                    <ClickerValue/> <i class="fa fa-mouse-pointer fa-fw"></i>,
                    <t t-esc="this.numberTrees"/> <i class="fa fa-tree fa-fw"></i>,
                    <t t-esc="this.numberFruits"/> <i class="fa fa-apple fa-fw"></i>
                </button>
                <t t-set-slot="content">
                    <DropdownItem>
                        <button class="btn btn-secondary" t-on-click="this.openClientAction"> Open the clicker game </button>
                    </DropdownItem>
                    <DropdownItem>
                        <button class="btn btn-secondary" t-on-click="() => this.clicker.buyBot('clickbot')"> Buy a ClickBot </button>
                    </DropdownItem>
                    <DropdownItem t-foreach="this.clicker.trees" t-as="tree" t-key="tree">
                        <t t-esc="tree_value.purchased"/>x
                        <t t-esc="tree"/>
                    </DropdownItem>
                    <DropdownItem t-foreach="this.clicker.fruits" t-as="fruit" t-key="fruit">
                        <t t-esc="fruit_value"/>x
                        <t t-esc="fruit"/>
                    </DropdownItem>
                </t>
            </Dropdown>
        </div>
    `;
    static props = {};
    static components = { ClickerValue, Dropdown, DropdownItem };

    setup() {
        this.action = useService("action");
        this.clicker = useClicker();
    }

    get numberTrees() {
        let sum = 0;
        for (const tree in this.clicker.trees) {
            sum += this.clicker.trees[tree].purchased;
        }
        return sum;
    }

    get numberFruits() {
        let sum = 0;
        for (const fruit in this.clicker.fruits) {
            sum += this.clicker.fruits[fruit];
        }
        return sum;
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