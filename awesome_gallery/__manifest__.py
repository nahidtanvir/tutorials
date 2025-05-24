# -*- coding: utf-8 -*-
{
    'name': "Gallery View",
    'summary': """
        Starting module for "Master the Odoo web framework, chapter 3: Create a Gallery View"
    """,

    'description': """
        Starting module for "Master the Odoo web framework, chapter 3: Create a Gallery View"
    """,

    'version': '0.1',
    'application': True,
    'category': 'Tutorials/AwesomeGallery',
    'installable': True,
    'depends': ['web', 'contacts'],
    'assets': {
        'web.assets_backend': [
            'awesome_gallery/static/src/**/*',
        ],
    },
    'data': [
        'views/views.xml',
    ],
    'license': 'AGPL-3'
}
