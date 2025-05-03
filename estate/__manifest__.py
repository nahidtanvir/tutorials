{
    'name': 'Estate',
    'depends': ['base'],
    'installable': True,
    'application': True,
    'data': [
        'views/inherited_views.xml',
        'security/ir.model.access.csv',
        'views/estate_property_offer_views.xml',
        'views/estate_property_type_views.xml',
        'views/estate_property_tag_views.xml',
        'views/estate_property_views.xml',
        'views/estate_menus.xml',
    ]
}
