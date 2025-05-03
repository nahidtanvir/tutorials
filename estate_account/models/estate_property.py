from odoo import models

class EstateProperty(models.Model):
    _inherit = 'estate.property'

    def action_property_sold(self):
        return super().action_property_sold()