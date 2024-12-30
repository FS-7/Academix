from flask import Blueprint, make_response, request, session
from http import HTTPStatus
from mysql import connector
from utils import db, execute, validateEmail, validatePhone, validatePassword, deletePrevSessions, createSession, GetUser, GetToken
from hashlib import sha256
import json

user = Blueprint("user", __name__)

@user.route("/", methods=["GET", "POST"])
def index():
    return make_response("User")

@user.route("/Register", methods=["POST"])
def Register():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    data = json.loads(request.data)
    NAME = data["name"]
    EMAIL = str.lower(data["email"])
    if(not validateEmail(EMAIL)):
        resStatus = HTTPStatus.BAD_REQUEST
        return make_response(resBody, resStatus)
    
    PHONE = data["phone"]
    if(not validatePhone(PHONE)):
        resStatus = HTTPStatus.BAD_REQUEST
        return make_response(resBody, resStatus)
    
    PASSWORD = data["password"]
    if(not validatePassword(PASSWORD)):
        resStatus = HTTPStatus.BAD_REQUEST
        return make_response(resBody, resStatus)
    
    PASS_HASH = sha256(PASSWORD.encode('utf-8')).hexdigest()
    
    try:
        sql = "INSERT INTO USERS(NAME, EMAIL, PHONE, PASS_HASH) VALUES (%(NAME)s, %(EMAIL)s, %(PHONE)s, %(PASS_HASH)s);"
        val = { "NAME": NAME, "EMAIL": EMAIL, "PHONE": PHONE, "PASS_HASH": PASS_HASH }
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            db.close()
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

@user.route("/Login", methods=["POST"])
def Login():
    id=0
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR

    data = json.loads(request.data)

    EMAIL = str.lower(data["email"])
    if(not validateEmail(EMAIL)):
        resStatus = HTTPStatus.BAD_REQUEST
        return make_response(resBody, resStatus)
    
    PASSWORD = data["password"]
    if(not validatePassword):
        resStatus = HTTPStatus.BAD_REQUEST
        return make_response(resBody, resStatus)
    
    PASS_HASH = sha256(PASSWORD.encode('utf-8')).hexdigest()

    try:
        sql = "SELECT ID FROM USERS WHERE EMAIL=%(EMAIL)s AND PASS_HASH=%(PASS_HASH)s;"
        val = { "EMAIL": EMAIL, "PASS_HASH": PASS_HASH }
        cursor = execute(sql, val)
        cursor = cursor.fetchall()

        for x in cursor:
            id = x[0]
        db.commit()
        
        if(id != 0): 
            temp = deletePrevSessions(id)
            if(temp):
                [res, TOKEN]=createSession(id)
                if(res):
                    db.close()
                    session["TOKEN"] = TOKEN
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

@user.route("/Logout", methods=["POST"])
def Logout():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR

    TOKEN=GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        return make_response({}, HTTPStatus.UNAUTHORIZED)
    
    try:
        sql = "DELETE FROM SESSION WHERE USER=%(ID)s;"
        val = { "ID": User }
        execute(sql, val)
        db.commit()
        db.close()
        session.pop("TOKEN")
        resBody = {}
        resStatus = HTTPStatus.OK
                
    except connector.ProgrammingError as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except connector.Error as mysql_error:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(mysql_error)
    except Exception as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)

    return make_response(resBody, resStatus)

@user.route("/Profile", methods=["GET"])
def Profile():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    try:
        sql = "SELECT NAME, EMAIL, PHONE FROM USERS WHERE ID=%(USER)s;"
        val = { "USER": User }
        cursor = execute(sql, val)
        for x in cursor:
            profile = x
        db.commit()
        db.close()
        resBody = { "name": profile[0], "email": profile[1], "phone": profile[2] }
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

@user.route("/Update", methods=["POST"])
def UpdateProfile():
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
    EMAIL = data["email"]
    if(not validateEmail(EMAIL)):
        resStatus = HTTPStatus.BAD_REQUEST
        return make_response(resBody, resStatus)
    
    PHONE = data["phone"]
    if(not validatePhone(PHONE)):
        resStatus = HTTPStatus.BAD_REQUEST
        return make_response(resBody, resStatus)
    
    try:
        sql = "SELECT USERS.ID FROM SESSION, USERS WHERE TOKEN=%(TOKEN)s;"
        val = { "TOKEN": TOKEN }
        cursor = execute(sql, val)

        for x in cursor:
            id = x[0]
        
        sql = "UPDATE USERS SET NAME=%(NAME)s, EMAIL=%(EMAIL)s, PHONE=%(PHONE)s WHERE ID=%(ID)s;"
        val = { "NAME": NAME, "EMAIL": EMAIL, "PHONE": PHONE, "ID": id}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
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

@user.route("/UpdatePassword", methods=["POST"])
def UpdatePassword():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    oldPassword = data["oldpassword"]
    if(validatePassword(oldPassword)):
        resStatus = HTTPStatus.BAD_REQUEST
        return make_response(resBody, resStatus)
    
    newPassword = data["newpassword"]
    if(validatePassword(newPassword)):
        resStatus = HTTPStatus.BAD_REQUEST
        return make_response(resBody, resStatus)
    
    oldPassHash = sha256(oldPassword.encode('utf-8')).hexdigest()
    newPassHash = sha256(newPassword.encode('utf-8')).hexdigest()

    try:
        sql = "SELECT USERS.ID, PASS_HASH FROM SESSION, USERS WHERE TOKEN=%(TOKEN)s;"
        val = { "TOKEN": TOKEN }
        cursor = execute(sql, val)
        for x in cursor:
            id = x[0]
            pass_hash = x[1]

        if(pass_hash == oldPassHash):
            sql = "UPDATE USERS SET PASS_HASH=%(NEW_PASS)s WHERE ID=%(ID)s;"
            val = { "NEW_PASS": newPassHash, "ID": id}
            cursor = execute(sql, val)
            if(cursor.rowcount == 1):
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

@user.route("/RegisterAsStudent", methods=["POST"])
def RegisterAsStudent():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    USN = data["usn"]
    STUDENT = data["student"]
    DEPARTMENT = data["department"]
    BATCH = data["batch"]
    User = GetUser(TOKEN)

    try:
        sql = "INSERT INTO STUDENT(USN, STUDENT, DEPARTMENT, BATCH, APPROVER) VALUES(%(USN)s, %(STUDENT)s, %(DEPARTMENT)s, %(BATCH)s, %(APPROVER)s);"
        val = { "USN": USN, "STUDENT": STUDENT, "DEPARTMENT": DEPARTMENT, "BATCH": BATCH, "APPROVER": User }
        cursor = execute(sql, val)
        for x in cursor:
            pass
    
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

