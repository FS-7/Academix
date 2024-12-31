from flask import session
from mysql import connector
import re
import secrets

db = connector.connect(
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

def validateEmail(email):
    if(email == None):
        return False
    if(len(email) > 32):
        return False
    regex = "^[^@]+@[^@]+\\.[^@]+$"
    if(not re.search(regex, email)):
        return False
    return True

def validatePhone(phone):
    if(phone == None):
        return False
    regex = "^[0-9]{10}$"
    if(not re.search(regex, phone)):
        return False
    return True

def validatePassword(password):
    if(password == None):
        return False
    regex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$"
    if(not re.search(regex, password)):
        return False
    return True

def deletePrevSessions(id):
    res = False
    try:
        sql = "DELETE FROM SESSION WHERE USER=%(ID)s;"
        val = {"ID": id}
        cursor = db.cursor()
        cursor.execute(sql, val, multi=True)
        db.commit()
        db.close()
        res = True
    
    except connector.ProgrammingError as e:
        res = False
        print(e)
    except connector.Error as e:
        res = False
        print(e)
    except Exception as e:
        res = False
        print(e)

    return res

def createSession(id):
    TOKEN = createToken()
    res = False
    try:
        sql = "INSERT INTO SESSION(USER, TOKEN) VALUES(%(ID)s, %(TOKEN)s);"
        val = {"ID": id, "TOKEN": TOKEN}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            db.close()
            res = True
            return (res, TOKEN)
    
    except connector.ProgrammingError as e:
        res = False
        print(e)
    except connector.Error as e:
        res = False
        print(e)
    except Exception as e:
        res = False
        print(e)

    return (res, '')

def createToken():
    token_length = 25
    return str(secrets.token_urlsafe(token_length)[:32])

def GetToken():
    TOKEN=session.get("TOKEN")
    return TOKEN

def GetUser(TOKEN):
    id = -1
    sql = "SELECT USER FROM SESSION WHERE TOKEN=%(TOKEN)s;"
    val = { "TOKEN": TOKEN }
    cursor = execute(sql, val)
    for x in cursor:
        id = x[0]
    db.close()
    return id

def GetUserPermissions(User):
    permissions = []
    sql = "SELECT DISTINCT TEMP.NAME, TEMP.LEVEL FROM `authorization` AS A INNER JOIN (SELECT P.NAME, RP.ROLE, RP.LEVEL FROM `roles_permissions` AS RP INNER JOIN `permissions` AS P ON RP.PERMISSION=P.ID) AS TEMP ON A.ROLE=TEMP.ROLE WHERE USER=%(ID)s AND STATUS='A';"
    val = { "ID": User }
    cursor = execute(sql, val)
    if(cursor.rowcount > 0):
        for x in cursor:
            permissions.append(x[0])
    db.close()
    return permissions
