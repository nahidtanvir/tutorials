import { Component, xml } from "@odoo/owl";
import { PieChart } from "./pie_chart";

export class PieChartCard extends Component {
    static template = xml`
        <t t-esc="props.title"/>
        <PieChart data="props.values" label="''"/>
    `;
    static components = { PieChart }
    static props = {
        title: {
            type: String,
        },
        values: {
            type: Object,
        },
    }
}