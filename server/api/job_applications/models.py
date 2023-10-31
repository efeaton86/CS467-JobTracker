"""
Job schema used for serialization/deserialization
"""
from marshmallow import Schema, fields, validate

class JobApplicationSchema(Schema):
    id = fields.String(dump_only=True)
    company = fields.String(required=True, validate=validate.Length(min=1, max=255))
    position = fields.String(required=True, validate=validate.Length(min=1, max=255))
    skills = fields.String() #TODO: modify with skills object
    status = fields.String(required=True, validate=validate.OneOf([
        "Prospect", "Applied", "Phone Screen", "Online Assessment",
        "Interview: Phone", "Interview: Virtual", "Interview: In-office",
        "Negotiating Offer", "Rejection", "Closed", "Offer"
    ]))
    date_applied = fields.String(validate=validate.Length(max=255))
    user_id = fields.String(required=False)
