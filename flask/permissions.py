from flask import Blueprint, make_response, request
from utils import CODES, db, execute

permissions = Blueprint("permissions", __name__)

@permissions.route("/", methods=["GET", "POST"])
def index():
    return make_response("Permissions")

@permissions.route("/Create", methods=["POST"])
def Create():    
    NAME = request.form["name"]
    DESC = request.form["desc"]
    
    res = CODES.FAILED
    try:
        sql = "INSERT INTO PERMISSIONS(NAME, DESCRIPTION) VALUES(%(NAME)s, %(DESC)s);"
        val = { "NAME": NAME, "DESC": DESC}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS

    except:
        res = CODES.SQL_ERROR
        print()
    
    return make_response(str(res))

@permissions.route("/Read", methods=["GET"])
def Read():
    ID = request.GET["id"]

    res = CODES.FAILED
    try:
        sql = "SELECT * FROM PERMISSIONS WHERE ID=%(ID)s;"
        val = { "ID": ID }
        cursor = execute(sql, val)
        db.commit()
        for c in cursor:
            res = c[0]
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@permissions.route("/ReadAll", methods=["GET"])
def ReadAll():
    res = []
    try:
        sql = "SELECT * FROM PERMISSIONS;"
        cursor = execute(sql)
        db.commit()
        for c in cursor:
            res.append({"ID": c[0], "NAME": c[1]})
        return make_response(res)
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@permissions.route("/Update", methods=["POST"])
def Update():
    ID = request.form["id"]
    NEWID = request.form["newid"]
    NEWNAME = request.form["name"]
    NEWDESC = request.form["newdesc"]
    
    res = CODES.FAILED
    try:
        sql = "UPDATE PERMISSIONS SET ID=%(NEWID)s, NAME=%(NEWNAME)s, DESCRIPTION=%(NEWDESC)s WHERE ID=%(ID)s;"
        val = { "NEWID": NEWID, "NEWNAME":NEWNAME, "NEWDESC": NEWDESC, "ID": ID }
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS

    except:
        res = CODES.SQL_ERROR
        print()

    return make_response(str(res))

@permissions.route("/Delete", methods=["POST"])
def Delete():
    ID = request.form["id"]
    
    res = CODES.FAILED
    try:
        sql = "DELETE FROM PERMISSIONS WHERE ID=%(ID)s;"
        val = { "ID": ID }
        execute(sql, val)
        db.commit()
        res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@permissions.route("/CreateRP", methods=["POST"])
def CreateRP():
    ROLE = request.form["name"]
    DEPT = request.form["desc"]
    PERMISSION = request.form["permission"]
    LEVEL = request.form["level"]

    res = CODES.FAILED
    try:
        sql = "INSERT INTO ROLES_PERMISSIONS(ROLE, DEPARTMENT, PERMISSION, LEVEL) VALUES(%(ROLE)s, %(DEPARTMENT)s, %(PERMISSION)s, %(LEVEL)s);"
        val = { "ROLE": ROLE, "DEPARTMENT": DEPT, "PERMISSION": PERMISSION, "LEVEL": LEVEL}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@permissions.route("/ReadRP", methods=["GET"])
def ReadRP():
    
    ID = request.GET["id"]

    res = CODES.FAILED
    try:
        sql = "SELECT * FROM ROLES_PERMISSIONS WHERE ID=%(ID)s;"
        val = { "ID": ID }
        cursor = execute(sql, val)
        db.commit()
        for c in cursor:
            res = c[0]
        return make_response(res)
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@permissions.route("/ReadAllRP", methods=["GET"])
def ReadAllRP():
    res = []
    try:
        sql = "SELECT * FROM ROLES_PERMISSIONS;"
        cursor = execute(sql)
        db.commit()
        for c in cursor:
            res.append({"ID": c[0], "NAME": c[1]})
        return make_response(str(res))
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@permissions.route("/UpdateRP", methods=["POST"])
def UpdateRP():
    ID = request.form["id"]
    NEWID = request.form["newid"]
    ROLES = request.form["roles"]
    DEPARTMENT = request.form["department"]
    PERMISSION = request.form["permission"]
    LEVEL = request.form["level"]

    res = CODES.FAILED
    try:
        sql = "UPDATE ROLES_PERMISSIONS SET ID=%(NEWID)s, ROLES=%(ROLES)s, DEPARTMENT=%(DEPARTMENT)s, PERMISSION=%(PERMISSION)s, LEVEL=%(LEVEL)s WHERE ID=%(ID)s;"
        val = { "NEWID": NEWID, "ROLES": ROLES, "DEPARTMENT": DEPARTMENT, "PERMISSION": PERMISSION, "LEVEL": LEVEL, "ID": ID }
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()

    return make_response(str(res))

@permissions.route("/DeleteRP", methods=["POST"])
def DeleteRP():
    ID = request.form["id"]
    
    res = CODES.FAILED
    try:
        sql = "DELETE FROM ROLES_PERMISSIONS WHERE ID=%(ID)s;"
        val = { "ID": ID }
        execute(sql, val)
        db.commit()
        res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()

    return make_response(str(res))

