
from api.contacts.models import ContactSchema
def test_add_contact():
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

