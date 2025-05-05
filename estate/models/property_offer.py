from odoo import models, fields, api
from odoo.exceptions import UserError, ValidationError
from datetime import date, timedelta

class PropertyOffer(models.Model):
    _name = 'estate.property.offer'
    _description = 'Real Estate Property Offer'
    _order = 'price desc'

    price = fields.Float(string="Price")
    status = fields.Selection([
        ('accepted', 'Accepted'),
        ('refused', 'Refused')
    ], string="Status", copy=False)
    partner_id = fields.Many2one('res.partner', string="Partner", required=True)
    property_id = fields.Many2one('estate.property', string="Property", required=True)
    validity = fields.Integer(string="Validity (days)", default=7)
    date_deadline = fields.Date(string="Deadline", compute="_compute_date_deadline", inverse="_inverse_date_deadline")
    property_type_id = fields.Many2one(
        'estate.property.type',
        string="Property Type",
        related="property_id.property_type_id",
        store=True,
        readonly=True,
    )

    _sql_constraints = [
        ('check_price', 'CHECK(price > 0)', 'The price must be strictly positive'),
        ('check_validity', 'CHECK(validity > 0)', 'The validity must be strictly positive'),
    ]

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            property_id = vals.get('property_id')
            new_price = vals.get('price', 0)

            if property_id:
                property = self.env['estate.property'].browse(property_id)

                # Check if new offer is less than any existing offer
                if any(o.price >= new_price for o in property.offer_ids):
                    raise ValidationError("New offer must be higher than existing offers.")

                # Set property state to 'Offer Received'
                property.state = 'offer_received'

        return super().create(vals_list)

    @api.depends("create_date", "validity")
    def _compute_date_deadline(self):
        for offer in self:
            if offer.create_date:
                offer.date_deadline = offer.create_date.date() + timedelta(days=offer.validity)
            else:
                # Fallback for new records that don't have create_date yet
                offer.date_deadline = date.today() + timedelta(days=offer.validity)

    def _inverse_date_deadline(self):
        for offer in self:
            if offer.create_date:
                # Calculate validity based on the difference between deadline and create_date
                delta = offer.date_deadline - offer.create_date.date()
                offer.validity = delta.days
            else:
                # Fallback for new records
                delta = offer.date_deadline - date.today()
                offer.validity = delta.days

    def action_accept(self):
        for record in self:
            if record.property_id.selling_price:
                raise UserError('Property already sold')
            else:
                record.status = 'accepted'
                record.property_id.selling_price = record.price
        return True

    def action_refuse(self):
        for record in self:
            record.status = 'refused'
        return True