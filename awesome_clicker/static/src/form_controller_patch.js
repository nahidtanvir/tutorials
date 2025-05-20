import { FormController } from "@web/views/form/form_controller";
import { patch } from "@web/core/utils/patch";
import { useClicker } from "./clicker_hook";

patch(FormController.prototype, {
    setup(...args) {
        super.setup(...args);
        if (Math.random() < 0.5) {
            const clicker = useClicker();
            clicker.giveReward();
        }
    },
});