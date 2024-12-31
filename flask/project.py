from flask import Blueprint, make_response, request
from http import HTTPStatus
from mysql import connector
import json
from utils import db, GetToken, GetUser, execute

project = Blueprint("project", __name__)

@project.route("/", methods=["GET", "POST"])
def index():
    return make_response("project")

@project.route("/getAnC", methods=["GET"])
def getAnC():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)

    try:
        res = {}
        sql = "SELECT EMAIL FROM USERS WHERE ID=%(USER)s;"
        val = {"USER": User}
        cursor = execute(sql, val)
        for c in cursor:
            EMAIL = c[0]

        sql = "SELECT * FROM PROJECT WHERE TEAMLEAD=%(EMAIL)s;"
        val = {"EMAIL": EMAIL}
        cursor = execute(sql, val)
        for c in cursor:
            res = {"APPROVER": c[0], "COORDINATOR": c[1]}
        db.commit()
        resBody = res
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

@project.route("/register", methods=["POST"])
def Register():
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
    User = GetUser(TOKEN)
    TEAMLEAD = data["teamlead"]
    MEMBER1 = data["member1"]
    MEMBER2 = data["member2"]
    MEMBER3 = data["member3"]
    COORDINATOR = data["coordinator"]

    try:
        sql = "INSERT INTO PROJECT(NAME, MANAGER, TEAMLEAD, MEMBER1, MEMBER2, MEMBER3, COORDINATOR) VALUES(%(NAME)s, %(MANAGER)s, %(TEAMLEAD)s, %(MEMBER1)s, %(MEMBER2)s, %(MEMBER3)s, %(COORDINATOR)s);"
        val = {"NAME": NAME, "MANAGER": User, "TEAMLEAD": TEAMLEAD, "MEMBER1": MEMBER1, "MEMBER2": MEMBER2, "MEMBER3": MEMBER3, "COORDINATOR": COORDINATOR}
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

@project.route("/read", methods=["GET"])
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
    User = GetUser(TOKEN)

    project = []
    try:
        sql = "SELECT * FROM PROJECT"
        val = {"ID": ID, "MANAGER": User }
        cursor = execute(sql, val)
        for c in cursor:
            project.append({"ID": c[0], "NAME": c[1]})
        db.commit()
        db.close()
        resBody = project
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

@project.route("/remove", methods=["POST"])
def Remove():
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
        sql = "DELETE FROM PROJECT WHERE ID=%(ID)s AND MANAGER=%(User)s;"
        val = {"ID": ID, "MANAGER": User }
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

@project.route("/createphase", methods=["POST"])
def CreatePhase():
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

    PROJECT = data["project"]
    PHASE_NAME = data["phasename"]
    DUE_DATE = data["duedate"]

    try:
        sql = "INSERT INTO PROJECT_PHASES(PROJECT, PHASE_NAME, DUE_DATE) VALUES(%(PROJECT)s, %(PHASE_NAME)s, %(DUE_DATE)s)"
        val = { "PROJECT": PROJECT, "PHASE_NAME": PHASE_NAME, "DUE_DATE": DUE_DATE }
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

@project.route("/readphases", methods=["GET"])
def ReadPhases():
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

    PROJECT = data["project"]
    PHASE_NAME = data["phasename"]
    DUE_DATE = data["duedate"]

    try:
        sql = "INSERT INTO PROJECT_PHASES(PROJECT, PHASE_NAME, DUE_DATE) VALUES(%(PROJECT)s, %(PHASE_NAME)s, %(DUE_DATE)s)"
        val = { "PROJECT": PROJECT, "PHASE_NAME": PHASE_NAME, "DUE_DATE": DUE_DATE }
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

@project.route("/removephase", methods=["POST"])
def RemovePhase():
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

    ID = data["id"]

    try:
        sql = "DELETE FROM PROJECT_PHASES WHERE ID=%(ID)s AND MANAGER=%(MANAGER)s;"
        val = { "ID": ID, "MANAGER": User }
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

@project.route("/submitphase", methods=["POST"])
def SubmitPhase():
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

    ID = data["id"]
    FILES = data["files"]

    try:
        sql = "UPDATE PROJECT_PHASES SET STATUS=TRUE, FILES=%(FILES)s WHERE ID=%(ID)s;"
        val = { "ID": ID, "FILES": FILES }
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

@project.route("/approvephase", methods=["POST"])
def ApprovePhase():
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

    ID = data["id"]

    try:
        sql = "UPDATE PROJECT_PHASES SET COORDINATOR_STATUS=TRUE WHERE ID=%(ID)s;"
        val = { "ID": ID }
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

@project.route("/denyphase", methods=["POST"])
def DenyPhase():
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

    ID = data["id"]

    try:
        sql = "UPDATE PROJECT_PHASES SET COORDINATOR_STATUS=FALSE WHERE ID=%(ID)s;"
        val = { "ID": ID }
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

@project.route("/status", methods=["GET"])
def Status():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)

    projects = []
    try:
        sql = "SELECT * FROM PROJECT"
        val = {}
        cursor = execute(sql, val)
        for c in cursor:
            projects.append({"ID": c[0], "NAME": c[1], "GUIDE": c[2], "TEAMLEAD": c[3], "MEMBER1": c[4], "MEMBER2": c[5], "MEMBER3": c[6], "COORDINATOR": c[7]})

        resBody = projects
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

@project.route("/ShowProject", methods=["POST"])
def ShowProject():
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

    try:
        sql = ""
        val = {}
        cursor = execute(sql, val)
    
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
