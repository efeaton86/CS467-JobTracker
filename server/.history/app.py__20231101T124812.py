"""
flask server entry point
"""
import os
from dotenv load_dotenv
from api import create_app

load_dotenv()
app = create_app()
app.app_context().push()

if __name__ == '__main__':
    if os.getenv('APPSETTING_RUNNING_IN_PRODUCTION'):
        app.run()
    else:
        print('running in dev')
        app.run(port=5001, debug=False)
