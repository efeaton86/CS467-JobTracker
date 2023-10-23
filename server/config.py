"""
Flask configuration settings
"""
import os
import urllib.parse

from dotenv import load_dotenv

load_dotenv()


class BaseConfig:
    TESTING = False


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    SECRET_KEY = os.getenv('SECRET_KEY')

    # Local to instance settings from .env file
    DBNAME = os.getenv('MONGO_CLUSTER_NAME')
    DBUSER = os.getenv('MONGO_USERNAME')
    DBPASS = os.getenv('MONGO_PASSWORD')

    # MongoDB connection string for local development
    MONGODB_DATABASE_URI = \
        f'mongodb+srv://{DBUSER}:{DBPASS}@{DBNAME}.uwxwhy5.mongodb.net/?retryWrites=true&w=majority'


class ProductionConfig(BaseConfig):
    SECRET_KEY = os.getenv('SECRET_KEY')

    # Configure allowed host names that can be served and trusted origins for Azure Container Apps.
    ALLOWED_HOSTS = ['.azurecontainerapps.io'] if os.getenv('RUNNING_IN_PRODUCTION') else []
    CSRF_TRUSTED_ORIGINS = ['https://*.azurecontainerapps.io'] if os.getenv('RUNNING_IN_PRODUCTION') else []
    DEBUG = False

    # azure web app service prefixes environment variables with APPSETTING*
    DBHOST = os.getenv('APPSETTING_POSTGRESQL_HOST')
    DBNAME = os.getenv('APPSETTING_POSTGRESQL_DATABASE')
    DBUSER = os.getenv('APPSETTING_POSTGRESQL_USERNAME')
    DBPASS = os.getenv('APPSETTING_POSTGRESQL_PASSWORD')

    # Configure database connection for Azure PostgreSQL Flexible api instance.
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{dbuser}:{dbpass}@{dbhost}/{dbname}'.format(
        dbuser=DBUSER,
        dbpass=DBPASS,
        dbhost=DBHOST,
        dbname=DBNAME
    )
