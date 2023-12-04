"""
Job Application schema used for serialization/deserialization
"""
from marshmallow import Schema, fields, validate

class ApplicationSchema(Schema):
    _id = fields.String(attribute="_id")
    company = fields.String(required=True, validate=validate.Length(min=1, max=255))
    position = fields.String(required=True, validate=validate.Length(min=1, max=255))
    skills = fields.String() #TODO: modify with skills object
    status = fields.String(required=True, validate=validate.OneOf([
        "Prospect", "Applied", "Phone Screen", "Online Assessment",
        "Interview: Phone", "Interview: Virtual", "Interview: In-office",
        "Negotiating Offer", "Rejection", "Closed", "Offer"
    ]))
    date_applied = fields.String()
