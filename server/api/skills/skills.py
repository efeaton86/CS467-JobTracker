"""
exposes an api that allows CRUD operations for a user's skills
"""

from flask import Blueprint, request, make_response
from flask_restx import Namespace, Resource, fields
from marshmallow.exceptions import ValidationError
from bson import ObjectId
from bson.errors import InvalidId

from .models import SkillSchema
from api import mongo

skill_api = Namespace('skills', description="Operations related to a user's skills")

# specifies the expected structure of data in the skill_api
skill_model = skill_api.model('Skill', {
    '_id': fields.String(dump_only=True, description='Object ID'),
    'user_id': fields.String(readOnly=True, description='User ID'),
    'skill_name': fields.String(required=True, description='Skill'),
    'proficiency': fields.String(required=True, description='Proficiency'),
    'companies': fields.String(description='Companies')
})


@skill_api.route('/')
class SkillsResource(Resource):
    @skill_api.marshal_with(skill_model)
    def get(self):
        """return all skills"""
        # TODO: refactor once auth logic is implemented
        # authorization_header = request.headers.get('Authorization')
        # user_jwt = authorization_header.split("Bearer ")[1]
        # user_id = user_jwt
        user_skills = []
        for skill in mongo.db.skills.find({"user_id": "123"}): # user_id
            user_skills.append(skill)
        return SkillSchema().dump(user_skills, many=True), 200

    @skill_api.expect(skill_model, validate=True)
    def post(self):
        """create a skill"""
        # TODO: refactor once auth logic is implemented
        #authorization_header = request.headers.get('Authorization')
        #user_jwt = authorization_header.split("Bearer ")[1]
        #user_id = user_jwt  # get_user_id_from_token(user_jwt)
        user_id = '123'

        data = request.get_json()
        # validate data
        try:
            skill_data = SkillSchema().load(data)
        except ValidationError as e:
            return {'message': 'Validation error', 'errors': e.messages}

        # TODO: validate if skill already exists
        skill_data['user_id'] = user_id
        insert_id = mongo.db['skills'].insert_one(skill_data).inserted_id
        print(insert_id)
        user_skill = mongo.db['skills'].find_one({"_id": insert_id})
        return SkillSchema().dump(user_skill), 201


@skill_api.route('/<string:id>')
class SkillResource(Resource):
    @skill_api.marshal_with(skill_model)
    def get(self, id):
        """get a user's skill by skill id."""
        # TODO: refactor once auth logic is implemented
        # authorization_header = request.headers.get('Authorization')
        # user_jwt = authorization_header.split("Bearer ")[1]
        # user_id = user_jwt
        # user_id = '123'

        try:
            user_skill = mongo.db['skills'].find_one({"_id": ObjectId(id)})
        except InvalidId:
            return skill_api.abort(422, f'The provided id, {id}, is not a valid ObjectId, '
                                          f'it must be a 12-byte input or a 24-character hex string')

        if not user_skill:
            return skill_api.abort(404, f'skill with id {id} was not found.')
        return user_skill, 200


    @skill_api.expect(skill_model, validate=True)
    @skill_api.marshal_with(skill_model)
    def put(self, id):
        """update a user's skill by skill id"""
        # TODO: refactor once auth logic is implemented
        # authorization_header = request.headers.get('Authorization')
        # user_jwt = authorization_header.split("Bearer ")[1]
        # user_id = user_jwt
        # user_id = '123'

        filter_by = {"_id": ObjectId(id)}
        data = request.get_json()

        # Exclude '_id' from the update operation
        data_to_update = {"$set": {key: value for key, value in data.items() if key != '_id'}}

        update_result = mongo.db['skills'].update_one(filter_by, data_to_update)

        if update_result.matched_count == 0:
            skill_api.abort(404, f'Unable to find a skill with id {id} and update it.')
        elif update_result.matched_count == 1 and update_result.modified_count == 0:
            skill_api.abort(404, f'skill with id {id} was found but unable to update it.')
        else:
            return mongo.db['skills'].find_one({"_id": ObjectId(id)}), 200



    
    def delete(self, id):
        """delete a skill"""
        # TODO: refactor once auth logic is implemented
        # authorization_header = request.headers.get('Authorization')
        # user_jwt = authorization_header.split("Bearer ")[1]
        # user_id = user_jwt
        # user_id = '123'

        delete_result = mongo.db['skills'].delete_one({"_id": ObjectId(id)})
        if delete_result.deleted_count == 0:
            skill_api.abort(404, f'Unable to find a skill with id {id} and delete it.')
        return make_response("", 200)