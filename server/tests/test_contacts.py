
import requests

from api.contacts.models import ContactSchema

def test_get_contact(test_app):
    url = 'http://localhost:5001/api/contacts/'
    headers = {
        'Authorization': f'Bearer 123',
        'Content-Type': 'application/json',
    }

    client = test_app.test_client()
    resp = client.get(
        url,
        headers=headers
    )

    print(resp)
    assert resp is None



def test_post_contact(test_app, test_database):
    client_data = {
        'contact_id': '12345',
        'first_name': 'John',
        'last_name': 'Doe',
        'mobile_phone': '123-456-7890',
        'work_phone': '987-654-3210',
        'email': 'john.doe@example.com',
        'linkedin': 'johndoe',
        'employer': 'Example Corp',
    }

    jwt_token = ''
    api_endpoint = ''

    headers = {
        'Authorization': f'Bearer {jwt_token}',
        'Content-Type': 'application/json',
    }

