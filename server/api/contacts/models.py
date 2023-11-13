"""
this module contains the schema of a Contact and is used for serialization/deserialization
"""
from marshmallow import Schema, fields


class ContactSchema(Schema):
    _id = fields.String(attribute="_id")
    user_id = fields.String()
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    mobile_phone = fields.String()
    work_phone = fields.String()
    email = fields.String()
    linkedin = fields.String()
    employer = fields.String()
