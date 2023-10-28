"""
exposes an api that allows CRUD operations for a user's contacts
"""
import time

from flask import Blueprint, request
from flask_restx import Namespace, Resource, fields
from marshmallow.exceptions import ValidationError

from .models import ContactSchema
from api import mongo

contacts_blueprint = Blueprint('contacts_blueprint', __name__)
contact_api = Namespace('contacts', description="Operations related to a user's contacts")

# specifies the expected structure of data in the contact_api
contact_model = contact_api.model('Contact', {
    'contact_id': fields.String(readOnly=True, description='User ID'),
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
    @contact_api.marshal_with(contact_model)
    def get(self):
        """return all contacts - returning the time as a placeholder"""
        return {"hello": time.time()}

    @contact_api.expect(contact_model, validate=True)
    def post(self):
        """create a contact"""

        # get JWT token and process to extract user's id
        authorization_header = request.headers.get('Authorization')

        data = request.get_json()
        # validate data
        try:
            contact_data = ContactSchema().load(data)
        except ValidationError as e:
            return {'message': 'Validation error', 'errors': e.messages}

        # create contact
        insert_id = mongo.db['contacts'].insert_one(contact_data).inserted_id

        # get created contact

        # return new contact


@contact_api.route('/<string:id>')
class ContactResource(Resource):
    @contact_api.marshal_with(contact_model)
    def get(self, id):
        """get a user's contact by contact id."""
        authorization_header = request.headers.get('Authorization')
        user_id = authorization_header  # get user id from token

        user_contact = mongo.db['contacts'].find_one({"user_id": user_id, "contact_id": id})

        if not user_contact:
            return contact_api.abort(404, f'User with id {id} was not found.')
        return user_contact, 200


    def put(self, id):
        """update a contact"""

    def delete(self, id):
        """delete a contact"""

