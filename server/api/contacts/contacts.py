"""
exposes an api that allows CRUD operations for a user's contacts
"""

import time

from flask import Blueprint, current_app
from api import mongo

contacts_blueprint = Blueprint('contacts_blueprint', __name__)


@contacts_blueprint.route('/time')
def get_time():
    return {"hello": time.time()}
