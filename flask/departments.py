from flask import Blueprint, make_response, request
from http import HTTPStatus
from mysql import connector
from utils import db, GetToken, GetUser, execute, GetUserPermissions
import json

departments = Blueprint("departments", __name__)

@departments.route("/", methods=["GET", "POST"])
def index():
    return make_response("Departments")

@departments.route("/Add", methods=["POST"])
def Add():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)
    CODE = data["code"]
    NAME = data["name"]

    try:
        sql = "INSERT INTO DEPARTMENTS(CODE, NAME) VALUES (%(CODE)s, %(NAME)s);"
        val = {"CODE": CODE, "NAME": NAME}
        cursor = execute(sql, val)
        if(cursor.rowcount == 1):
            db.commit()
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

@departments.route("/ReadAll", methods=["GET"])
def ReadAll():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    deptList = []
    try:
        sql = "SELECT * FROM DEPARTMENTS;"
        cursor = execute(sql)
        for c in cursor:
            deptList.append({"CODE": c[0], "NAME": c[1] })
        resBody = deptList
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


@departments.route("/Update", methods=["POST"])
def Update():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    CODE = data["code"]
    NEWNAME = data["newname"]
    try:
        sql = "UPDATE DEPARTMENTS SET NAME=%(NEWNAME)s WHERE CODE=%(CODE)s;"
        val = { "CODE": CODE, "NEWNAME": NEWNAME }
        cursor = execute(sql, val)
        if(cursor.rowcount >= 1):
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


@departments.route("/Remove", methods=["POST"])
def Delete():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    CODE = data["code"]
    try:
        sql = "DELETE FROM DEPARTMENTS WHERE CODE=%(CODE)s;"
        val = { "CODE": CODE }
        cursor = execute(sql, val)
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

#
#   SUBJECTS
#

@departments.route("/subjects/add", methods=["POST"])
def AddSubject():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    CODE = data["code"]
    NAME = data["name"]
    DEPARTMENT = data["department"]
    TEACHER = data["teacher"]

    
    try:
        sql = "INSERT INTO SUBJECTS(CODE, NAME, DEPARTMENT, TEACHER) VALUES(%(CODE)s, %(NAME)s, %(DEPARMENT)s, %(TEACHER)s);"
        val = { "CODE": CODE, "NAME": NAME, "DEPARTMENT": DEPARTMENT, "TEACHER": TEACHER }
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

@departments.route("/subjects/read", methods=["GET"])
def ReadSubjects():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    subjects = []
    try:
        sql = "SELECT * FROM SUBJECTS;"
        val = {}
        cursor = execute(sql, val)
        for s in cursor:
            subjects.append(s)
        resBody = subjects
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

@departments.route("/subject/remove", methods=["POST"])
def DeleteSubject():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    CODE = data["code"]

    try:
        sql = "DELETE FROM SUBJECTS WHERE CODE=%(CODE)s;"
        val = { "CODE": CODE }
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

#
#   TEACHERS
#
@departments.route("/teacher/read", methods=["GET"])
def TeacherRead():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)

    teachers = []
    try:
        sql = "SELECT T.ID, U.NAME, U.EMAIL, T.APPROVER, T.STATUS FROM TEACHERS AS T INNER JOIN USERS AS U ON T.TEACHER=U.ID WHERE STATUS=0 AND APPROVER=(SELECT EMAIL FROM USERS WHERE ID=%(APPROVER)s);"
        val = { "APPROVER": User }
        cursor = execute(sql, val)
        for c in cursor:
            teachers.append({"ID": c[0], "NAME": c[1], "EMAIL": c[2], "APPROVER": c[3], "STATUS": c[4]})
        resBody = teachers
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


@departments.route("/teacher/register", methods=["POST"])
def RegisterTeacher():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    User = GetUser(TOKEN)
    APPROVER = data["approver"]

    try:
        sql = "INSERT INTO TEACHERS(TEACHER, APPROVER) VALUES(%(USER)s, %(APPROVER)s);"
        val = { "USER": User, "APPROVER": APPROVER }
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

