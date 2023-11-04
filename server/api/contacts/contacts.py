"""
exposes an api that allows CRUD operations for a user's contacts
"""

from flask import request, make_response
from flask_restx import Namespace, Resource, fields
from marshmallow.exceptions import ValidationError
from bson import ObjectId
from bson.errors import InvalidId


from .models import ContactSchema
from api import mongo

contact_api = Namespace('contacts', description="Operations related to a user's contacts")

# specifies the expected structure of data in the contact_api
contact_model = contact_api.model('Contact', {
    '_id': fields.String(dump_only=True, description='Object ID'),
    'user_id': fields.String(description='User ID'),
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
        """return all of a user's contacts"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt
        user_contacts = []
        for contact in mongo.db.contacts.find({"user_id": user_id}):
            user_contacts.append(contact)
        return ContactSchema().dump(user_contacts, many=True), 200

    @contact_api.expect(contact_model, validate=True)
    def post(self):
        """create a contact"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        # TODO: if user not authenitcated abort
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
    @contact_api.response(404, 'Contact not found.')
    @contact_api.response(200, 'Success')
    def get(self, id):
        """get a user's contact by contact id."""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        try:
            user_contact = mongo.db['contacts'].find_one({"_id": ObjectId(id)})
        except InvalidId:
            return contact_api.abort(422, f'The provided id, {id}, is not a valid ObjectId, '
                                          f'it must be a 12-byte input or a 24-character hex string')

        if not user_contact:
            return contact_api.abort(404, f'Contact with id {id} was not found.')
        return user_contact, 200

    @contact_api.marshal_with(contact_model)
    def put(self, id):
        """update a user's contact by contact id"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        filter_by = {"_id": ObjectId(id)}
        data = request.get_json()
        data.pop('_id')
        data_to_update = {"$set": data}

        update_result = mongo.db['contacts'].update_one(filter_by, data_to_update)
        if update_result.matched_count == 0:
            contact_api.abort(404, f'Unable to find a contact with id {id} and update it.')
        elif update_result.matched_count == 1 and update_result.modified_count == 0:
            contact_api.abort(404, f'Contact with id {id} was found but unable to update it.')
        else:
            return mongo.db['contacts'].find_one({"_id": ObjectId(id)}), 200


    def delete(self, id):
        """delete a contact"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        delete_result = mongo.db['contacts'].delete_one({"_id": ObjectId(id)})
        if delete_result['deleted_count'] == 0:
            contact_api.abort(404, f'Unable to find a contact with id {id} and delete it.')
        return make_response("", 200)
