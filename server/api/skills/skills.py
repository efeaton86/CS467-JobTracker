"""
exposes an api that allows CRUD operations for a user's skills
"""
import time

from flask import Blueprint, request
from flask_restx import Namespace, Resource, fields
from marshmallow.exceptions import ValidationError

from .models import SkillSchema
from api import mongo

skills_blueprint = Blueprint('skills_blueprint', __name__)
skill_api = Namespace('skills', description="Operations related to a user's skills")

# specifies the expected structure of data in the skill_api
skill_model = skill_api.model('Skill', {
    'user_id': fields.String(readOnly=True, description='User ID'),
    'skill': fields.String(required=True, description='Skill'),
    'proficiency': fields.String(required=True, description='Proficiency'),
    'companies': fields.String(description='Companies')
})


@skill_api.route('/')
class SkillsResource(Resource):
    @skill_api.marshal_with(skill_model)
    def get(self):
        """return all skills - returning the time as a placeholder"""
        return {"hello": time.time()}

    @skill_api.expect(skill_model, validate=True)
    def post(self):
        """create a skill"""

        # get JWT token and process to extract user's id
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        data = request.get_json()
        # validate data
        try:
            skill_data = SkillSchema().load(data)
        except ValidationError as e:
            return {'message': 'Validation error', 'errors': e.messages}

        # create skill
        skill_data['user_id']=user_id
        insert_id = mongo.db['skills'].insert_one(skill_data).inserted_id
        user_skill = mongo.db['skills'].find_one({"id": insert_id})
        return SkillSchema().dump(user_skill), 201

        # get created skill


        # return new skill


@skill_api.route('/<string:id>')
class SkillResource(Resource):
    def get(self, id):
        """fetch a specific skill by id."""

    def put(self, id):
        """update a skill"""

    def delete(self, id):
        """delete a skill"""

