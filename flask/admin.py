from flask import Blueprint, make_response

admin = Blueprint("admin", __name__)

@admin.route("/", methods=["GET"])
def index():
    return make_response("Admin")