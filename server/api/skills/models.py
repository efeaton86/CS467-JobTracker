"""
this module contains the schema of a Skill and is used for serialization/deserialization
"""
from marshmallow import Schema, fields


class SkillSchema(Schema):
    id = fields.String(dump_only=True)
    skill = fields.String(required=True)
    proficiency = fields.String(required=True)
    companies = fields.String(required=True)
