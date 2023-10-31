"""
Flask configuration settings
"""
import os

from dotenv import load_dotenv

load_dotenv()


class BaseConfig:
    TESTING = False


class TestConfig(BaseConfig):
    TESTING = True
    SECRET_KEY = "secret-key-123"
    MONGO_URI = 'mongodb://api-mongodb:27017/jobtrekker'


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    SECRET_KEY = os.getenv('SECRET_KEY')

    DBUSER = os.getenv('MONGO_USERNAME')
    DBPASS = os.getenv('MONGO_PASSWORD')
    DBNAME = os.getenv('MONGO_DBNAME')

    # MongoDB connection string for local development
    MONGO_URI = f'mongodb+srv://{DBUSER}:{DBPASS}@cluster0.uwxwhy5.mongodb.net/{DBNAME}?retryWrites=true&w=majority'


class ProductionConfig(BaseConfig):
    SECRET_KEY = os.getenv('APPSETTING_SECRET_KEY')

    # Configure allowed host names that can be served and trusted origins for Azure Container Apps.
    ALLOWED_HOSTS = ['.azurecontainerapps.io'] if os.getenv('RUNNING_IN_PRODUCTION') else []
    CSRF_TRUSTED_ORIGINS = ['https://*.azurecontainerapps.io'] if os.getenv('RUNNING_IN_PRODUCTION') else []
    DEBUG = False

    # azure web app service prefixes environment variables with APPSETTING*
    MONGODB_HOST = os.getenv('APPSETTING_MONGODB_HOST')
    MONGODB_CLUSTER_NAME = os.getenv('APPSETTING_MONGODB_CLUSTER_NAME')
    MONGODB_PORT = os.getenv('APPSETTING_MONGODB_PORT')
    MONGODB_PASSWORD = os.getenv('APPSETTING_MONGODB_PASSWORD')

    # Configure database connection for Azure Cosmos MongoDB.
    MONGO_URI = \
        (f'mongodb://{MONGODB_CLUSTER_NAME}:{MONGODB_PASSWORD}@{MONGODB_HOST}:{MONGODB_PORT}/?ssl=true&replicaSet'
         f'=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@jobtrekker-db@')
