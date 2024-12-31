from flask import Blueprint, make_response, request
from http import HTTPStatus
from mysql import connector
from utils import db,  GetUser, GetToken, execute
import json

roles = Blueprint("roles", __name__)

@roles.route('/', methods=["GET", "POST"])
def index():
    return make_response("Roles")

@roles.route('/Create', methods=["POST"])
def Create():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)
    NAME = data["name"]
    
    try:
        sql = "INSERT INTO ROLES(NAME) VALUES(%(NAME)s);"
        val = { "NAME": NAME }
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

@roles.route('/Read', methods=["GET"])
def Read():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)
    ID = data["id"]
    
    try:
        sql = "SELECT * FROM ROLES WHERE ID=%(ID)s;"
        val = { "ID": ID }
        cursor = execute(sql, val)
        for c in cursor:
            role = c[0]
        db.commit()
        resBody = role
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

@roles.route('/ReadAll', methods=["GET"])
def ReadAll():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    roles = []
    try:
        sql = "SELECT * FROM ROLES;"
        cursor = execute(sql)
        db.commit()
        for c in cursor.fetchall():
            roles.append({"ID": c[0], "NAME": c[1]})
        resBody = roles
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

@roles.route('/Update', methods=["POST"])
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
    ID = data["id"]
    NEWNAME = data["name"]
    
    try:
        sql = "UPDATE ROLES SET NAME=%(NEWNAME)s WHERE ID=%(ID)s;"
        val = { "NEWNAME":NEWNAME, "ID": ID }
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
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

@roles.route('/Delete', methods=["POST"])
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
    ID = data["id"]

    try:
        sql = "DELETE FROM ROLES WHERE ID=%(ID)s;"
        val = { "ID": ID }
        execute(sql, val)
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


@roles.route('/MyRoles', methods=["GET"])
def MyRole():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)

    res = []
    try:
        sql = "SELECT ROLE FROM AUTHORIZATION WHERE ID=%(ID)s AND STATUS='APPROVED'"
        val = { "ID": User }
        cursor = execute(sql, val)
        for r in cursor:
            res.append({"ROLE": r[0]})
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

@roles.route('/RemoveMyRole', methods=["POST"])
def RemoveMyRole():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)
    ID = data["id"]
    User = GetUser(TOKEN)

    try:
        sql = "DELETE FROM AUTHORIZATION WHERE ID=%(ID)s AND USER=%(USER)s;"
        val = { "ID": ID, "USER": User }
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


@roles.route('/CreateRequest', methods=["POST"])
def CreateRequest():
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
    ROLES = data["roles"]
    APPROVER = data["approver"]

    try:
        sql = "SELECT ID FROM USER WHERE EMAIL=%(EMAIL)s"
        val = { "EMAIL": APPROVER }
        cursor = execute(sql, val)
        for x in cursor:
            APPROVER_ID = x[0]

        for ROLE in ROLES:
            sql = "INSERT INTO AUTHORIZATION(USER, ROLE, APPROVER) VALUES (%(USER)s, %(ROLE)s, %(APPROVER)s);"
            val = { "USER": User, "ROLE": ROLE, "APPROVER": APPROVER_ID}
            cursor = execute(sql, val)
        if(cursor.rowcount == len(ROLES)):
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

@roles.route('/GetMyRequest', methods=["GET"])
def GetMyRequest():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)

    myreq = []
    try:
        sql = "SELECT USER, ROLE, STATUS FROM AUTHORIZATION WHERE STATUS='P' AND APPROVER=%(USER)s"
        val = { "USER": User }
        cursor = db.cursor()
        cursor.execute(sql, val)
        for r in cursor:
            myreq.append({"USER": r[0], "ROLE": r[1], "APPROVER": r[2]})
        resBody = myreq
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

@roles.route('/GetRequest', methods=["GET"])
def GetRequest():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)

    req = []
    try:
        sql = "SELECT APPROVER, ROLE, STATUS FROM AUTHORIZATION  STATUS='P' WHERE USER=%(USER)s"
        val = { "USER": User }
        cursor = db.cursor()
        cursor.execute(sql, val)
        for r in cursor:
            req.append({"APPROVER": r[0], "ROLE": r[1], "STATUS": r[2]})
        resBody = req
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

@roles.route('/RemoveRequest', methods=["POST"])
def RemoveRequest():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    User = GetUser(TOKEN)
    ID = data["id"]

    try:
        sql = "DELETE FROM AUTHORIZATION WHERE ID=%(ID)s AND USER=%(USER)s;"
        val = { "ID": ID, "USER": User }
        cursor = db.cursor()
        cursor.execute(sql, val)
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

@roles.route('/Approve', methods=["POST"])
def Approve():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)
    
    ID = data["id"]
    User = GetUser(TOKEN)
    
    try:
        sql = "UPDATE AUTHORIZATION SET STATUS='A' WHERE ID=%(ID)s AND APPROVER=(SELECT EMAIL FROM USERS WHERE ID=%(APPROVER)s);"
        val = { "ID": ID, "APPROVER": User }
        cursor = execute(sql, val)
        db.commit()
        db.close()
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

@roles.route('/Deny', methods=["POST"])
def Deny():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    ID = data["id"]
    User = GetUser(TOKEN)
    
    try:
        sql = "UPDATE AUTHORIZATION SET STATUS='D' WHERE ID=%(ID)s AND APPROVER=(SELECT EMAIL FROM USERS WHERE ID=%(APPROVER)s);"
        val = { "ID": ID, "APPROVER": User }
        cursor = execute(sql, val)
        db.commit()
        db.close()
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