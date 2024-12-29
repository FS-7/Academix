from flask import Flask, make_response
from flask_cors import CORS
from http import HTTPStatus

from admin import admin
from attendance import attendance
from departments import departments
from permissions import permissions
from project import project
from roles import roles
from skills import skills
from skillset import skillset
from user import user

app = Flask(__name__)
cors = CORS(app, supports_credentials = True)

app.config['SESSION_TYPE'] = 'filesystem'
app.config["SESSION_COOKIE_SAMESITE"] = "Strict"
app.config["SESSION_COOKIE_SECURE"] = True
app.secret_key = '0569728356747ee302a88a9a098df7a14548a45c2cc291a0eb673b5406f9bf85'

#server_session = Session(app)
#cors

app.register_blueprint(admin, url_prefix='/admin')
app.register_blueprint(attendance, url_prefix='/attendance')
app.register_blueprint(departments, url_prefix='/departments')
app.register_blueprint(permissions, url_prefix='/permissions')
app.register_blueprint(project, url_prefix='/project')
app.register_blueprint(roles, url_prefix='/roles')
app.register_blueprint(skills, url_prefix='/skills')
app.register_blueprint(skillset, url_prefix='/skillset')
app.register_blueprint(user, url_prefix='/user')

if __name__ == '__main__':
    app.run(debug=True)

@app.route("/", methods=["GET", "POST"])
def welcome():
    return make_response("Hello World!")

@app.route("/ping", methods=["GET", "POST"])
def ping():
    resBody = {}
    resStatus = HTTPStatus.OK
    return make_response(resBody, resStatus)