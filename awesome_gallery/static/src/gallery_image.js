/** @odoo-module */

import { Component, xml } from "@odoo/owl";
import { url } from "@web/core/utils/urls";
import { GalleryModel } from "./gallery_model";
import { useService } from "@web/core/utils/hooks";
import { FileUploader } from "@web/views/fields/file_handler";
import { useTooltip } from "@web/core/tooltip/tooltip_hook";

export class GalleryImage extends Component {
    static components = { FileUploader }
    static template = xml`
        <t t-name="awesome_gallery.GalleryImage">
            <div t-ref="tooltip" class="card w-100 mb-4" t-on-click="() => this.onImageClick(props.record.id)" t-att-data-tooltip="props.record[props.model.tooltipField]">
                <img t-if='props.record[props.model.imageField]' loading="lazy" t-att-src='imageUrl'/>
                <div t-on-click.stop="" class="h-100 opacity-0 opacity-100-hover">
                    <FileUploader
                        acceptedFileExtensions="'image/*'"
                        onUploaded.bind="_onFileUploaded"
                    >
                        <t t-set-slot="toggler">
                            <button class="btn btn-secondary position-absolute bottom-0 end-0 m-3"> Upload image </button>
                        </t>
                    </FileUploader>
                </div>
            </div>
        </t>
    `;
    static props = {
        record: Object,
        model: GalleryModel,
        onImageUpload: Function,
        tooltipTemplate: {
            optional: true,
            type: String,
        },
    };

    setup() {
        this.action = useService("action");

        if (this.props.tooltipTemplate) {
            useTooltip("tooltip", {
                info: { record: this.props.record },
                template: this.props.tooltipTemplate,
            });
        }
    }

    onImageClick(resId) {
        this.action.switchView("form", { resId });
    }

    get imageUrl() {
        return url("/web/image", {
            model: this.props.model.resModel,
            id: this.props.record.id,
            field: this.props.model.imageField,
            unique: this.props.record.write_date,
        });
    }

    async _onFileUploaded({ data }) {
        await this.props.onImageUpload(this.props.record.id, data);
    }
}