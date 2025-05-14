import { Component, onWillStart, onMounted, useState, useRef, onWillUnmount } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { getColor } from "@web/core/colors/colors";

export class PieChart extends Component {
    static template = "awesome_dashboard.PieChart";
    static props = {data: Object};

    setup() {
        this.canvasRef = useRef("canvas");
        this.chart = null;

        onWillStart(() => loadJS("/web/static/lib/Chart/Chart.js"));
        onMounted(() => {
            this.renderChart();
        });
        onWillUnmount(() => {
            this.chart.destroy();
        });
    }

    renderChart() {
        this.chart = new Chart(this.canvasRef.el, {
            type: 'pie',
            data: {
                labels: Object.keys(this.props.data),
                datasets: [{
                    data: Object.values(this.props.data),
                    backgroundColor: Object.values(this.props.data).map((_, index) => getColor(index)),
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}