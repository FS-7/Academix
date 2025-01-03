from flask import Blueprint, make_response, request
from http import HTTPStatus
from mysql import connector
import face_recognition
import numpy as np
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
        sql = "SELECT USN FROM STUDENTS WHERE STUDENT=%(ID)s;"
        val = {"ID": User}
        db.connect()
        cursor = db.cursor(buffered=True)
        cursor.execute(sql, val)
        for c in cursor:
            USN = c[0]
        cursor.close()
            
        face_train = face_recognition.load_image_file(IMAGE)

        if(len(face_recognition.face_locations(face_train)) > 1):
            return -1
        
        train_enc = face_recognition.face_encodings(face_train)
        FACE = json.dumps(np.array(train_enc).tolist())

        sql = "INSERT INTO TEST(USN, FACE) VALUES(%(USN)s, %(FACE)s);"
        val = {"USN": USN, "FACE": FACE}
        db.connect()
        cursor = db.cursor(buffered=True)
        cursor.execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
            cursor.close()
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


def Recognize(IMAGE):
    STUDENTS = []
    face_test = face_recognition.load_image_file(IMAGE)

    if(len(face_recognition.face_locations(face_test)) < 1):
        return False
    
    test_enc = face_recognition.face_encodings(face_test)

    sql = "SELECT USN, FACE FROM TEST;"
    val = {}
    db.connect()
    cursor = db.cursor(buffered=True)
    cursor.execute(sql, val)
    for i in cursor:
        FACE = np.array(json.loads(i[1]))
        for f in test_enc:
            temp = face_recognition.compare_faces(FACE, f, 0.6)
            if(temp[0]):
                STUDENTS.append(i[0])
        
        db.commit()
        cursor.close()

    return STUDENTS
