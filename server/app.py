"""
flask server entry point
"""
import os

from api import create_app

app = create_app()
app.app_context().push()

if __name__ == '__main__':
    if os.getenv('APPSETTING_RUNNING_IN_PRODUCTION'):
        app.run()
    else:
        print('running in dev')
        app.run(port=5001, debug=True)
