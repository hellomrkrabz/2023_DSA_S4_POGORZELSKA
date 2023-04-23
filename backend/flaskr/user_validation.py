from .user import User, Permissions
from . import db
from flask import Blueprint, g, redirect, request, make_response, session, url_for, jsonify
from werkzeug.security import generate_password_hash
import json
import re
from .email_sender import send_mail_with_msg, send_mail_with_html, send_mail_from_html_file
from .html_proccesors import html_attr_inputter,attr_input_args
from psycopg2.errorcodes import UNIQUE_VIOLATION
from psycopg2 import errors
import secrets

bp = Blueprint("user_validation", __name__, url_prefix='/user_validation')

regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')


@bp.route('/register', methods=['POST'])
def Register():
    data = request.get_json()

    email = data['sentEmail']
    username = data['sentUsername']
    password = data['sentPassword']
    confirmPassword = data['confirmPassword']
    avatar = '../public/avatars/swinior.jpg'
    key = 'null'

    error = None

    if email == '' or not re.fullmatch(regex, email):
        error = 'No email provided'
    elif username == '':
        error = 'No username provided'
    elif password == '' or not password:
        error = 'No password provided'
    elif password != confirmPassword:
        error = 'Passwords don\'t match'

    if error is not None:
        print(error)
        return jsonify({"msg": error})

    try:
        user = User(email=email,
                    password=generate_password_hash(password),
                    verificationHash = generate_password_hash(email),
                    avatar=avatar,
                    username=username,
                    key=key,
                    permissions=Permissions.not_verified)
        db.session.add(user)
        db.session.commit()
        print(f"User sold data to us without knowing:)")

        inputter_args = attr_input_args("a",0,"href","http://localhost:3000/AccountVerification/"+user.verificationHash)#FORGOR
        url_inputter = html_attr_inputter(inputter_args)

        send_mail_from_html_file(email, "Banana books account verification", "email_confirmation.html",url_inputter) 
        
        return jsonify({"msg": "Successfully registered. Check your email and activate your account! :)"})
    except Exception as e:
        error = str(e)
        if '(psycopg2.errors.UniqueViolation) duplicate key value violates unique constraint "ix_users_email"' in error:
            error = "E-mail is already taken"
        elif 'Daily user sending quota exceeded' in error:
            error = "Internal error"
        else:
            print('[ERROR] ::', error)
        return jsonify({"msg": error})


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data['sentEmail']
    password = data['sentPassword']
    key = secrets.token_urlsafe(20)
    print("Successfully logged in")

    error = None

    user = User.query.filter_by(email=email).first()

    if user is None:
        error = 'No such user'
    elif user.get_permissions() == Permissions.not_verified:
        error = 'Account is not verified. Check your email and try again later'
    elif user.get_permissions() == Permissions.banned:
        error = 'Account is banned.:)'
    elif not user.verify_password(password):
        error = 'Wrong password'

    if error is None:
        session.clear()
        session['user_id'] = user.get_id()
        user.key = key
        db.session.commit()
        print("[INFO]", f"User id: {user.get_id()}")

        resp = jsonify({'user_id': user.get_id(), 'username': user.get_username(), 'key': user.get_key(), 'msg': 'Logged in'})

        response = make_response(resp)
        response.headers['Access-Control-Allow-Credentials'] = True
        return response, 200

    print(f"error: {error}")
    return jsonify({"msg": error})

@bp.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    key = data['key']
    user = User.query.filter_by(key=key).first()
    user.key = 'null'
    db.session.commit()
    session.clear()
    return True
    #return redirect("http://www.google.com")
