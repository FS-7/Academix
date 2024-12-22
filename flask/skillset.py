from flask import Blueprint, make_response, request
from http import HTTPStatus
from mysql import connector
from utils import db, GetToken, GetUser, execute
import json

skillset = Blueprint("skillset", __name__)

@skillset.route("/", methods=["GET", "POST"])
def index():
    return make_response("SkillSet")

@skillset.route("/Add", methods=["POST"])
def SkillSetAdd():
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
        sql = "INSERT INTO SKILLSET(NAME) VALUES(%(NAME)s);"
        val = {"NAME": NAME}
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

@skillset.route("/ReadAll", methods=["GET"])
def SkillSetReadAll():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    skillset = []
    try:
        sql = "SELECT * FROM SKILLSET;"
        cursor = execute(sql)
        for c in cursor:
            skillset.append({"ID": c[0], "NAME": c[1]})
        db.commit()
        db.close()
        resBody = skillset
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

@skillset.route("/Update", methods=["POST"])
def SkillSetUpdate():
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
    NEWNAME = data["newname"]
    
    try:
        sql = "UPDATE SKILLSET SET NAME=%(NEWNAME)s WHERE ID=%(ID)s;"
        val = {"ID": ID, "NEWNAME": NEWNAME}
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

@skillset.route("/Remove", methods=["POST"])
def SkillSetRemove():
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
        sql = "DELETE * FROM SKILLSET WHERE ID=%(ID)s);"
        val = {"ID": ID}
        execute(sql, val)
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

@skillset.route("/skill/Add", methods=["POST"])
def SkillAdd():
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
    LINK = data["link"]
    SKILLSET = data["skillset"]

    try:
        sql = "INSERT INTO SKILLS(NAME, LINK, SKILLSET) VALUES(%(NAME)s, %(LINK)s, %(SKILLSET)s);"
        val = {"NAME": NAME, "LINK": LINK,"SKILLSET": SKILLSET}
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

@skillset.route("/skill/ReadAll", methods=["GET"])
def SkillReadAll():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    skills = []
    try:
        sql = "SELECT S.ID, S.NAME AS NAME, SS.ID AS SID, SS.NAME AS SKILLSET FROM SKILLS AS S, SKILLSET AS SS WHERE S.SKILLSET=SS.ID;"
        cursor = execute(sql)
        for c in cursor.fetchall():
            skills.append({"ID": c[0], "NAME": c[1], "SKILLSET": c[2], "SID": c[3]})
        db.commit()
        db.close()
        resBody = skills
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

@skillset.route("/skill/Update", methods=["POST"])
def SkillUpdate():
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
    NEWLINK = data["newlink"]
    NEWNAME = data["newname"]
    NEWSKILLSET = data["newskillset"]

    try:
        sql = "UPDATE SKILLS SET NAME=%(NEWNAME)s, SKILLSET=%(NEWSKILLSET)s WHERE ID=%(ID)s);"
        val = {"ID": ID, "NEWLINK": NEWLINK, "NEWNAME": NEWNAME, "NEWSKILLSET": NEWSKILLSET}
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

@skillset.route("/skill/Remove", methods=["POST"])
def SkillRemove():
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
        sql = "DELETE * FROM SKILLS WHERE ID=%(ID)s);"
        val = {"ID": ID}
        execute(sql, val)
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