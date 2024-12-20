from flask import Blueprint, make_response, request
from http import HTTPStatus
from mysql import connector
import json
from utils import db, GetToken, GetUser, execute

project = Blueprint("project", __name__)

@project.route("/", methods=["GET", "POST"])
def index():
    return make_response("project")

@project.route("/getAnC", methods=["GET"])
def getAnC():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)

    try:
        res = {}
        sql = "SELECT EMAIL FROM USERS WHERE ID=%(USER)s;"
        val = {"USER": User}
        cursor = execute(sql, val)
        for c in cursor:
            EMAIL = c[0]

        sql = "SELECT * FROM PROJECT WHERE TEAMLEAD=%(EMAIL)s;"
        val = {"EMAIL": EMAIL}
        cursor = execute(sql, val)
        for c in cursor:
            res = {"APPROVER": c[0], "COORDINATOR": c[1]}
        db.commit()
        resBody = res
        resStatus = HTTPStatus.OK
    
    except connector.ProgrammingError as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except connector.Error as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except Exception as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)

    return make_response(resBody, resStatus)

def Register():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)
    data = json.loads(request.data)
    NAME = data["name"]
    TEAMLEAD = data["teamlead"]
    MEMBER1 = data["member1"]
    MEMBER2 = data["member2"]
    MEMBER3 = data["member3"]
    APPROVER = data["approver"]
    COORDINATOR = data["coordinator"]

    try:
        sql = "INSERT INTO PROJECT(NAME, TEAMLEAD, MEMBER1, MEMBER2, MEMBER3, APPROVER, COORDINATOR) VALUES(%(NAME)s, %(TEAMLEAD)s, %(MEMBER1)s, %(MEMBER2)s, %(MEMBER3)s, %(APPROVER)s, %(COORDINATOR)s);"
        val = {"NAME": NAME, "TEAMLEAD": TEAMLEAD, "MEMBER1": MEMBER1, "MEMBER2": MEMBER2, "MEMBER3": MEMBER3, "APPROVER": APPROVER, "COORDINATOR": COORDINATOR}
        cursor = execute(sql, val)
    
    except connector.ProgrammingError as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except connector.Error as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except Exception as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)

    return make_response(resBody, resStatus)

@project.route("/UpdatePhaseI", methods=["GET", "POST"])
def UpdatePhaseI():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)
    data = json.loads(request.data)

    try:
        sql = "UPDATE PROJECT SET APPROVER_STATUS=%()s WHERE APPROVER=%()s;"
        val = {}
        cursor = execute(sql, val)
    
    except connector.ProgrammingError as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except connector.Error as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except Exception as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)

    return make_response(resBody, resStatus)

@project.route("/UpdatePhaseII", methods=["GET", "POST"])
def UpdatePhaseII():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)
    data = json.loads(request.data)

    try:
        sql = "UPDATE PROJECT SET APPROVER_STATUS=%()s WHERE APPROVER=%()s;"
        val = {}
        cursor = execute(sql, val)
    
    except connector.ProgrammingError as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except connector.Error as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except Exception as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)

    return make_response(resBody, resStatus)


@project.route("/ShowProject", methods=["GET", "POST"])
def ShowProgress():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)
    data = json.loads(request.data)

    try:
        sql = "UPDATE PROJECT SET APPROVER_STATUS=%()s WHERE APPROVER=%()s;"
        val = {}
        cursor = execute(sql, val)
    
    except connector.ProgrammingError as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except connector.Error as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except Exception as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)

    return make_response(resBody, resStatus)

@project.route("Accept", methods=["POST"])
def Accept():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)
    data = json.loads(request.data)

    try:
        sql = "UPDATE PROJECT SET APPROVER_STATUS=%()s WHERE APPROVER=%()s;"
        val = {}
        cursor = execute(sql, val)
    
    except connector.ProgrammingError as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except connector.Error as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except Exception as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)

    return make_response(resBody, resStatus)

@project.route("Deny", methods=["POST"])
def Deny():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)
    data = json.loads(request.data)

    try:
        sql = "UPDATE PROJECT SET APPROVER_STATUS=%()s WHERE APPROVER=%()s;"
        val = {}
        cursor = execute(sql, val)
    
    except connector.ProgrammingError as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except connector.Error as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except Exception as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)

    return make_response(resBody, resStatus)

