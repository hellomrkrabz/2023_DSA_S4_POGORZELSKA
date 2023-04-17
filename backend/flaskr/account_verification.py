from .user import User
from . import db
from flask import Blueprint, g, redirect, request, make_response, session, url_for, jsonify
from werkzeug.security import generate_password_hash
import json
import re
from .email_sender import send_mail_with_msg, send_mail_with_html, send_mail_from_html_file
from psycopg2.errorcodes import UNIQUE_VIOLATION
from psycopg2 import errors

bp = Blueprint("acc_ver", __name__, url_prefix='/user_validation')



@bp.route('/account_verification', methods=['POST'])
def VerifyAccount():

    data = request.get_json()

    receivedVerificationString = data['sentVerificationString']
    print(receivedVerificationString)

    user = User.query.filter_by(verificationHash=receivedVerificationString).first()

    error = None

    if user is None:
        error = 'Something went wrong, try again'    

    if error is not None:
        print(error)
        return jsonify({"msg": error})

    try:
        user.verifiedAccount = True
        db.session.commit()
        return jsonify({"msg": "true"})
    except Exception as e:
        error = str(e)
        print('[ERROR] ::', error)
        return jsonify({"msg": error})