"""
application factory function that creates the app
"""
import os

from flask import Flask
from flask_pymongo import PyMongo
from flask_restx import Api

from config import ProductionConfig, DevelopmentConfig, TestConfig

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

    ###############################################################
    # TODO: See below
    # running with React front end making call to api is picking up this test config in some cases and i'm not sure why
    # need to investigate
    # this needs to be added when running tests until fixed
    ###############################################################

    # elif os.environ['FLASK_ENV'] == 'test':
    #     app.config.from_object(TestConfig)
    else:
        # Development - read environment variables from .env
        app.config.from_object(DevelopmentConfig)

    # initialize db and api
    mongo.init_app(app, uri=app.config['MONGO_URI'])
    api.init_app(app)

    # register apis
    from api.contacts.contacts import contact_api
    api.add_namespace(contact_api, path='/api/contacts')

    return app
