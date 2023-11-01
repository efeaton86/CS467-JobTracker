
import requests

from api.contacts.models import ContactSchema

import os
import unittest
from flask import Flask
from flask_pymongo import PyMongo
from api import create_app


class TestContactAPI(unittest.TestCase):
    def setUp(self):
        app = create_app()

        # Use a different test database for your tests
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

        test_user = {
            "first_name": "Test",
            "last_name": "User",
            "email": "test.user@gmail.com",
        }

        # my_jobtrekker_db = self.mongo.db['jobtrekker']
        my_jobtrekker_db = self.mongo.db  # ['jobtrekker']
        my_jobtrekker_db.contacts.insert_one(test_contact)
        my_jobtrekker_db.users.insert_one(test_user)


    def tearDown(self):
        # Clean up any test data or perform teardown here
        pass

    def test_get_all_user_contacts_endpoint(self):
        headers = {
            'Authorization': f'Bearer 123',
            'Content-Type': 'application/json',
        }
        response = self.app.get('http://localhost:5001/api/contacts/', headers=headers)
        print(response.data)
        self.assertEqual(response.status_code, 200)
        # Add more assertions based on your test case

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
