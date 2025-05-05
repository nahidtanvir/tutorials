import { Component, useState, xml, useRef, onMounted } from "@odoo/owl"
import { TodoItem } from "./todoItem"

export class TodoList extends Component {
    static template = xml`
        <input type="text" placeholder="Add a todo" t-on-keyup="addTodo" t-ref="input" />
        <p t-foreach="todos" t-as="item" t-key="item.id" class="m-2">
            <TodoItem todo="item" toggleState="(id)=>this.toggleStates(id)" removeTodo="(id)=>this.removeTodo(id)" />
        </p>
    `
    static components = { TodoItem };

    setup() {
        this.todos = useState([]);
        this.next_id = useState({'value': 1});
        this.inputRef = useRef('input')
        onMounted(() => {
          this.inputRef.el.focus()
       });
    }

    addTodo(ev) {
        if (ev.key === "Enter") {
            const value = ev.target.value.trim();
            if (value) {
                this.todos.push({
                    id: this.next_id.value,
                    description: value,
                    isCompleted: false
                });
                ev.target.value = '';
                this.next_id.value += 1
            }
        }
    }

    toggleStates(id) {
        for (const todo of this.todos) {
            if (todo?.id === id) {
                todo.isCompleted = !todo.isCompleted
                break;
            }
        }
    }

    removeTodo(id) {
        console.log(id)
        for (let i = 0; i < this.todos.length; i++ ) {
            if (this.todos[i].id === id) {
                this.todos.splice(i, 1)
            }
        }
    }
}