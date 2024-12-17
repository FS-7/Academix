from flask import Blueprint, make_response, request
from utils import CODES, db, execute, GetUser, GetToken

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
    SKILL = request.form["skill"]

    res = CODES.FAILED
    try:
        sql = "INSERT INTO STUDENT_SKILLS(STUDENT, SKILL) VALUES(%(STUDENT)s, %(SKILL)s);"
        val = {"STUDENT": User, "SKILL": SKILL}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skills.route("/Read", methods=["GET"])
def SkillRead():
    ID = request.GET["id"]

    res = CODES.FAILED
    try:
        sql = "SELECT * FROM STUDENT_SKILLS WHERE ID=%(ID)s);"
        val = {"ID": ID}
        cursor = execute(sql, val)
        for c in cursor:
            res = {"ID": c[0], "STUDENT": c[1], "SKILL": c[2]}
        db.commit()
        return make_response(res)
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
        return make_response(res)
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skills.route("/Update", methods=["POST"])
def SkillUpdate():
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(str(CODES.UNAUTHORIZED))
    
    STUDENT = GetUser(TOKEN)
    ID = request.form["id"]
    NEWID = request.form["newid"]
    NEWSKILL = request.form["newskill"]
    

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
    ID = request.form["id"]
    res = CODES.FAILED
    try:
        sql = "DELETE FROM STUDENT_SKILLS WHERE ID=%(ID)s AND STUDENT=(SELECT USN FROM STUDENTS WHERE ID=%(STUDENT)s);"
        val = {"ID": ID, "STUDENT": STUDENT}
        execute(sql, val)
        db.commit()
        res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))