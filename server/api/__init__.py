"""
application factory function that creates the app
"""
import os

from flask import Flask
from flask_pymongo import PyMongo

from config import ProductionConfig, DevelopmentConfig


def create_app():
    app = Flask(__name__, static_folder=None, template_folder=None)

    # If RUNNING_IN_PRODUCTION is defined as an environment variable, then we're running on Azure
    if os.getenv('RUNNING_IN_PRODUCTION'):
        # Production, we don't load environment variables from .env file but add them as environment variables in Azure.
        app.config.from_object(ProductionConfig)
    else:
        # Local development, where we'll use environment variables.
        print("Loading config.development and environment variables from .env file.")
        app.config.from_object(DevelopmentConfig)

    # register blueprints
    from api.contacts.contacts import contacts_blueprint
    app.register_blueprint(contacts_blueprint, url_prefix='/api/contacts')


    return app
