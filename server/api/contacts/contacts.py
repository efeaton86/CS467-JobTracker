"""
exposes an api that allows CRUD operations for a user's contacts
"""

import time

from flask import Blueprint
from api import mongo

contacts_blueprint = Blueprint('contacts_blueprint', __name__)


@contacts_blueprint.route('/time')
def get_time():
    return {"hello": time.time()}


def get_contact():
    pass


def get_contacts():
    pass


def create_contact():
    pass


def delete_contact():
    pass


def update_contact():
    pass
