import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { memoize } from "@web/core/utils/functions";

const statisticsService = {
    dependencies: [],
    async start() {
        const loadStatistics = memoize(async () => {
            try {
                return await rpc("/awesome_dashboard/statistics");
            } catch (error) {
                console.error("Failed to load statistics:", error);
                return null;
            }
        });

        return { loadStatistics };
    }
};

registry.category("services").add("awesome_dashboard.statistics", statisticsService);