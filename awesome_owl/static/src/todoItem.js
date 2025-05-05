/** @odoo-module **/

import { Component, xml } from "@odoo/owl";

export class TodoItem extends Component {
    static template = xml`
        <div class="d-inline-block" t-att-class="{'text-muted text-decoration-line-through': props.todo.isCompleted}">
            <h6><t t-esc="props.todo.id"/>. <t t-esc="props.todo.description"/></h6>
        </div>
    `

    static props = {
        todo: {
            id: Number,
            description: String,
            isCompleted: Boolean
        }
    }
}
