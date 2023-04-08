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
        'password': u.get_password()
    }for u in users]

    return jsonify({'users': users_json})