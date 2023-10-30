"""
configuration for test suite
"""

import pytest
from pymongo import MongoClient


import config
from ..api import create_app



@pytest.fixture(scope="module")
def test_app():
    app = create_app()
    app.config.from_object(config.TestConfig)
    with app.app_context():
        yield app


@pytest.fixture(scope='module')
def test_database():
    mongo = MongoClient(config.TestConfig.MONGO_URI)
    # seed database with a few examples
    test_contact = {
        "first_name": "John",
        "last_name": "Doe",
        "mobile_phone": "123-456-7890",
        "work_phone": "987-654-3210",
        "email": "john.doe@example.com",
        "linkedin": "johndoe",
        "employer": "Example Corp"
    }

    test_user = {
        "first_name": "Test",
        "last_name": "User",
        "email": "test.user@gmail.com",
    }

    my_jobtrekker_db = mongo['jobtrekker']
    my_jobtrekker_db.contacts.insert_one(test_contact)
    my_jobtrekker_db.users.insert_one(test_user)
    yield mongo
