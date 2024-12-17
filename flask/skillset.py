from flask import Blueprint, make_response, request
from utils import CODES, db, execute

skillset = Blueprint("skillset", __name__)

@skillset.route("/", methods=["GET", "POST"])
def index():
    return make_response("SkillSet")

@skillset.route("/Add", methods=["POST"])
def SkillSetAdd():
    NAME = request.form["name"]

    res = CODES.FAILED
    try:
        sql = "INSERT INTO SKILLSET(NAME) VALUES(%(NAME)s);"
        val = {"NAME": NAME}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/Read", methods=["GET"])
def SkillSetRead():
    ID = request.GET["id"]

    res = CODES.FAILED
    try:
        sql = "SELECT * FROM SKILLSET WHERE ID=%(ID)s);"
        val = {"ID": ID}
        cursor = execute(sql, val)
        for c in cursor:
            res = {"ID": c[0], "NAME": c[1]}
        db.commit()
        return make_response(res)
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
        return make_response(res)
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/Update", methods=["POST"])
def SkillSetUpdate():
    ID = request.form["id"]
    NEWID = request.form["newid"]
    NEWNAME = request.form["newname"]
    
    res = CODES.FAILED
    try:
        sql = "UPDATE SKILLSET SET ID=%(NEWID)s, NAME=%(NEWNAME)s WHERE ID=%(ID)s);"
        val = {"ID": ID, "NEWID": NEWID, "NEWNAME": NEWNAME}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/Remove", methods=["POST"])
def SkillSetRemove():
    ID = request.form["id"]
    
    res = CODES.FAILED
    try:
        sql = "DELETE * FROM SKILLSET WHERE ID=%(ID)s);"
        val = {"ID": ID}
        execute(sql, val)
        db.commit()
        res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/SkillAdd", methods=["POST"])
def SkillAdd():
    NAME = request.form["name"]
    SKILLSET = request.form["skillset"]

    res = CODES.FAILED
    try:
        sql = "INSERT INTO SKILLS(NAME, SKILLSET) VALUES(%(NAME)s, %(SKILLSET)s);"
        val = {"NAME": NAME, "SKILLSET": SKILLSET}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/SkillRead", methods=["GET"])
def SkillRead():
    ID = request.form["id"]

    res = CODES.FAILED
    try:
        sql = "SELECT * FROM SKILLS WHERE ID=%(ID)s);"
        val = {"ID": ID}
        cursor = execute(sql, val)
        for c in cursor:
            res = {"ID": c[0], "NAME": c[1], "SKILLSET": c[2]}
        db.commit()
        return make_response(res)
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/SkillReadAll", methods=["GET"])
def SkillReadAll():
    res = []
    try:
        sql = "SELECT * FROM SKILLS;"
        cursor = execute(sql)
        for c in cursor:
            res.append({"ID": c[0], "NAME": c[1], "SKILLSET": c[2]})
        db.commit()
        return make_response(res)
    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

@skillset.route("/SkillUpdate", methods=["POST"])
def SkillUpdate():
    ID = request.form["id"]
    NEWID = request.form["newid"]
    NEWNAME = request.form["newname"]
    NEWSKILLSET = request.form["newskillset"]

    res = CODES.FAILED
    try:
        sql = "UPDATE SKILLS SET ID=%(NEWID)s, NAME=%(NEWNAME)s, SKILLSET=%(NEWSKILLSET)s WHERE ID=%(ID)s);"
        val = {"ID": ID, "NEWID": NEWID, "NEWNAME": NEWNAME, "NEWSKILLSET": NEWSKILLSET}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return res

@skillset.route("/SkillRemove", methods=["POST"])
def SkillRemove():
    ID = request.form["id"]
    
    res = CODES.FAILED
    try:
        sql = "DELETE * FROM SKILLS WHERE ID=%(ID)s);"
        val = {"ID": ID}
        execute(sql, val)
        db.commit()
        res = CODES.SUCCESS
    except:
        res = CODES.SQL_ERROR
        print()
    return res