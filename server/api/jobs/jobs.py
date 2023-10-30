"""
API that allows CRUD operations for a user's job applications
"""
import time

from flask import Blueprint, request, make_response
from flask_restx import Namespace, Resource, fields
from marshmallow.exceptions import ValidationError

from .models import JobSchema
from api import mongo

jobs_blueprint = Blueprint('jobs_blueprint', __name__)
job_api = Namespace('jobs', description="Operations related to a user's jobs")

# specifies the expected structure of data in the job_api
job_model = job_api.model('Job', {
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

# Authentication Middleware (Require authorization for all job routes)
@app.before_request
def require_auth():
    # Implement your authorization logic here

@contact_api.route('/')
class JobsResource(Resource):
    @job_api.marshal_with(job_api)
    def get(self):
        """return all jobs - returning the time as a placeholder"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt
        mongo.db['jobs'].find({"user_id": user_id}).sort('date_applied', -1)

        return {"hello": time.time()}


    @job_api.expect(job_model, validate=True)
    def post(self):
        """create a job"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt  # get_user_id_from_token(user_jwt)

        job_data = request.get_json
        job = JobSchema().load(job_data)
        job['user_id'] = user_id
        result = mongo.db['jobs'].insert_one(job)
        return JobSchema().dump(result), 201


@job_api.route('/<string:id>')
class JobsResource(Resource):
    @job_api.expect(job_model, validate=True)
    @job_api.marshal_with(job_model)
    def put(self, id):
        """update a job' application's information"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        # TODO: Filter by Status
        filter_by = {"status": user_id}

        # TODO: get data to update
        job_data = request.get_json()
        job_data_to_update = {"$set": job_data}

        update_result = mongo.db['jobs'].update_one({'_id': ObjectId(job_id)}, job_data_to_update)
        if update_result['matched_count'] == 0:
            job_api.abort(404, f'Job ID {id} not found. Cannot update.')
        else:
            return jsonify({'message': 'Job successfully updated'})

        return mongo.db['jobs'].find_one({"user_id": user_id, "job_id": id})


    def delete(self, id):
        """Delete a job"""
        # TODO: refactor once auth logic is implemented
        authorization_header = request.headers.get('Authorization')
        user_jwt = authorization_header.split("Bearer ")[1]
        user_id = user_jwt

        job_data = request.get_json()
        job = JobSchema().load(job_data)
        delete_result = mongo.db['jobs'].delete_one({'_id': ObjectId(job_id)}, {'$set': job})
       
        if delete_result['matched_count'] == 0:
            contact_api.abort(404, f'Job ID {id} not found. Cannot delete it.')
        return make_response("", 204)
