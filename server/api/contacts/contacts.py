

import time

from flask import Blueprint

contacts_blueprint = Blueprint('contacts_blueprint', __name__)


@contacts_blueprint.route('/time')
def get_time():
    return {"hello": time.time()}
