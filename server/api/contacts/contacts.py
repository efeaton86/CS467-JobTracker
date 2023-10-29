"""
exposes an api that allows CRUD operations for a user's contacts
"""
import time

from flask import Blueprint, request, make_response
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
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt
        mongo.db['contacts'].find({"user_id": user_id})

        return {"hello": time.time()}

    @contact_api.expect(contact_model, validate=True)
    def post(self):
        """create a contact"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt  # get_user_id_from_token(user_jwt)

        data = request.get_json()
        try:
            contact_data = ContactSchema().load(data)
        except ValidationError as e:
            return {'message': 'Validation error', 'errors': e.messages}
        
        # TODO: validate if contact already exists
        contact_data['user_id'] = user_id
        insert_id = mongo.db['contacts'].insert_one(contact_data).inserted_id
        user_contact = mongo.db['contacts'].find_one({"_id": insert_id})
        return ContactSchema().dump(user_contact), 201


@contact_api.route('/<string:id>')
class ContactResource(Resource):
    @contact_api.marshal_with(contact_model)
    def get(self, id):
        """get a user's contact by contact id."""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        user_contact = mongo.db['contacts'].find_one({"user_id": user_id, "contact_id": id})

        if not user_contact:
            return contact_api.abort(404, f'User with id {id} was not found.')
        return user_contact, 200

    @contact_api.expect(contact_model, validate=True)
    @contact_api.marshal_with(contact_model)
    def put(self, id):
        """update a user's contact by contact id"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        filter_by = {"user_id": user_id, "contact_id": id}
        # TODO: get data to update
        data = request.get_json()
        data_to_update = {"$set": data}

        update_result = mongo.db['contacts'].update_one(filter_by, data_to_update)
        if update_result['matched_count'] == 0:
            contact_api.abort(404, f'Unable to find a contact with id {id} and update it.')

        return mongo.db['contacts'].find_one({"user_id": user_id, "contact_id": id})


    def delete(self, id):
        """delete a contact"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        filter_by = {"user_id": user_id, "contact_id": id}
        # TODO: get data to update
        data = request.get_json()
        data_to_update = {"$set": data}

        delete_result = mongo.db['contacts'].delete_one(filter_by, data_to_update)
        if delete_result['matched_count'] == 0:
            contact_api.abort(404, f'Unable to find a contact with id {id} and delete it.')
        return make_response("", 204)
