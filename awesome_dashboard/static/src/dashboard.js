import {Component, onWillStart, useState} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {Layout} from "@web/search/layout";
import {useService} from "@web/core/utils/hooks";
import {DashboardItem} from "./dashboard_item";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, DashboardItem };

    setup() {
        this.action = useService("action");
        this.statisticsService = useService("awesome_dashboard.statistics");
        this.statistics = useState({
            loading: true,
            data: null
        });

        onWillStart(async () => {
            this.statistics.data = await this.statisticsService.loadStatistics();
            this.statistics.loading = false;
        });
    }

    openCustomerView() {
      this.action.doAction("base.action_partner_form");
    }

    openLeads() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "All leads",
            res_model: "crm.lead",
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }
}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);