
import requests
import unittest

from flask_pymongo import PyMongo

from api import create_app
from api.contacts.models import ContactSchema


class TestContactAPI(unittest.TestCase):
    def setUp(self):
        app = create_app()

        # Test DB
        app.config['MONGO_URI'] = 'mongodb://api-mongodb:27017/jobtrekker'

        # Initialize PyMongo extension
        self.mongo = PyMongo(app)
        self.app = app.test_client()

        # Seed db
        test_contact = {
            "user_id": "123",
            "first_name": "John",
            "last_name": "Doe",
            "mobile_phone": "123-456-7890",
            "work_phone": "987-654-3210",
            "email": "john.doe@example.com",
            "linkedin": "johndoe",
            "employer": "Example Corp"
        }
        test_contact_1 = {
            "user_id": "123",
            "first_name": "Betty",
            "last_name": "Doe",
            "mobile_phone": "123-666-7890",
            "work_phone": "987-789-3210",
            "email": "betty.doe@example.com",
            "linkedin": "bettydoe",
            "employer": "Example Corp"
        }
        test_contact_2 = {
            "user_id": "456",
            "first_name": "Betty",
            "last_name": "Doe",
            "mobile_phone": "123-666-7890",
            "work_phone": "987-789-3210",
            "email": "betty.doe@example.com",
            "linkedin": "bettydoe",
            "employer": "Example Corp"
        }
        test_user = {
            "first_name": "Test",
            "last_name": "User",
            "email": "test.user@gmail.com",
        }

        test_contacts = [test_contact, test_contact_1, test_contact_2]
        my_jobtrekker_db = self.mongo.db
        for c in test_contacts:
            my_jobtrekker_db.contacts.insert_one(c)
        my_jobtrekker_db.users.insert_one(test_user)


    def tearDown(self):
        # clean up
        pass

    def test_get_all_user_contacts_endpoint(self):
        headers = {
            'Authorization': f'Bearer 123',
            'Content-Type': 'application/json',
        }
        req_resp = requests.get(url='http://localhost:5001/api/contacts/', headers=headers)
        self.assertEqual(req_resp.status_code, 200)
        self.assertNotEqual(len(req_resp.json()), 0)


    def test_get_single_contact(self):
        pass

    def test_get_single_contact_does_not_exist(self):
        pass

    def test_create_contact(self):
        pass

    def test_creat_contact_invalid_json(self):
        pass

    def test_creat_contact_already_exists(self):
        pass


    def test_delete_contact(self):
        pass

    def test_delete_contact_does_not_exist(self):
        pass
