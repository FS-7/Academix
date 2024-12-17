from flask import Blueprint, make_response, request

progress = Blueprint("progress", __name__)

@progress.route("/", methods=["GET", "POST"])
def index():
    return make_response("Progress")

@progress.route("/PhaseI", methods=["GET", "POST"])
def UpdatePhaseI():
    return

@progress.route("/PhaseII", methods=["GET", "POST"])
def UpdatePhaseII():
    return

@progress.route("/PhaseIII", methods=["GET", "POST"])
def UpdatePhaseIII():
    return 

@progress.route("/Completed", methods=["GET", "POST"])
def Completed():
    return 

@progress.route("/ShowProgress", methods=["GET", "POST"])
def ShowProgress():
    return
