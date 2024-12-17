from flask import Blueprint, make_response, request
from utils import CODES, db, execute, GetUser, GetToken

roles = Blueprint("roles", __name__)

@roles.route('/', methods=["GET", "POST"])
def index():
    return make_response("Roles")

@roles.route('/Create', methods=["POST"])
def Create():
    NAME=request.form["name"]
    
    res = CODES.FAILED
    try:
        sql = "INSERT INTO ROLES(NAME) VALUES(%(NAME)s);"
        val = { "NAME": NAME }
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@roles.route('/Read', methods=["GET"])
def Read():
    ID = request.GET["id"]
    
    res = CODES.FAILED
    try:
        sql = "SELECT * FROM ROLES WHERE ID=%(ID)s;"
        val = { "ID": ID }
        cursor = execute(sql, val)
        for c in cursor:
            res = c[0]
        db.commit()
        return make_response(res)
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@roles.route('/ReadAll', methods=["GET"])
def ReadAll():
    res = []
    try:
        sql = "SELECT * FROM ROLES;"
        cursor = execute(sql)
        db.commit()
        for c in cursor:
            res.append({"ID": c[0], "NAME": c[1]})
        return make_response(res)
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@roles.route('/Update', methods=["POST"])
def Update():
    ID = request.form["id"]
    NEWID = request.form["newid"]
    NEWNAME = request.form["name"]
    
    res = CODES.FAILED
    try:
        sql = "UPDATE ROLES SET ID=%(NEWID)s, NAME=%(NEWNAME)s WHERE ID=%(ID)s;"
        val = { "NEWID": NEWID, "NEWNAME":NEWNAME, "ID": ID }
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@roles.route('/Delete', methods=["POST"])
def Delete():
    ID = request.form["id"]

    res = CODES.FAILED
    try:
        sql = "DELETE FROM ROLES WHERE ID=%(ID)s;"
        val = { "ID": ID }
        execute(sql, val)
        db.commit()
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@roles.route('/CreateRequest', methods=["POST"])
def CreateRequest():
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(str(CODES.UNAUTHORIZED))
    
    User = GetUser(TOKEN)
    ROLE = request.form["role"]
    APPROVER = request.form["approver"]

    res = CODES.FAILED
    try:
        sql = "SELECT ID FROM USER WHERE EMAIL=%(EMAIL)s"
        val = { "EMAIL": APPROVER }
        cursor = execute(sql, val)
        for x in cursor:
            APPROVER_ID = x[0]

        sql = "INSERT INTO AUTHORIZATION(USER, ROLE, APPROVER) VALUES (%(USER)s, %(ROLE)s, %(APPROVER)s)"
        val = { "USER": User, "ROLE": ROLE, "APPROVER": APPROVER_ID}
        cursor = execute(sql, val)
        if(cursor.rowcount):
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@roles.route('/GetMyRequest', methods=["GET"])
def GetMyRequest():
    
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(str(CODES.UNAUTHORIZED))
    
    User = GetUser(TOKEN)

    res = []
    try:
        sql = "SELECT USER, ROLE, STATUS FROM AUTHORIZATION WHERE APPROVER=%(USER)s"
        val = { "USER": User }
        cursor = db.cursor()
        cursor.execute(sql, val)
        for r in cursor:
            res.append({"USER": r[0], "ROLE": r[1], "APPROVER": r[2]})
        return make_response(res)
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@roles.route('/GetRequest', methods=["GET"])
def GetRequest():
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(str(CODES.UNAUTHORIZED))
    
    User = GetUser(TOKEN)

    res = []
    try:
        sql = "SELECT APPROVER, ROLE, STATUS FROM AUTHORIZATION WHERE USER=%(USER)s"
        val = { "USER": User }
        cursor = db.cursor()
        cursor.execute(sql, val)
        for r in cursor:
            res.append({"APPROVER": r[0], "ROLE": r[1], "STATUS": r[2]})
        return make_response(res)
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@roles.route('/RemoveRequest', methods=["POST"])
def RemoveRequest():
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(CODES.UNAUTHORIZED)
    
    User = GetUser(TOKEN)
    ID = request.form["id"]

    res = []
    try:
        sql = "DELETE FROM AUTHORIZATION WHERE ID=%(ID)s AND USER=%(USER)s;"
        val = { "ID": ID, "USER": User }
        cursor = db.cursor()
        cursor.execute(sql, val)
        db.commit()
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@roles.route('/Approve', methods=["POST"])
def Approve():
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(CODES.UNAUTHORIZED)
    
    ID = request.form["id"]
    User = GetUser(TOKEN)
    
    res = CODES.FAILED
    try:
        sql = "SELECT APPROVER FROM AUTHORIZATION WHERE ID=%(ID)s"
        val = { "ID": ID }
        cursor = execute(sql, val)
        for x in cursor:
            APPROVER = x[0]
        
        if(APPROVER == User):
            sql = "UPDATE AUTHORIZATION SET STATUS='A' WHERE ID=%(ID)s"
            cursor = execute(sql, val)
            if(cursor.rowcount == 1):
                db.commit()
                res = CODES.SUCCESS

    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@roles.route('/Deny', methods=["POST"])
def Deny():
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(CODES.UNAUTHORIZED)
    
    ID = request.form["id"]
    User = GetUser(TOKEN)
    
    res = CODES.FAILED
    try:
        sql = "SELECT APPROVER FROM AUTHORIZATION WHERE ID=%(ID)s"
        val = { "ID": ID }
        cursor = execute(sql, val)
        for x in cursor:
            APPROVER = x[0]
        
        if(APPROVER == User):
            sql = "UPDATE AUTHORIZATION SET STATUS='D' WHERE ID=%(ID)s"
            cursor = execute(sql, val)
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    
    return make_response(str(res))