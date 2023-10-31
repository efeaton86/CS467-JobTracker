"""
API that allows CRUD operations for a user's job applications
"""
import time

from flask import Blueprint, request, make_response
from flask_restx import Namespace, Resource, fields
from marshmallow.exceptions import ValidationError

from .models import JobApplicationSchema
from api import mongo

job_applications_blueprint = Blueprint('job_applications_blueprint', __name__)
job_application_api = Namespace('job_applications', description="Operations related to a user's job applications")

# specifies the expected structure of data in the job_api
job_application_model = job_application_api.model('JobApplication', {
    'company': fields.String(description='The company name', required=True),
    'position': fields.String(description='The job position', required=True),
    'skills': fields.String(description='Skills required for the job'),
    'status': fields.String(description='The current status of the job process', required=True, enum=[
        "Prospect", "Applied", "Phone Screen", "Online Assessment", "Interview: Phone", "Interview: Virtual",
        "Interview: In-office", "Negotiating Offer", "Rejection", "Closed", "Offer"
    ]),
    'date_applied': fields.String(description='The date the job was applied'),
    'user_id': fields.String(description='The ID of the user associated with the job', required=True)
})


@job_application_api.route('/')
class JobApplicationsResource(Resource):
    @job_application_api.marshal_with(job_application_model)
    def get(self):
        """Return all job applications - returning the time as a placeholder"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt
        mongo.db['job_applications'].find({"user_id": user_id}).sort('date_applied', -1)

        return {"hello": time.time()}


    @job_application_api.expect(job_application_model, validate=True)
    def post(self):
        """Create a job application"""
        try:
            authorization_header = request.headers.get('Authorization')
            if authorization_header:
                user_jwt = authorization_header.split("Bearer ")[1]
                user_id = user_jwt  # Ensure the token is extracted properly

                job_application_data = request.get_json()
                job_application = JobApplicationSchema().load(job_application_data)
                job_application['user_id'] = user_id

                result = mongo.db['job_applications'].insert_one(job_application)
                return JobApplicationSchema().dump(result), 201
            else:
                return "No Authorization Header Provided", 401  # Unauthorized
        except ValidationError as e:
            return f"Validation Error: {str(e)}", 400  # Bad Request
        except Exception as e:
            return f"Internal Server Error: {str(e)}", 500  # Internal Server Error

        # TODO: refactor once auth logic is implemented
        # authorization_header = request.headers.get('Authorization')
        # user_jwt = authorization_header.split("Bearer ")[1]
        # user_id = user_jwt  # get_user_id_from_token(user_jwt)

        # job_application_data = request.get_json()
        # job_application = JobApplicationSchema().load(job_application_data)
        # job_application['user_id'] = user_id
        # result = mongo.db['job_applications'].insert_one(job_application)
        # return JobApplicationSchema().dump(result), 201


@job_application_api.route('/<string:id>')
class JobApplicationsResource(Resource):
    @job_application_api.expect(job_application_model, validate=True)
    @job_application_api.marshal_with(job_application_model)
    def put(self, id):
        """update a job application's information"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        # TODO: Filter by Status
        

        # TODO: get data to update
        job_application_data = request.get_json()
        job_application_data_to_update = {"$set": job_application_data}

        update_result = mongo.db['job_applications'].update_one({'job_application_id': id}, job_application_data_to_update)
        if update_result['matched_count'] == 0:
            job_application_api.abort(404, f'Job Application ID {id} not found. Cannot update.')
        else:
            return jsonify({'message': 'Job application successfully updated'})

        return mongo.db['job_applications'].find_one({"user_id": user_id, "job_application_id": id})


    def delete(self, id):
        """Delete a job applicatiokn"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        job_application_data = request.get_json()
        job_application = JobApplicationSchema().load(job_application_data)
        delete_result = mongo.db['job_applications'].delete_one({'job_application_id': id}, {'$set': job_application})
       
        if delete_result['matched_count'] == 0:
            job_application_api.abort(404, f'Job Application ID {id} not found. Cannot delete it.')

        return make_response("", 204)
