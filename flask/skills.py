from flask import Blueprint, make_response, request
from utils import CODES, db, execute, GetUser, GetToken
import json

skills = Blueprint("skills", __name__)

@skills.route("/", methods=["GET", "POST"])
def index():
    return make_response("Skills")

@skills.route("/Create", methods=["POST"])
def SkillAdd():
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(str(CODES.UNAUTHORIZED))
    
    User = GetUser(TOKEN)
    data = json.loads(request.data)
    SKILL = data["skill"]

    res = CODES.FAILED
    try:
        USN = -1
        sql = "SELECT USN FROM STUDENTS WHERE STUDENTS=%(STUDENT)s;"
        val = {"STUDENT": User}
        cursor = execute(sql, val)
        for u in cursor:
            USN = u[0]
        print(USN)
        if(USN == -1):
            return make_response({CODES.FAILED})
        sql = "INSERT INTO STUDENT_SKILLS(STUDENT, SKILLS) VALUES(, %(SKILL)s);"
        val = {"STUDENT": USN, "SKILL": SKILL}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            db.close()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skills.route("/ReadAll", methods=["GET"])
def SkillReadAll():
    res = []
    try:
        sql = "SELECT * FROM STUDENT_SKILLS;"
        cursor = execute(sql)
        for c in cursor:
            res.append({"ID": c[0], "STUDENT": c[1], "SKILL": c[2]})
        db.commit()
        db.close()
        return make_response(res)
    except NameError:
        res = CODES.SQL_ERROR
        print()
    return make_response(list(res))

@skills.route("/Update", methods=["POST"])
def SkillUpdate():
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(str(CODES.UNAUTHORIZED))
    
    STUDENT = GetUser(TOKEN)
    
    data = json.loads(request.data)
    ID = data["id"]
    NEWID = data["newid"]
    NEWSKILL = data["newskill"]
    
    res = CODES.FAILED
    try:
        sql = "UPDATE STUDENT_SKILLS SET ID=%(NEWID)s, SKILL=%(NEWSKILL)s WHERE ID=%(ID)s AND STUDENT=(SELECT USN FROM STUDENTS WHERE ID=%(STUDENT)s));"
        val = { "NEWID": NEWID, "NEWSKILL": NEWSKILL, "ID": ID, "STUDENT": STUDENT }
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skills.route("/Remove", methods=["POST"])
def SkillRemove():
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(str(CODES.UNAUTHORIZED))
    
    STUDENT = GetUser(TOKEN)

    data = json.loads(request.data)
    ID = data["id"]
    res = CODES.FAILED
    try:
        sql = "DELETE FROM STUDENT_SKILLS WHERE ID=%(ID)s AND STUDENT=(SELECT USN FROM STUDENTS WHERE ID=%(STUDENT)s);"
        val = {"ID": ID, "STUDENT": STUDENT}
        execute(sql, val)
        db.commit()
        db.close()
        res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))