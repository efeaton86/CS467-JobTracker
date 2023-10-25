"""
exposes an api that allows CRUD operations for a user's contacts
"""
import time

from flask import Blueprint
from flask_restx import Namespace, Resource, fields

from .models import ContactSchema
from api import mongo

contacts_blueprint = Blueprint('contacts_blueprint', __name__)
contact_api = Namespace('contacts', description="Operations related to a user's contacts")

# specifies the expected structure of data in the contact_api
contact_model = contact_api.model('Contact', {
    'user_id': fields.String(required=True, description='User ID'),
    'first_name': fields.String(required=True, description='First Name'),
    'last_name': fields.String(required=True, description='Last Name'),
    'mobile_phone': fields.String(description='Mobile Phone'),
    'work_phone': fields.String(description='Work Phone'),
    'email': fields.String(description='Email'),
    'linkedin': fields.String(description='LinkedIn Handle'),
    'employer': fields.String(description='Employer'),
})


@contact_api.route('/')
class ContactsResource(Resource):
    def get(self):
        """return all contacts - returning the time as a placeholder"""
        return {"hello": time.time()}

    def post(self):
        """create a contact"""


@contact_api.route('/<string:id>')
class ContactResource(Resource):
    def get(self, id):
        """fetch a specific contact by id."""

    def put(self, id):
        """update a contact"""

    def delete(self, id):
        """delete a contact"""

