"""
application factory function that creates the app
"""
import os

from flask import Flask
from flask_pymongo import PyMongo
from flask_restx import Api

from config import ProductionConfig, DevelopmentConfig

mongo = PyMongo()


def create_app():
    app = Flask(__name__, static_folder=None, template_folder=None)
    api = Api(
        title='Job Trekker API',
        version='1.0',
        description='an api that exposes endpoints for managing job applications, contacts, and user authentication'
    )

    # If RUNNING_IN_PRODUCTION is defined as an environment variable, then we're running on Azure
    if os.getenv('APPSETTING_RUNNING_IN_PRODUCTION'):
        # Production - read environment variables in Azure.
        app.config.from_object(ProductionConfig)
    else:
        # Development - read environment variables from .env
        app.config.from_object(DevelopmentConfig)

    # initialize db and api
    mongo.init_app(app, uri=app.config['MONGO_URI'])
    api.init_app(app)

    # register apis
    from api.contacts.contacts import contact_api
    api.add_namespace(contact_api, path='/api/contacts')

    from api.applications.applications import application_api
    api.add_namespace(application_api, path='/api/applications')

    return app
