

def test_development_config(test_app):
    test_app.config.from_object('server.config.TestConfig')
    assert test_app.config['SECRET_KEY'] == "secret-key-123"
