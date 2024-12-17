from flask import Blueprint, make_response, request
from utils import CODES, db, GetUser, GetToken, execute
import json

attendance = Blueprint("attendance", __name__)

@attendance.route("/", methods=["GET", "POST"])
def index():
    return make_response("Attendance")

@attendance.route("/Train", methods=["POST"])
def Train():
    data = json.loads(request.data)

@attendance.route("/Add", methods=["POST"])
def AddAttendance():
    data = json.loads(request.data)
    TOKEN = GetToken()
    if(TOKEN == ''):
        return make_response(str(CODES.UNAUTHORIZED))
    
    ATTMOD = GetUser(TOKEN)
    LOCLAT = data["loclat"]
    LOCLON = data["loclon"]
    SUBJECT = data["subject"]
    IMG = data["image"]
    STUDENT = data["usn"]

    if(Recognize(IMG, STUDENT)):
        make_response(str(CODES.UNAUTHORIZED))

    res = CODES.FAILED
    try:
        sql = "INSERT INTO ATTENDANCE(STUDENT, ATTMOD, LOCLAT, LOCLON, SUBJECT) VALUES (%(STUDENT)s, %(ATTMOD)s, %(LOCLAT)s, %(LOCLON)s, %(SUBJECT)s);"
        val = { "STUDENT": STUDENT, "ATTMOD": ATTMOD, "LOCLAT": LOCLAT, "LOCLON": LOCLON, "SUBJECT": SUBJECT }
        cursor = execute(sql, val)
        db.commit()
        res = CODES.SUCCESS

    except:
        res = CODES.SQL_ERROR
        print()
    return make_response(str(res))

def Recognize(img, usn):
    return True
