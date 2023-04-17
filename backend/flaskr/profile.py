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
        'email': user.get_email()
    })

@bp.route("/edit_profile", methods=["POST"])
def edit_profile():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']
    new_password = data['newPassword']
    new_password_confirmation = data['newPasswordConfirmation']
    avatar = data['avatar']
    user_id = session.get("user_id") or data['userID']

    if user_id is None:
        return jsonify({'msg': f"Couldn't find user with id {user_id}"})

    error = None
    try:
        user = User.query.filter_by(id=user_id).first()

        if password == '':
            error = "Password is required"
        elif not user.verify_password(password):
            error = "Password is incorrect"

        if error is None:
            if username != '':
                user.username = username
            if email != '':
                user.email = email
            if new_password != '' and new_password == new_password_confirmation:
                user.set_password_hash(new_password)
            if avatar != '':
                decoded_avatar = base64.b64decode(avatar.split(',')[1])
                path_to_image = f"../public/avatars/{user_id}.png" 
                with open(path_to_image, "wb") as img:
                    img.write(decoded_avatar)
                user.avatar = path_to_image
            db.session.commit()
            print(f"User {user_id} edited succesfully")
            return jsonify({'msg': 'User edited successfully'})
        else:
            print(f"Error {error}")
            return jsonify({'msg': error})
    except Exception as e:
        errMsg = str(e)
        error = ""
        if 'users.email' in errMsg:
            error = f"E-mail {email} is already taken"
        elif 'users.username:' in errMsg:
            error = f"Username {username} is already taken"
        else:
            error = "Unknown error:\n" + errMsg
        print(f"Error {error}")
        return jsonify({'msg': error})
