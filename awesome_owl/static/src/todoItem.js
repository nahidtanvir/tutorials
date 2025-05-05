/** @odoo-module **/

import { Component, xml } from "@odoo/owl";

export class TodoItem extends Component {
    static template = xml`
        <div class="d-inline-block" t-att-class="{'text-muted text-decoration-line-through': props.todo.isCompleted}">
            <h6>
                <input class="me-2" type="checkbox" t-att-checked="props.todo.isCompleted" t-on-change="()=>props.toggleState(props.todo.id)" />
                <t t-esc="props.todo.id"/>. <t t-esc="props.todo.description"/>
                <span class="fa fa-remove ms-2 text-danger" t-on-click="()=>props.removeTodo(props.todo.id)"/>
            </h6>
        </div>
    `

    static props = {
        todo: {
            id: Number,
            description: String,
            isCompleted: Boolean
        },
        toggleState: Function,
        removeTodo: Function,
    }
}
