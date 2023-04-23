from flask import Blueprint, jsonify, request
from .book import Book
from .user import User
from . import db

bp = Blueprint("api", __name__, url_prefix='/api')

@bp.route('/book_info', methods=['GET'])
def get_books():
    books = Book.query.all()
    print(books)
    books_json = [{
        'book_id': b.get_book_id(),
        'author': b.get_author(),
        'title': b.get_title()
    }for b in books]

    return jsonify({'books': books_json})

@bp.route('/book_info/<b_id>', methods=['GET'])
def get_book_info(b_id):
    book = Book.query.filter_by(book_id=b_id).first()
    if book is not None:
        return jsonify({
            'book_id': book.get_book_id(),
            'author': book.get_author(),
            'title': book.get_title()
        })
    return jsonify({'msg': 'Specified book does not exist:('})

@bp.route('/user_info', methods=['GET'])
def get_users():
    users = User.query.all()
    print(users)
    users_json = [{
        'id': u.get_id(),
        'email': u.get_email(),
        'username': u.get_username(),
        'password': u.get_password(),
        'avatar': u.get_avatar(),
        'key': u.get_key(),
        'phone_number': u.get_phone_number(),
        'city': u.get_city(),
        'details': u.get_details()
    }for u in users]

    return jsonify({'users': users_json})


@bp.route('/user/<id>', methods=['GET'])
def get_user_by_id(id):
    user = User.query.filter_by(id=id).first()
    print(user)
    if user is not None:
        user_json = {
            'id': user.get_id(),
            'email': user.get_email(),
            'username': user.get_username(),
            'password': user.get_password(),
            'avatar': user.get_avatar(),
            'key': user.get_key()
        }
    else:
        user_json = {
            'error': 'No such user'
        }
    return jsonify({'user': user_json})

@bp.route('/user_info/<username>', methods=['GET'])
def get_user_by_username(username):
    user = User.query.filter_by(username=username).first()
    if user is not None:
        user_json = {
            'id': user.get_id(),
            'email': user.get_email(),
            'username': user.get_username(),
            'password': user.get_password(),
            'avatar': user.encode_avatar(),
            'key': user.get_key(),
            'phone_number': user.get_phone_number(),
            'city': user.get_city(),
            'details': user.get_details()
        }
    else:
        user_json = {
            'error': 'No such user'
        }
    return jsonify({'user': user_json})