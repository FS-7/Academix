from flask import Blueprint, make_response, request, session
from utils import CODES, db, GetUser, GetToken, execute, deletePrevSessions, createSession
from hashlib import sha256
import json

user = Blueprint("user", __name__)

@user.route("/", methods=["GET", "POST"])
def index():
    return make_response("User")

@user.route("/Register", methods=["POST"])
def Register():
    data = json.loads(request.data)
    NAME = data["name"]
    EMAIL = str.lower(data["email"])
    PHONE = data["phone"]
    PASSWORD = data["password"]
    PASS_HASH = sha256(PASSWORD.encode('utf-8')).hexdigest()
    
    try:
        res = CODES.FAILED
        sql = "INSERT INTO USERS(NAME, EMAIL, PHONE, PASS_HASH) VALUES (%(NAME)s, %(EMAIL)s, %(PHONE)s, %(PASS_HASH)s);"
        val = { "NAME": NAME, "EMAIL": EMAIL, "PHONE": PHONE, "PASS_HASH": PASS_HASH }
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            db.close()
            res = make_response({"status": 200})
    except:
        res = CODES.SQL_ERROR
        print()
        
    return make_response(str(res))

@user.route("/Login", methods=["GET", "POST"])
def Login():
    data = json.loads(request.data)
    EMAIL = str.lower(data["email"])
    PASSWORD = data["password"]
    PASS_HASH = sha256(PASSWORD.encode('utf-8')).hexdigest()

    id=0
    try:
        res = CODES.FAILED
        sql = "SELECT ID FROM USERS WHERE EMAIL=%(EMAIL)s AND PASS_HASH=%(PASS_HASH)s;"
        val = { "EMAIL": EMAIL, "PASS_HASH": PASS_HASH }
        cursor = execute(sql, val)
        cursor = cursor.fetchall()

        for x in cursor:
            id = x[0]
        db.commit()
        
        if(id != 0): 
            temp = deletePrevSessions(id)
            if(temp == CODES.SUCCESS):
                [res, TOKEN]=createSession(id)
                if(res == CODES.SUCCESS):
                    db.close()
                    res = make_response({"status": 200})
                    res.set_cookie("TOKEN", TOKEN)
                    return res
        
    except:
        res = CODES.SQL_ERROR
        print()

    return make_response(str(res))

@user.route("/Logout", methods=["POST"])
def Logout():
    TOKEN=GetToken()
    if(TOKEN == ''):
        return make_response(str(CODES.UNAUTHORIZED))

    try:
        res = CODES.FAILED
        User = GetUser(TOKEN)
        if(User == -1):
            return make_response(str(CODES.FAILED))
        
        sql = "DELETE FROM SESSION WHERE USER=%(ID)s;"
        val = { "ID": User }
        execute(sql, val)
        db.commit()
        db.close()
        res = make_response({"status": 200})
        res.set_cookie("TOKEN", "")
        return res
        
    except ValueError:
        res = CODES.SQL_ERROR
        print()

    return make_response(str(res))

@user.route("/Profile", methods=["GET"])
def Profile():
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(str(CODES.UNAUTHORIZED))
    
    User = GetUser(TOKEN)
    if(User == -1):
            return make_response(str(CODES.FAILED))

    try:
        res = CODES.FAILED
        sql = "SELECT NAME, EMAIL, PHONE FROM USERS WHERE ID=%(USER)s;"
        val = { "USER": User }
        cursor = execute(sql, val)
        for x in cursor:
            profile = x
        res = { "status": 200, "name": profile[0], "email": profile[1], "phone": profile[2] }
        db.commit()
        db.close()
        return make_response(res)
    except:
        res = CODES.SQL_ERROR
        print()

    return make_response(str(res))

@user.route("/Update", methods=["POST"])
def UpdateProfile():
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(str(CODES.UNAUTHORIZED))
    
    data = json.loads(request.data)

    NAME = data["name"]
    EMAIL = data["email"]
    PHONE = data["phone"]
    
    try:
        res = CODES.FAILED
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
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()

    return make_response(str(res))

@user.route("/UpdatePassword", methods=["POST"])
def UpdatePassword():
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(str(CODES.UNAUTHORIZED))
    
    data = json.loads(request.data)

    oldPassword = data["oldpassword"]
    newPassword = data["newpassword"]
    oldPassHash = sha256(oldPassword.encode('utf-8')).hexdigest()
    newPassHash = sha256(newPassword.encode('utf-8')).hexdigest()

    try:
        res = CODES.FAILED
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
                res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))