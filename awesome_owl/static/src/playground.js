/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { Counter } from "./counter"
import { Card } from "./card"
import { TodoList } from "./todoList";

export class Playground extends Component {
    static template = "awesome_owl.playground";
    static components = { Counter, Card, TodoList };

    setup() {
        // this.htmlContent = markup("<strong>This is bold</strong> and <em>this is italic</em>");
        // this.htmlContent2 = markup("<span class='text-danger'>This is red text</span> with some normal text");
        this.state = useState({ sum: 0 });
    }

    incrementSum() {
        this.state.sum++;
    }
}
