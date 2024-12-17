from flask import Blueprint, make_response, request
from utils import CODES, db, execute
import json

skillset = Blueprint("skillset", __name__)

@skillset.route("/", methods=["GET", "POST"])
def index():
    return make_response("SkillSet")

@skillset.route("/Add", methods=["POST"])
def SkillSetAdd():
    data = json.loads(request.data)
    NAME = data["name"]

    res = CODES.FAILED
    try:
        sql = "INSERT INTO SKILLSET(NAME) VALUES(%(NAME)s);"
        val = {"NAME": NAME}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            db.close()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/ReadAll", methods=["GET"])
def SkillSetReadAll():
    res = []
    try:
        sql = "SELECT * FROM SKILLSET;"
        cursor = execute(sql)
        for c in cursor:
            res.append({"ID": c[0], "NAME": c[1]})
        db.commit()
        db.close()
        return make_response(res)
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/Update", methods=["POST"])
def SkillSetUpdate():
    data = json.loads(request.data)
    ID = data["id"]
    NEWNAME = data["newname"]
    
    res = CODES.FAILED
    try:
        sql = "UPDATE SKILLSET SET NAME=%(NEWNAME)s WHERE ID=%(ID)s;"
        val = {"ID": ID, "NEWNAME": NEWNAME}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            db.close()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/Remove", methods=["POST"])
def SkillSetRemove():
    data = json.loads(request.data)
    ID = data["id"]
    
    res = CODES.FAILED
    try:
        sql = "DELETE * FROM SKILLSET WHERE ID=%(ID)s);"
        val = {"ID": ID}
        execute(sql, val)
        db.commit()
        db.close()
        res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/skill/Add", methods=["POST"])
def SkillAdd():
    data = json.loads(request.data)
    NAME = data["name"]
    SKILLSET = data["skillset"]

    res = CODES.FAILED
    try:
        sql = "INSERT INTO SKILLS(NAME, SKILLSET) VALUES(%(NAME)s, %(SKILLSET)s);"
        val = {"NAME": NAME, "SKILLSET": SKILLSET}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            db.close()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/skill/ReadAll", methods=["GET"])
def SkillReadAll():
    res = []
    try:
        sql = "SELECT * FROM SKILLS;"
        cursor = execute(sql)
        for c in cursor.fetchall():
            res.append({"ID": c[0], "NAME": c[1], "SKILLSET": c[2]})
        db.commit()
        db.close()
        return make_response(res)
    except TypeError:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/skill/Update", methods=["POST"])
def SkillUpdate():
    data = json.loads(request.data)
    ID = data["id"]
    NEWNAME = data["newname"]
    NEWSKILLSET = data["newskillset"]

    res = CODES.FAILED
    try:
        sql = "UPDATE SKILLS SET NAME=%(NEWNAME)s, SKILLSET=%(NEWSKILLSET)s WHERE ID=%(ID)s);"
        val = {"ID": ID, "NEWNAME": NEWNAME, "NEWSKILLSET": NEWSKILLSET}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            db.close()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return res

@skillset.route("/skill/Remove", methods=["POST"])
def SkillRemove():
    data = json.loads(request.data)
    ID = data["id"]
    
    res = CODES.FAILED
    try:
        sql = "DELETE * FROM SKILLS WHERE ID=%(ID)s);"
        val = {"ID": ID}
        execute(sql, val)
        db.commit()
        db.close()
        res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return res