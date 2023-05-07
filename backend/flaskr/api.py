from flask import Blueprint, jsonify, request
from .book import Owned_Book
from .book import Wanted_Book
from .user import User
from .shelf import Shelf
from .room import Room
from .review import Review
from .transaction import Transaction
from . import db


bp = Blueprint("api", __name__, url_prefix='/api')

@bp.route('/owned_book_info', methods=['GET'])
def get_books():
    books = Owned_Book.query.all()
    print(books)
    books_json = [{
        'book_id': b.get_book_id(),
        'author': b.get_author(),
        'title': b.get_title()
    }for b in books]

    return jsonify({'books': books_json})

@bp.route('/owned_book_info/<b_id>', methods=['GET'])
def get_book_info(b_id):
    book = Owned_Book.query.filter_by(book_id=b_id).first()
    if book is not None:
        return jsonify({
            'book_id': book.get_book_id(),
            'author': book.get_author(),
            'title': book.get_title()
        })
    return jsonify({'msg': 'Specified book does not exist:('})

@bp.route('/owned_book_test/<u_id>', methods=['GET'])
def get_book_info_test(u_id):
    user = User.query.filter_by(id=u_id).first()
    if user is not None:
        list = user.get_book_info()
        if list is not None:
            for book_id in list:
                book = Owned_Book.query.filter_by(book_id=book_id).first()
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

@bp.route('/<entity_type>/<action>', methods=['POST'])
def add_or_edit_entity(entity_type, action):
    data = request.get_json()
    entity_type = str(entity_type)
    entity = None

    try:
        if entity_type == 'owned_book':
            google_book_id = data['google_book_id']
            book_state = data['book_state']
            rentable = data['rentable']
            shelf_id = data['shelf_id']

            if action == "add":
                entity = Owned_Book(
                    google_book_id=google_book_id,
                    book_state=book_state,
                    rentable=rentable,
                    shelf_id=shelf_id
                )
            elif action == "edit":
                entity = Owned_Book.query.filter_by(id=data['id']).first()
                entity.google_book_id = google_book_id
                entity.book_state = book_state
                entity.rentable = rentable
                entity.shelf_id = shelf_id

        elif entity_type == 'wanted_book':
            google_book_id = data['google_book_id']

            if action == "add":
                entity = Wanted_Book(
                    google_book_id=google_book_id
                )

        elif entity_type == 'shelf':
            shelf_name = data['shelf_name']
            room_id = data['room_id']

            if action == "add":
                entity = Shelf(
                    shelf_name=shelf_name,
                    room_id=room_id
                )
            elif action == "edit":
                entity = Shelf.query.filter_by(id=data['id']).first()
                entity.shelf_name = shelf_name
                entity.room_id = room_id

        elif entity_type == 'room':
            room_name = data['room_name']
            owner_id = data['owner_id']

            if action == "add":
                entity = Room(
                    room_name=room_name,
                    owner_id=owner_id
                )
            elif action == "edit":
                entity = Room.query.filter_by(id=data['id']).first()
                entity.room_name = room_name

        elif entity_type == 'review':
            rating = data['rating']
            visible = data['visible']
            content = data['content']
            borrower_id = data['borrower_id']
            renter_id = data['renter_id']

            if action == "add":
                entity = Review(
                    rating=rating,
                    visible=visible,
                    content=content,
                    borrower_id=borrower_id,
                    renter_id=renter_id
                )
            elif action == "edit":
                entity = Review.query.filter_by(id=data['id']).first()
                entity.rating = rating
                entity.visible = visible
                entity.content = content

            elif entity_type == 'transaction':
                reservation_date = data['reservation_date']
                rent_date = data['rent_date']
                return_date = data['return_date']
                state = data['state']
                book_id = data['book_id']
                borrower_id = data['borrower_id']

                if action == "add":
                    entity = Transaction(
                        reservation_date=reservation_date,
                        rent_date='null',
                        return_date='null',
                        state='reservation',
                        book_id=book_id,
                        borrower_id=borrower_id
                    )
                elif action == "edit":
                    entity = Transaction.query.filter_by(id=data['id']).first()
                    entity.rent_date = rent_date
                    entity.return_date = return_date
                    entity.state = state

        else:
            print(f"[ERROR] :: Unknown entity type: {entity_type}")
            return jsonify({'msg': f"Unknown entity type: {entity_type}"})

        if action == "add":
            db.session.add(entity)
        db.session.commit()
        print(f"[INFO] Action '{action}' on {entity} performed successfully")
        return jsonify({"msg": "success", "id": entity.get_id()})
    except Exception as e:
        error = str(e)
        print('[ERROR] :: Failed to add/edit post. Cause:', error)
        return jsonify({'msg': error})