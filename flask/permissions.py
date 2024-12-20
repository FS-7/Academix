from flask import Blueprint, make_response, request
from http import HTTPStatus
from mysql import connector
from utils import db, GetToken, GetUser, execute

permissions = Blueprint("permissions", __name__)

@permissions.route("/", methods=["GET", "POST"])
def index():
    return make_response("Permissions")

@permissions.route("/Create", methods=["POST"])
def Create():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    NAME = request.form["name"]
    DESC = request.form["desc"]
    
    try:
        sql = "INSERT INTO PERMISSIONS(NAME, DESCRIPTION) VALUES(%(NAME)s, %(DESC)s);"
        val = { "NAME": NAME, "DESC": DESC}
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

@permissions.route("/Read", methods=["GET"])
def Read():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    ID = request.GET["id"]

    try:
        sql = "SELECT * FROM PERMISSIONS WHERE ID=%(ID)s;"
        val = { "ID": ID }
        cursor = execute(sql, val)
        db.commit()
        for c in cursor:
            permission = c[0]
        resBody = permission
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

@permissions.route("/ReadAll", methods=["GET"])
def ReadAll():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    permissions = []
    try:
        sql = "SELECT * FROM PERMISSIONS;"
        cursor = execute(sql)
        db.commit()
        for c in cursor:
            permissions.append({"ID": c[0], "NAME": c[1]})
        resBody = permissions
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

@permissions.route("/Update", methods=["POST"])
def Update():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    ID = request.form["id"]
    NEWNAME = request.form["name"]
    NEWDESC = request.form["newdesc"]
    
    try:
        sql = "UPDATE PERMISSIONS SET NAME=%(NEWNAME)s, DESCRIPTION=%(NEWDESC)s WHERE ID=%(ID)s;"
        val = { "NEWNAME":NEWNAME, "NEWDESC": NEWDESC, "ID": ID }
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

@permissions.route("/Delete", methods=["POST"])
def Delete():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    ID = request.form["id"]
    
    try:
        sql = "DELETE FROM PERMISSIONS WHERE ID=%(ID)s;"
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

@permissions.route("/CreateRP", methods=["POST"])
def CreateRP():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    ROLE = request.form["name"]
    DEPT = request.form["desc"]
    PERMISSION = request.form["permission"]
    LEVEL = request.form["level"]

    try:
        sql = "INSERT INTO ROLES_PERMISSIONS(ROLE, DEPARTMENT, PERMISSION, LEVEL) VALUES(%(ROLE)s, %(DEPARTMENT)s, %(PERMISSION)s, %(LEVEL)s);"
        val = { "ROLE": ROLE, "DEPARTMENT": DEPT, "PERMISSION": PERMISSION, "LEVEL": LEVEL}
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

@permissions.route("/ReadRP", methods=["GET"])
def ReadRP():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    ID = request.GET["id"]

    try:
        sql = "SELECT * FROM ROLES_PERMISSIONS WHERE ID=%(ID)s;"
        val = { "ID": ID }
        cursor = execute(sql, val)
        db.commit()
        for c in cursor:
            rp = c[0]
        resBody = rp
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR

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

@permissions.route("/ReadAllRP", methods=["GET"])
def ReadAllRP():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    rp = []
    try:
        sql = "SELECT * FROM ROLES_PERMISSIONS;"
        cursor = execute(sql)
        db.commit()
        for c in cursor:
            rp.append({"ID": c[0], "NAME": c[1]})
        resBody = rp
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

@permissions.route("/UpdateRP", methods=["POST"])
def UpdateRP():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    ID = request.form["id"]
    ROLES = request.form["roles"]
    DEPARTMENT = request.form["department"]
    PERMISSION = request.form["permission"]
    LEVEL = request.form["level"]

    try:
        sql = "UPDATE ROLES_PERMISSIONS SET ROLES=%(ROLES)s, DEPARTMENT=%(DEPARTMENT)s, PERMISSION=%(PERMISSION)s, LEVEL=%(LEVEL)s WHERE ID=%(ID)s;"
        val = { "ROLES": ROLES, "DEPARTMENT": DEPARTMENT, "PERMISSION": PERMISSION, "LEVEL": LEVEL, "ID": ID }
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

@permissions.route("/DeleteRP", methods=["POST"])
def DeleteRP():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    ID = request.form["id"]

    try:
        sql = "DELETE FROM ROLES_PERMISSIONS WHERE ID=%(ID)s;"
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

