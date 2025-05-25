/** @odoo-module */

import { Component, xml } from "@odoo/owl";
import { GalleryModel } from "./gallery_model";
import { GalleryImage } from "./gallery_image";
import { createElement } from "@web/core/utils/xml";

export class GalleryRenderer extends Component {
    static components = { GalleryImage };
    static template =xml`
        <t t-name="awesome_gallery.GalleryRenderer">
            <div class="row">
                <t t-foreach="props.model.records" t-as="record" t-key="record.id">
                    <div class="col-lg-2 col-md-3 col-sm-4 px-2 col-6 d-flex">
                        <GalleryImage record="record" model="props.model" onImageUpload="props.onImageUpload" tooltipTemplate="this.owlTooltipTemplate"/>
                    </div>
                </t>
            </div>
        </t>
    `;
    static props = {
        model: GalleryModel,
        onImageUpload: Function,
        tooltipTemplate: {
            optional: true,
            type: Element,
        },
    }

    setup() {
        if (this.props.tooltipTemplate) {
            const fieldsToReplace = this.props.tooltipTemplate.querySelectorAll("field");
            for (const field of fieldsToReplace) {
                const fieldName = field.getAttribute("name")
                const t = document.createElement("t")
                t.setAttribute("t-esc", `record.${fieldName}`)
                field.replaceWith(t);
            }
            const tooltipHTML = createElement("t", [this.props.tooltipTemplate]).outerHTML
            this.owlTooltipTemplate = xml`${tooltipHTML}`
        }
    }

}