/** @odoo-module **/

import { Component, xml, useState } from "@odoo/owl";

export class Card extends Component {
    static template = xml`
        <div class="card d-inline-block m-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"><t t-esc="props.title"/><button t-on-click="toggleOpen">Toggle</button></h5>
                <p class="card-text" t-if="this.state.isOpen">
                 <t t-slot="default"/>
                </p>
            </div>
        </div>
    `
    state = useState({'isOpen': false})

    toggleOpen() {
        this.state.isOpen = !this.state.isOpen;
    }

    static props = {
        title: {
            type: String,
            optional: false,
        },
        slots: {
            type: Object,
            shape: {
                default: true
            },
        }
    }
}
