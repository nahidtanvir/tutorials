import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
// import { memoize } from "@web/core/utils/functions";
import { reactive } from "@odoo/owl";

const statisticsService = {
    async start() {
        // const loadStatistics = memoize(async () => {
        //     try {
        //         return await rpc("/awesome_dashboard/statistics");
        //     } catch (error) {
        //         console.error("Failed to load statistics:", error);
        //         return null;
        //     }
        // });
        //
        // return { loadStatistics };
        const statistics = reactive({ isReady: false });

        async function loadData() {
            const updates = await rpc("/awesome_dashboard/statistics");
            Object.assign(statistics, updates, { isReady: true });
        }

        setInterval(loadData, 10*60*1000);
        await loadData();

        return statistics;
    }
};

registry.category("services").add("awesome_dashboard.statistics", statisticsService);