import os

def test_development_config(test_app):
    """confirm configuration settings load correctly"""
    assert test_app.config['SECRET_KEY'] == 'secret-key-123'


def test_mongodb_connection(test_database):
    """check if the connection is successful"""
    assert test_database.server_info()


def test_database_collections(test_database):
    """check that database returns correct collections"""
    collections = test_database.jobtrekker.list_collection_names()
    assert collections == ['contacts', 'users']


