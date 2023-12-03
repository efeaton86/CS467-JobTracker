"""
API that allows CRUD operations for a user's job applications
"""
import time

from flask import Blueprint, request, make_response,jsonify
from flask_restx import Namespace, Resource, fields
from marshmallow.exceptions import ValidationError
from bson import ObjectId

from .models import ApplicationSchema
from api import mongo

applications_blueprint = Blueprint('applications_blueprint', __name__)
application_api = Namespace('applications', description="Operations related to a user's job applications")

# specifies the expected structure of data in the job_api
application_model = application_api.model('Application', {
    '_id': fields.String(dump_only=True, description='Object ID'),
    'company': fields.String(description='The company name', required=True),
    'position': fields.String(description='The job position', required=True),
    'skills': fields.String(description='Skills required for the job'),
    'status': fields.String(description='The current status of the job process', required=True, enum=[
        "Prospect", "Applied", "Phone Screen", "Online Assessment", "Interview: Phone", "Interview: Virtual",
        "Interview: In-office", "Negotiating Offer", "Rejection", "Closed", "Offer"
    ]),
    'date_applied': fields.Date(description='The date the job was applied'),
    # 'user_id': fields.String(description='The ID of the user associated with the job', required=True)
})


@application_api.route('/')
class ApplicationsResource(Resource):
    @application_api.marshal_with(application_model)
    def get(self):
        """Return all job applications"""
        # TODO: refactor once auth logic is implemented
        # authorization_header = request.headers.get('Authorization')
        # user_jwt = authorization_header.split("Bearer ")[1]
        # user_id = user_jwt

        # Sort applications by most recent entry
        # mongo.db['applications'].find({"user_id": user_id}).sort('date_applied', -1)
        applications_collection = mongo.db.applications  # Replace 'applications' with your actual collection name
        all_applications = list(applications_collection.find({}))  # Retrieve all documents from the collection
        return all_applications, 200
        

    @application_api.expect(application_model, validate=False)
    def post(self):
        
        data = request.get_json()
        try:
            application_data = ApplicationSchema().load(data)
        except ValidationError as e:
            return {'message': 'Validation error', 'errors': e.messages}
       
        insert_id = mongo.db['applications'].insert_one(application_data).inserted_id
        user_application = mongo.db['applications'].find_one({"_id": insert_id})
        
        return ApplicationSchema().dump(user_application), 201

        # TODO: refactor once auth logic is implemented
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

        # TODO: get data to update
        application_data = request.get_json()
        if "_id" in application_data:
            del application_data["_id"]

        application_data_to_update = {"$set": application_data}
        filter_by = {"_id": ObjectId(id)}
        update_result = mongo.db['applications'].update_one(filter_by, application_data_to_update)
        if update_result.matched_count == 0:
            application_api.abort(404, f'Job Application ID {id} not found. Cannot update.')
        else:
            return ({'message': 'Job application successfully updated'})

        return mongo.db['applications'].find_one({"_id": ObjectId(id)}), 200


    def delete(self, id):
        """Delete a job application"""
        # TODO: refactor once auth logic is implemented
        # authorization_header = request.headers.get('Authorization')
        # user_jwt = authorization_header.split("Bearer ")[1]
        # user_id = user_jwt

        delete_result = mongo.db['applications'].delete_one({"_id": ObjectId(
            id)})

        # Check if the document was not found
        if delete_result.deleted_count == 0:
            application_api.abort(404, f'Job Application ID {id} not '
                                       f'found. Cannot delete it.')

        return make_response("", 204)

# Retrieve distinct company names from the 'applications' collection
company_model = application_api.model('Company', {
    'company': fields.String(description='Company name'),
})

@application_api.route('/companies')
class CompaniesResource(Resource):
    @application_api.marshal_with(company_model, as_list=True)
    def get(self):
        """Return a list of company names - used for skills page forms"""
        companies_collection = mongo.db.applications
        distinct_companies = companies_collection.distinct('company')
        return [{'company': company} for company in distinct_companies], 200