@departments.route("/teacher/approve", methods=["POST"])
def ApproveT():
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
    APPROVER = GetUser(TOKEN)

    if("approver_3" not in GetUserPermissions(APPROVER)):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)

    try:
        sql = "UPDATE TEACHERS SET STATUS=TRUE WHERE ID=%(ID)s AND APPROVER=(SELECT EMAIL FROM USERS WHERE ID=%(APPROVER)s);"
        val = { "ID": ID, "APPROVER": APPROVER }
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

@departments.route("/teacher/deny", methods=["POST"])
def DenyT():
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
    APPROVER = GetUser(TOKEN)
    
    if("approver_3" not in GetUserPermissions(APPROVER)):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)

    try:
        sql = "DELETE FROM TEACHERS WHERE ID=%(ID)s AND APPROVER=(SELECT EMAIL FROM USERS WHERE ID=%(APPROVER)s);"
        val = { "ID": ID, "APPROVER": APPROVER }
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


#
#   STUDENTS
#

@departments.route("/student/read", methods=["GET"])
def StudentRead():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    User = GetUser(TOKEN)

    students = []
    try:
        sql = "SELECT S.USN, U.NAME, U.EMAIL, S.APPROVER, S.STATUS FROM STUDENTS AS S INNER JOIN USERS AS U ON S.STUDENT=U.ID WHERE STATUS=0 AND APPROVER=(SELECT EMAIL FROM USERS WHERE ID=%(APPROVER)s);"
        val = { "APPROVER": User }
        cursor = execute(sql, val)
        for c in cursor:
            students.append({"USN": c[0], "NAME": c[1], "EMAIL": c[2], "APPROVER": c[3], "STATUS": c[4]})
        resBody = students
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

@departments.route("/student/Register", methods=["POST"])
def RegisterStudent():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    User = GetUser(TOKEN)
    USN = data["usn"]
    DEPARTMENT = data["department"]
    BATCH = data["batch"]
    APPROVER = data["approver"]

    try:
        sql = "INSERT INTO STUDENTS(USN, STUDENT, DEPARTMENT, BATCH, APPROVER) VALUES(%(USN)s, %(STUDENT)s, %(DEPARTMENT)s, %(BATCH)s, %(APPROVER)s);"
        val = { "USN": USN, "STUDENT": User, "DEPARTMENT": DEPARTMENT, "BATCH": BATCH, "APPROVER": APPROVER }
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


@departments.route("/student/approve", methods=["POST"])
def ApproveS():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    USN = data["usn"]
    APPROVER = GetUser(TOKEN)

    if("approver_3" not in GetUserPermissions(APPROVER)):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)

    try:
        sql = "UPDATE STUDENTS SET STATUS=TRUE WHERE USN=%(USN)s AND APPROVER=(SELECT EMAIL FROM USERS WHERE ID=%(APPROVER)s);"
        val = { "USN": USN, "APPROVER": APPROVER }
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

@departments.route("/student/deny", methods=["POST"])
def DenyS():
    resBody = {}
    resStatus = HTTPStatus.INTERNAL_SERVER_ERROR
    
    TOKEN = GetToken()
    User = GetUser(TOKEN)
    if(User == -1):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    data = json.loads(request.data)

    USN = data["usn"]
    APPROVER = GetUser(TOKEN)
    
    if("approver_3" not in GetUserPermissions(APPROVER)):
        resBody = {}
        resStatus = HTTPStatus.UNAUTHORIZED
        return make_response(resBody, resStatus)
    
    print(USN)
    print(APPROVER)
    try:
        sql = "DELETE FROM STUDENTS WHERE USN=%(USN)s AND APPROVER=(SELECT EMAIL FROM USERS WHERE ID=%(APPROVER)s);"
        val = { "USN": USN, "APPROVER": APPROVER }
        cursor = execute(sql, val)
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

