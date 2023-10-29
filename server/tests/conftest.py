"""
configuration for test suite
"""

import pytest

from ..api import create_app, mongo



@pytest.fixture(scope="module")
def test_app():
    app = create_app()
    app.config.from_object("server.config.TestConfig")
    with app.app_context():
        yield app
