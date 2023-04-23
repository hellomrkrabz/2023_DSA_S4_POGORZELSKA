from flask import (
    Blueprint,
    request,
    session,
    jsonify
)
from . import db
from .user import User
import base64

bp = Blueprint("profile", __name__, url_prefix="/profile")

@bp.route('/get_data/<id>', methods=['GET'])
def get_user_data(id):
    user = User.query.filter_by(id=id).first()
    return jsonify({
        'username': user.get_username(),
        'avatar': user.get_avatar(),
        'email': user.get_email(),
        'contact': user.get_phone_number(),
        'address': user.get_city(),
        'bio': user.get_details()
    })

@bp.route("/edit_details", methods=["POST"])
def edit_details():
    data = request.get_json()
    username = data['username']
    avatar = data['avatar']
    user_email = data['email']
    address = data['address']
    contact = data['contact']
    bio = data['bio']

    if user_email is None:
        return jsonify({'msg': f"Couldn't find user with email {user_email}"})

    error = None
    try:
        user = User.query.filter_by(email=user_email).first()

        if error is None:
            if username != '':
                user.username = username
            if contact != '':
                user.phone_number = contact
            if address != '':
                user.city = address
            if bio != '':
                user.details = bio
            if avatar != '':
                decoded_avatar = base64.b64decode(avatar.split(',')[1])
                path_to_image = f"../public/avatars/{user_email}.png"
                with open(path_to_image, "wb") as img:
                    img.write(decoded_avatar)
                user.avatar = path_to_image
            db.session.commit()
            print(f"User {user_email} edited succesfully")
            return jsonify({'msg': 'User edited successfully'})
        else:
            print(f"Error {error}")
            return jsonify({'msg': error})
    except Exception as e:
        errMsg = str(e)
        error = ""
        if 'users.username:' in errMsg:
            error = f"Username {username} is already taken"
        else:
            error = "Unknown error:\n" + errMsg
        print(f"Error {error}")
        return jsonify({'msg': error})

@bp.route("/edit_password", methods=["POST"])
def edit_password():
    data = request.get_json()
    password = data['password']
    new_password = data['newPassword']
    new_password_confirmation = data['confirmPassword']
    user_email = data['email']

    if user_email is None:
        return jsonify({'msg': f"Couldn't find user with id {user_email}"})

    error = None
    user = User.query.filter_by(email=user_email).first()

    if password == '':
        error = "Password is required"
    elif not user.verify_password(password):
        error = "Password is incorrect"

    if error is None:
        if new_password != '' and new_password == new_password_confirmation:
            user.set_password_hash(new_password)
            db.session.commit()
            print(f"User {user_email} edited succesfully")
            return jsonify({'msg': 'User edited successfully'})
        else:
            print(f"Error {error}")
            return jsonify({'msg': error})