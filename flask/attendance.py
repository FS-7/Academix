from flask import Blueprint, make_response, request
from http import HTTPStatus
from mysql import connector
from utils import db, GetUser, GetToken, execute
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
    resBody = {}
    resStatus = HTTPStatus.UNAUTHORIZED
    
    data = json.loads(request.data)
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    ATTMOD = GetUser(TOKEN)
    LOCLAT = data["loclat"]
    LOCLON = data["loclon"]
    SUBJECT = data["subject"]
    IMG = data["image"]
    STUDENT = data["usn"]

    if(Recognize(IMG, STUDENT)):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    try:
        sql = "INSERT INTO ATTENDANCE(STUDENT, ATTMOD, LOCLAT, LOCLON, SUBJECT) VALUES (%(STUDENT)s, %(ATTMOD)s, %(LOCLAT)s, %(LOCLON)s, %(SUBJECT)s);"
        val = { "STUDENT": STUDENT, "ATTMOD": ATTMOD, "LOCLAT": LOCLAT, "LOCLON": LOCLON, "SUBJECT": SUBJECT }
        cursor = execute(sql, val)
        db.commit()
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED

    except connector.ProgrammingError as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except connector.Error as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)
    except Exception as e:
        resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
        print(e)


def Recognize(img, usn):
    return True
