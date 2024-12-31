from flask import Blueprint, make_response, request
from http import HTTPStatus
from mysql import connector

from utils import db, GetUser, GetToken, execute
import json

attendance = Blueprint("attendance", __name__)

@attendance.route("/", methods=["GET", "POST"])
def index():
    return make_response("Attendance")

@attendance.route("/train", methods=["POST"])
def Train():
    resBody = {}
    resStatus = HTTPStatus.UNAUTHORIZED

    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)
    IMAGE = request.files["image"].read()

    try:
        sql = "INSERT INTO MODEL(USN, IMAGE) VALUES ((SELECT USN FROM STUDENTS WHERE STUDENT=%(USER)s), %(IMAGE)s);"
        val = { "USER": User, "IMAGE": IMAGE }
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


@attendance.route("/add", methods=["POST"])
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
    SUBJECT = data["subject"]
    IMAGE = request.files["image"].read()

    resBody = {}
    resStatus = HTTPStatus.OK
    
    ALL_STUDENTS = Recognize(IMAGE)
    ALL_STUDENTS = []
    
    for STUDENT in ALL_STUDENTS:
        try:
            sql = "INSERT INTO ATTENDANCE(STUDENT, ATTMOD, SUBJECT) VALUES (%(STUDENT)s, %(ATTMOD)s, %(SUBJECT)s);"
            val = { "STUDENT": STUDENT, "ATTMOD": ATTMOD, "SUBJECT": SUBJECT }
            cursor = execute(sql, val)
            if(cursor.rowcount == 1):
                db.commit()
                db.close()
            else:
                resBody = {}
                resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
                return make_response(resBody, resStatus)

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


def Recognize(ALL_STUDENTS):
    
    return []
