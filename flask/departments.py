from flask import Blueprint, make_response, request
from http import HTTPStatus
from mysql import connector
from utils import db, GetToken, GetUser, execute
import json

departments = Blueprint("departments", __name__)

@departments.route("/", methods=["GET", "POST"])
def index():
    return make_response("Departments")

@departments.route("/Add", methods=["POST"])
def Add():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)
    CODE = data["code"]
    NAME = data["name"]

    try:
        sql = "INSERT INTO DEPARTMENTS(CODE, NAME) VALUES (%(CODE)s, %(NAME)s);"
        val = {"CODE": CODE, "NAME": NAME}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            resBody = {}
            resStatus = HTTPStatus.CREATED
    
    
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

@departments.route("/ReadAll", methods=["GET"])
def ReadAll():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    deptList = []
    try:
        sql = "SELECT * FROM DEPARTMENTS;"
        cursor = execute(sql)
        for c in cursor:
            deptList.append({"CODE": c[0], "NAME": c[1] })
        resBody = deptList
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


@departments.route("/Update", methods=["POST"])
def Update():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    CODE = data["code"]
    NEWNAME = data["newname"]
    try:
        sql = "UPDATE DEPARTMENTS SET NAME=%(NEWNAME)s WHERE CODE=%(CODE)s;"
        val = { "CODE": CODE, "NEWNAME": NEWNAME }
        cursor = execute(sql, val)
        if(cursor.rowcount >= 1):
            db.commit()
            resBody = {}
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


@departments.route("/Remove", methods=["POST"])
def Delete():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    CODE = data["code"]
    print(CODE)
    try:
        sql = "DELETE FROM DEPARTMENTS WHERE CODE=%(CODE)s;"
        val = { "CODE": CODE }
        cursor = execute(sql, val)
        db.commit()
        resBody = {}
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
