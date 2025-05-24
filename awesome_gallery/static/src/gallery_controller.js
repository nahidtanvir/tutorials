/** @odoo-module */

import { Component, xml, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import {Layout} from "@web/search/layout";
import { standardViewProps } from "@web/views/standard_view_props";
import { KeepLast } from "@web/core/utils/concurrency"

export class GalleryController extends Component {
    static components = { Layout };
    static template = xml`
        <t t-name="awesome_gallery.GalleryController">
            <Layout display="props.display" className="'o_dashboard h-100'">
                <t t-foreach="images.data" t-as="image" t-key="image.id">
                    <p>
                        id: <t t-esc="image.id"/>
                        bin_size: <t t-esc="image[props.archInfo.imageField]"/>
                    </p>
                </t>
            </Layout>
        </t>
    `;
    static props = {
        ...standardViewProps,
        archInfo: Object,
    };

    loadImages(domain) {
        return this.keepLast.add(
            this.orm.webSearchRead(this.props.resModel, domain, {
                limit: this.props.archInfo.limit,
                specification: {
                    [this.props.archInfo.imageField]: {},
                },
                context: {
                    bin_size: true,
                }
            })
        );
    }

    setup() {
        this.orm = useService("orm");
        this.images = useState({ data: [] });
        this.keepLast = new KeepLast();
        onWillStart(async () => {
            const { records } = await this.loadImages(this.props.domain);
            this.images.data = records;
        });

        onWillUpdateProps(async (nextProps) => {
            if (JSON.stringify(nextProps.domain) !== JSON.stringify(this.props.domain)) {
                const { records } = await this.loadImages(nextProps.domain);
                this.images.data = records;
            }
        });
    }
}