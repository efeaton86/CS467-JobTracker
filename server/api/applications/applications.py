"""
API that allows CRUD operations for a user's job applications
"""
import time

from flask import Blueprint, request, make_response
from flask_restx import Namespace, Resource, fields
from marshmallow.exceptions import ValidationError

from .models import ApplicationSchema
from api import mongo

applications_blueprint = Blueprint('applications_blueprint', __name__)
application_api = Namespace('applications', description="Operations related to a user's job applications")

# specifies the expected structure of data in the job_api
application_model = application_api.model('Application', {
    'company': fields.String(description='The company name', required=True),
    'position': fields.String(description='The job position', required=True),
    'skills': fields.String(description='Skills required for the job'),
    'status': fields.String(description='The current status of the job process', required=True, enum=[
        "Prospect", "Applied", "Phone Screen", "Online Assessment", "Interview: Phone", "Interview: Virtual",
        "Interview: In-office", "Negotiating Offer", "Rejection", "Closed", "Offer"
    ]),
    'date_applied': fields.String(description='The date the job was applied'),
    # 'user_id': fields.String(description='The ID of the user associated with the job', required=True)
})


@application_api.route('/')
class ApplicationsResource(Resource):
    @application_api.marshal_with(application_model)
    def get(self):
        """Return all job applications - returning the time as a placeholder"""
        # TODO: refactor once auth logic is implemented
        # authorization_header = request.headers.get('Authorization')
        # user_jwt = authorization_header.split("Bearer ")[1]
        # user_id = user_jwt
        # mongo.db['applications'].find({"user_id": user_id}).sort('date_applied', -1)

        return {"hello": time.time()}


    @application_api.expect(application_model, validate=False )
    def post(self):
        # user_jwt = authorization_header.split("Bearer ")[1]
        # user_id = user_jwt  # Ensure the token is extracted properly
        
        data = request.get_json()
        try:
            application_data = ApplicationSchema().load(data)
        except ValidationError as e:
            return {'message': 'Validation error', 'errors': e.messages}
       
        result = mongo.db['applications'].insert_one(application_data)
        return ApplicationSchema().dump(result), 201
        # application['user_id'] = user_id
        # try:
        #     authorization_header = request.headers.get('Authorization')
        #     if authorization_header:
        #         user_jwt = authorization_header.split("Bearer ")[1]
        #         user_id = user_jwt  # Ensure the token is extracted properly

        #         application_data = request.get_json()
        #         application = ApplicationSchema().load(application_data)
        #         application['user_id'] = user_id

        #         result = mongo.db['applications'].insert_one(application)
        #         return ApplicationSchema().dump(result), 201
        #     else:
        #         return "No Authorization Header Provided", 401  # Unauthorized
        # except ValidationError as e:
        #     return f"Validation Error: {str(e)}", 400  # Bad Request
        # except Exception as e:
        #     return f"Internal Server Error: {str(e)}", 500  # Internal Server Error

        # TODO: refactor once auth logic is implemented
        # authorization_header = request.headers.get('Authorization')
        # user_jwt = authorization_header.split("Bearer ")[1]
        # user_id = user_jwt  # get_user_id_from_token(user_jwt)

        # application_data = request.get_json()
        # application = ApplicationSchema().load(application_data)
        # application['user_id'] = user_id
        # result = mongo.db['applications'].insert_one(application)
        


@application_api.route('/<string:id>')
class ApplicationsResource(Resource):
    @application_api.expect(application_model, validate=True)
    @application_api.marshal_with(application_model)
    def put(self, id):
        """update a job application's information"""
        # TODO: refactor once auth logic is implemented
        # authorization_header = request.headers.get('Authorization')
        # user_jwt = authorization_header.split("Bearer ")[1]
        # user_id = user_jwt

        # TODO: Filter by Status
        

        # TODO: get data to update
        application_data = request.get_json()
        application_data_to_update = {"$set": application_data}

        update_result = mongo.db['applications'].update_one({'application_id': id}, application_data_to_update)
        if update_result['matched_count'] == 0:
            application_api.abort(404, f'Job Application ID {id} not found. Cannot update.')
        else:
            return jsonify({'message': 'Job application successfully updated'})

        return mongo.db['applications'].find_one({"user_id": user_id, "application_id": id})


    def delete(self, id):
        """Delete a job applicatiokn"""
        # TODO: refactor once auth logic is implemented
        # authorization_header = request.headers.get('Authorization')
        # user_jwt = authorization_header.split("Bearer ")[1]
        # user_id = user_jwt

        application_data = request.get_json()
        application = ApplicationSchema().load(application_data)
        delete_result = mongo.db['applications'].delete_one({'application_id': id}, {'$set': application})
       
        if delete_result['matched_count'] == 0:
            application_api.abort(404, f'Job Application ID {id} not found. Cannot delete it.')

        return make_response("", 204)
