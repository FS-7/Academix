from flask import request, session
import secrets
from enum import Enum
import mysql.connector

class CODES(Enum):
    SUCCESS = 200
    FAILED = -1
    SQL_ERROR = "SQL ERROR"
    UNAUTHORIZED = 401
    FORBIDDEN = 403
    NOT_FOUND = 404	
    METHOD_NOT_FOUND = 405


db = mysql.connector.connect(
    host="localhost",
    user="Academix_Admin",
    password="",
    database="academix"
)

def execute(sql, val={}):
    db.connect()
    cursor = db.cursor(buffered=True)
    cursor.execute(sql, val)
    return cursor

def deletePrevSessions(id):
    try:
        sql = "DELETE FROM SESSION WHERE USER=%(ID)s;"
        val = {"ID": id}
        cursor = db.cursor()
        cursor.execute(sql, val, multi=True)
        db.commit()
        db.close()
        return CODES.SUCCESS
    
    except:
        print()
    return CODES.FAILED

def createSession(id):
    TOKEN = createToken()
    try:
        sql = "INSERT INTO SESSION(USER, TOKEN) VALUES(%(ID)s, %(TOKEN)s);"
        val = {"ID": id, "TOKEN": TOKEN}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            db.close()
            return (CODES.SUCCESS, TOKEN)
        return (CODES.FAILED, '')
    
    except:
        print()
    return (CODES.FAILED, '')

def createToken():
    token_length = 25
    return str(secrets.token_urlsafe(token_length)[:32])

def GetToken():
    TOKEN=request.cookies.get("TOKEN")
    return TOKEN

def GetUser(TOKEN):
    id = -1
    sql = "SELECT USERS.ID FROM USERS, SESSION WHERE TOKEN=%(TOKEN)s;"
    val = { "TOKEN": TOKEN }
    cursor = execute(sql, val)
    for x in cursor:
        id = x[0]
    db.close()
    return id