from .user import User
from . import db
from flask import Blueprint, g, redirect, request, make_response, session, url_for, jsonify
from werkzeug.security import generate_password_hash
import json
import re
from .email_sender import send_mail_with_msg, send_mail_with_html, send_mail_from_html_file
from .html_proccesors import html_attr_inputter,attr_input_args
from psycopg2.errorcodes import UNIQUE_VIOLATION
from psycopg2 import errors

bp = Blueprint("user_validation", __name__, url_prefix='/user_validation')

regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')


@bp.route('/register', methods=['POST'])
def Register():
    data = request.get_json()

    email = data['sentEmail']
    username = data['sentUsername']
    password = data['sentPassword']
    confirmPassword = data['confirmPassword']
    avatar = '/avatars/swinior.jpg'

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
                    avatar=avatar)
        db.session.add(user)
        db.session.commit()
        print(f"User sold data to us without knowing:)")

        inputter_args = attr_input_args("a",0,"href","insert url here!")#FIXME @Kuba I have no idea where is the link... You have told me but I forgor XD
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
    print("Successfully logged in")

    error = None

    user = User.query.filter_by(email=email).first()

    if user is None:
        error = 'No such user'
    elif not user.get_verified():
        error = 'Account is not verified. Check your email and try again later'
    elif not user.verify_password(password):
        error = 'Wrong password'

    if error is None:
        session.clear()
        session['user_id'] = user.get_id()
        print("[INFO]", f"User id: {user.get_id()}")

        resp = jsonify({'user_id': user.get_id(), 'msg': 'Logged in'})

        response = make_response(resp)
        response.headers['Access-Control-Allow-Credentials'] = True
        return response, 200

    print(f"error: {error}")
    return jsonify({"msg": error})

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))
