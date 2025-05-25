/** @odoo-module */

import { Component, xml, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import {Layout} from "@web/search/layout";
import { standardViewProps } from "@web/views/standard_view_props";
import { usePager } from "@web/search/pager_hook";

export class GalleryController extends Component {
    static components = { Layout };
    static template = xml`
        <t t-name="awesome_gallery.GalleryController">
            <Layout display="props.display" className="'h-100 overflow-auto'">
                <t t-component="props.Renderer" model="model" onImageUpload.bind="onImageUpload" tooltipTemplate="props.archInfo.tooltipTemplate"/>
            </Layout>
        </t>
    `;

    setup() {
        this.orm = useService("orm");
        this.model = useState(
            new this.props.Model(
                this.orm,
                this.props.resModel,
                this.props.fields,
                this.props.archInfo,
            )
        );

        usePager(() => {
            return {
                offset: this.model.pager.offset,
                limit: this.model.pager.limit,
                total: this.model.recordsLength,
                onUpdate: async ({ offset, limit }) => {
                    this.model.pager.offset = offset;
                    this.model.pager.limit = limit;
                    await this.model.load(this.props.domain);
                },
            };
        });

        onWillStart(async () => {
            await this.model.load(this.props.domain);
        });

        onWillUpdateProps(async (nextProps) => {
            if (JSON.stringify(nextProps.domain) !== JSON.stringify(this.props.domain)) {
                await this.model.load(nextProps.domain);
            }
        });
    }
    static props = {
        ...standardViewProps,
        archInfo: Object,
        Model: Function,
        Renderer: Function,
    };

    async onImageUpload(record_id, image_binary) {
        this.model.uploadImage(record_id, image_binary, this.props.domain);
    }
}