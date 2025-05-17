import { Component, xml } from "@odoo/owl";
import { humanNumber } from "@web/core/utils/numbers";
import { useClicker } from "./clicker_hook";

export class ClickerValue extends Component {
    static template = xml`
        <span t-att-data-tooltip="this.clicker.state.clicks" t-esc="humanizedClicks"/>
    `;
    static props = {};

    setup() {
        this.clicker = useClicker();
    }

    get humanizedClicks() {
        return humanNumber(this.clicker.state.clicks, {
            decimals: 1,
        });
    }
}