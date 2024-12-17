from flask import Blueprint, make_response, request
from utils import CODES, db, execute
import json

departments = Blueprint("departments", __name__)

@departments.route("/", methods=["GET", "POST"])
def index():
    return make_response("Departments", str(CODES.SUCCESS))

@departments.route("/Add", methods=["POST"])
def Add():
    data = json.loads(request.data)
    CODE = data["code"]
    NAME = data["name"]

    res = CODES.FAILED
    try:
        sql = "INSERT INTO DEPARTMENTS(CODE, NAME) VALUES (%(CODE)s, %(NAME)s);"
        val = {"CODE": CODE, "NAME": NAME}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()

    return make_response(str(res))

@departments.route("/Read", methods=["GET"])
def Read():
    CODE = request.GET["code"]
    
    res = CODES.FAILED
    try:
        sql = "SELECT * FROM DEPARTMENTS WHERE CODE=%(CODE)s;"
        val = { "CODE": CODE }
        cursor = execute(sql, val)
        for c in cursor:
            res = {"CODE": c[0], "NAME": c[1] }

    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@departments.route("/ReadAll", methods=["GET"])
def ReadAll():
    res = CODES.FAILED
    deptList = []
    try:
        sql = "SELECT * FROM DEPARTMENTS;"
        cursor = execute(sql)
        for c in cursor:
            deptList.append({"CODE": c[0], "NAME": c[1] })
        res = deptList
        return make_response(res)
        
    except:
        res = CODES.SQL_ERROR
        print()
    
    return make_response(str(res))

@departments.route("/Update", methods=["POST"])
def Update():
    data = json.loads(request.data)
    CODE = data["code"]
    NEWCODE = data["newcode"]
    NEWNAME = data["newname"]

    res = CODES.FAILED
    try:
        sql = "UPDATE DEPARTMENTS SET CODE=%(NEWCODE)s, NAME=%(NEWNAME)s WHERE CODE=%(CODE)s;"
        val = { "CODE": CODE, "NEWCODE": NEWCODE, "NEWNAME": NEWNAME }
        cursor = execute(sql, val)
        if(cursor.rowcount >= 1):
            db.commit()
            res = CODES.SUCCESS

    except:
        res = CODES.SQL_ERROR
        print()

    return make_response(str(res))

@departments.route("/Remove", methods=["POST"])
def Delete():
    data = json.loads(request.data)
    CODE = data["code"]
    
    res = CODES.FAILED
    try:
        sql = "DELETE FROM DEPARTMENTS WHERE CODE=%(CODE)s;"
        val = { "CODE": CODE }
        cursor = execute(sql, val)
        db.commit()
        res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()

    return make_response(str(res))