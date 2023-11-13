"""
this module contains the schema of a Skill and is used for serialization/deserialization
"""
from marshmallow import Schema, fields


class SkillSchema(Schema):
    _id = fields.String(attribute="_id")
    user_id = fields.String()
    skill_name = fields.String(required=True)
    proficiency = fields.String(required=True)
    companies = fields.String()