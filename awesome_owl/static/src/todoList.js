import { Component, useState, xml } from "@odoo/owl"
import { TodoItem } from "./todoItem"

export class TodoList extends Component {
    static template = xml`
        <input type="text" placeholder="Add a todo" t-on-keyup="addTodo" />
        <p t-foreach="todos" t-as="item" t-key="item.id" class="m-2">
            <TodoItem todo="item" />
        </p>
    `
    static components = { TodoItem };

    setup() {
        this.todos = useState([]);
    }

    addTodo(ev) {
        if (ev.key === "Enter") {
            const value = ev.target.value.trim();
            if (value) {
                this.todos.push({
                    id: this.todos.length + 1,
                    description: value,
                    isCompleted: false
                });
                ev.target.value = '';
            }
        }
    }
}