/** @odoo-module */

import { Component, xml } from "@odoo/owl";
import {Layout} from "@web/search/layout";
import { standardViewProps } from "@web/views/standard_view_props";

export class GalleryController extends Component {
    static components = { Layout };
    static template = xml`
        <t t-name="awesome_gallery.GalleryController">
            <Layout display="props.display" className="'o_dashboard h-100'">
                <div> Hello world </div>
            </Layout>
        </t>
    `;
    static props = {
        ...standardViewProps,
        archInfo: Object,
    };
}