"""
exposes an api that allows CRUD operations for a user's skills
"""
import time

from flask import Blueprint, request, make_response
from flask_restx import Namespace, Resource, fields
from marshmallow.exceptions import ValidationError

from .models import SkillSchema
from api import mongo

skills_blueprint = Blueprint('skills_blueprint', __name__)
skill_api = Namespace('skills', description="Operations related to a user's skills")

# specifies the expected structure of data in the skill_api
skill_model = skill_api.model('Skill', {
    'skill_id': fields.String(readOnly=True, description='User ID'),
    'skill': fields.String(required=True, description='Skill'),
    'proficiency': fields.String(required=True, description='Proficiency'),
    'companies': fields.String(description='Companies')
})


@skill_api.route('/')
class SkillsResource(Resource):
    @skill_api.marshal_with(skill_model)
    def get(self):
        """return all skills - returning the time as a placeholder"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt
        skills = mongo.db['skills'].find({"user_id": user_id})

        return skills

    @skill_api.expect(skill_model, validate=True)
    def post(self):
        """create a skill"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt  # get_user_id_from_token(user_jwt)

        data = request.get_json()
        try:
            skill_data = SkillSchema().load(data)
        except ValidationError as e:
            return {'message': 'Validation error', 'errors': e.messages}
        
        # TODO: validate if skill already exists
        skill_data['user_id'] = user_id
        insert_id = mongo.db['skills'].insert_one(skill_data).inserted_id
        user_skill = mongo.db['skills'].find_one({"_id": insert_id})
        return SkillSchema().dump(user_skill), 201


@skill_api.route('/<string:id>')
class SkillResource(Resource):
    @skill_api.marshal_with(skill_model)
    def get(self, id):
        """get a user's skill by skill id."""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        user_skill = mongo.db['skills'].find_one({"user_id": user_id, "skill_id": id})

        if not user_skill:
            return skill_api.abort(404, f'User with id {id} was not found.')
        return user_skill, 200

    @skill_api.expect(skill_model, validate=True)
    @skill_api.marshal_with(skill_model)
    def put(self, id):
        """update a user's skill by skill id"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        filter_by = {"user_id": user_id, "skill_id": id}
        # TODO: get data to update
        data = request.get_json()
        data_to_update = {"$set": data}

        update_result = mongo.db['skills'].update_one(filter_by, data_to_update)
        if update_result['matched_count'] == 0:
            skill_api.abort(404, f'Unable to find a skill with id {id} and update it.')

        return mongo.db['skills'].find_one({"user_id": user_id, "skill_id": id})


    def delete(self, id):
        """delete a skill"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        filter_by = {"user_id": user_id, "skill_id": id}
        # TODO: get data to update
        data = request.get_json()
        data_to_update = {"$set": data}

        delete_result = mongo.db['skills'].delete_one(filter_by, data_to_update)
        if delete_result['matched_count'] == 0:
            skill_api.abort(404, f'Unable to find a skill with id {id} and delete it.')
        return make_response("", 204)