from flask import Blueprint, make_response, request
from http import HTTPStatus
from mysql import connector
from utils import db, execute, GetUser, GetToken
import json

skills = Blueprint("skills", __name__)

@skills.route("/", methods=["GET", "POST"])
def index():
    return make_response("Skills")

@skills.route("/Create", methods=["POST"])
def SkillAdd():
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
    SKILL = data["skill"]

    try:
        USN = -1
        sql = "SELECT USN FROM STUDENTS WHERE STUDENTS=%(STUDENT)s;"
        val = {"STUDENT": User}
        cursor = execute(sql, val)
        for u in cursor:
            USN = u[0]
        if(USN == -1):
            return make_response({"Student not found"}, -1)
        
        sql = "INSERT INTO STUDENT_SKILLS(STUDENT, SKILLS) VALUES(, %(SKILL)s);"
        val = {"STUDENT": USN, "SKILL": SKILL}
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

@skills.route("/ReadAll", methods=["GET"])
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
        sql = "SELECT * FROM STUDENT_SKILLS;"
        cursor = execute(sql)
        for c in cursor:
            skills.append({"ID": c[0], "STUDENT": c[1], "SKILL": c[2]})
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

@skills.route("/Update", methods=["POST"])
def SkillUpdate():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    STUDENT = GetUser(TOKEN)
    
    data = json.loads(request.data)
    ID = data["id"]
    NEWSKILL = data["newskill"]
    
    try:
        sql = "UPDATE STUDENT_SKILLS SET SKILL=%(NEWSKILL)s WHERE ID=%(ID)s AND STUDENT=(SELECT USN FROM STUDENTS WHERE ID=%(STUDENT)s));"
        val = { "NEWSKILL": NEWSKILL, "ID": ID, "STUDENT": STUDENT }
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

@skills.route("/Remove", methods=["POST"])
def SkillRemove():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    STUDENT = GetUser(TOKEN)

    data = json.loads(request.data)
    ID = data["id"]

    try:
        sql = "DELETE FROM STUDENT_SKILLS WHERE ID=%(ID)s AND STUDENT=(SELECT USN FROM STUDENTS WHERE ID=%(STUDENT)s);"
        val = {"ID": ID, "STUDENT": STUDENT}
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