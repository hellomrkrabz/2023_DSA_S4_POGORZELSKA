from flask import Blueprint, jsonify, request, Response
from .book import Owned_Book
from .book import Wanted_Book
from .book import Book
from .user import User
from .shelf import Shelf
from .room import Room
from .review import Review
from .transaction import Transaction
from .report import Report
from . import db
import json
from datetime import date
import sqlalchemy
from .book import States
from .transaction import StatesForTransactions
from sqlalchemy import text, create_engine, ForeignKey
from .email_sender import send_mail_with_msg, send_mail_with_html, send_mail_from_html_file
from .html_proccesors import html_attr_inputter_by_id, attr_input_args_id, html_inner_inputter_by_id ,inner_html_input_args_id

bp = Blueprint("api", __name__, url_prefix='/api')
engine = create_engine("postgresql://banana_books_user:p5KDYaDuvdp5rwHoVyO9bkH2uXkSedzB@dpg-cgljb682qv24jlvodv40-a.frankfurt-postgres.render.com/banana_books")

#---------------------info about books---------------------------

@bp.route('/owned_book_info', methods=['GET'])
def get_owned_books():
    books = Owned_Book.query.all()
    books_json = [{
        'owned_book_id': b.get_id(),
        'book_state': b.get_book_state(),
        'rentable': b.get_rentable(),
        'owner_id': b.get_owner_id(),
        'shelf_id': b.get_shelf_id(),
        'book_id': b.get_book_id()
    }for b in books]

    return jsonify({'books': books_json})

@bp.route('/wanted_book_info', methods=['GET'])
def get_wanted_books():
    books = Wanted_Book.query.all()
    books_json = [{
        'wanted_book_id': b.get_id(),
        'owner_id': b.get_user_id(),
        'book_id': b.get_foreign_book_id()
    }for b in books]

    return jsonify({'books': books_json})

@bp.route('/book_info/<b_id>', methods=['GET'])
def get_book_info(b_id):
    book = Book.query.filter_by(book_id=b_id).first()
    if book is not None:
        return jsonify({
            'book_id': book.get_id(),
            'google_book_id': book.get_google_book_id(),
            'isbn': book.get_isbn(),
            'title': book.get_title(),
            'author': book.get_author(),
            'cover_photo': book.get_cover_photo()
        })
    return jsonify({'msg': 'Specified book does not exist:('})

@bp.route('/owned_book_info/<b_id>', methods=['GET'])
def get_owned_book_info(b_id):
    book = Owned_Book.query.filter_by(owned_book_id=b_id).first()
    if book is not None:
        return jsonify({
            'owned_book_id': book.get_id(),
            'book_state': book.get_book_state(),
            'rentable': book.get_rentable(),
            'owner_id': book.get_owner_id(),
            'shelf_id': book.get_shelf_id(),
            'book_id': book.get_book_id()
        })
    return jsonify({'msg': 'Specified book does not exist:('})

@bp.route('/wanted_book_info/<b_id>', methods=['GET'])
def get_wanted_book_info(b_id):
    book = Wanted_Book.query.filter_by(wanted_book_id=b_id).first()
    if book is not None:
        return jsonify({
            'wanted_book_id': book.get_id(),
            'owner': book.get_user_id(),
            'book_id': book.get_foreign_book_id()
        })
    return jsonify({'msg': 'Specified book does not exist:('})

@bp.route('/owned_book_user/<u_username>', methods=['GET'])
def get_owned_book_info_username(u_username):
    user = User.query.filter_by(username=u_username).first()
    if user is not None:
        list = user.get_book_info()
        book_list = []
        if list is not None:
            for book_id in list:
                book = Owned_Book.query.filter_by(book_id=book_id).first()
                book_list.append(book)
            book_json = [{
                'owned_book_id': b.get_id(),
                'book_state': b.get_book_state(),
                'rentable': b.get_rentable(),
                'owner_id': b.get_owner_id(),
                'shelf_id': b.get_shelf_id(),
                'book_id': b.get_book_id()
            } for b in book_list]
            return jsonify({'books': book_json})
        return jsonify({'msg': 'No books?:('})

@bp.route('/wanted_book_user/<u_username>', methods=['GET'])
def get_wanted_book_info_username(u_username):
    user = User.query.filter_by(username=u_username).first()
    if user is not None:
        list = user.get_wanted_book_info()
        book_list = []
        if list is not None:
            for book_id in list:
                book = Wanted_Book.query.filter_by(foreign_book_id=book_id).first()
                book_list.append(book)
            book_json = [{
                'wanted_book_id': b.get_id(),
                'owner': b.get_user_id(),
                'book_id': b.get_foreign_book_id()
            } for b in book_list]
            return jsonify({'books': book_json})
        return jsonify({'msg': 'No books?:('})

#---------------------info about users---------------------------

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
    rating = str(user.get_user_rating())
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
            'details': user.get_details(),
            'average_rating': rating
        }
    else:
        user_json = {
            'error': 'No such user'
        }
    return jsonify({'user': user_json})

#---------------------info about rooms & shelves---------------------------

@bp.route('/owned_rooms/<username>', methods=['GET'])
def get_owned_rooms(username):
    user = User.query.filter_by(username=username).first()
    if user is not None:
        list = user.get_room_info()
        room_list = []
        if list is not None:
            for room_id in list:
                room = Room.query.filter_by(room_id=room_id).first()
                room_list.append(room)
            room_json = [{
                'id': r.get_id(),
                'name': r.get_room_name(),
                'owner': r.get_owner_id()
            } for r in room_list]
            return jsonify({'rooms': room_json})
    return jsonify({'msg': 'No rooms?:('})

@bp.route('/get_rooms', methods=['GET'])
def get_rooms():
    rooms = Room.query.all()
    rooms_json = [{
        'id': r.get_id(),
        'name': r.get_room_name(),
        'owner': r.get_owner_id()
    }for r in rooms]

    return jsonify({'rooms': rooms_json})


@bp.route('/owned_shelves/<username>', methods=['GET'])
def get_owned_shelves(username):
    user = User.query.filter_by(username=username).first()
    if user is not None:
        input_list = user.get_shelf_info()
        shelf_list = []
        if input_list is not None:
            for shelf_id in input_list:
                shelf = Shelf.query.filter_by(shelf_id=shelf_id).first()
                shelf_list.append(shelf)
            shelf_json = [{
                'id': s.get_id(),
                'name': s.get_shelf_name(),
                'room': s.get_room_id()
            } for s in shelf_list]
            return jsonify({'shelves': shelf_json})
    return jsonify({'msg': 'No shelves?:('})

@bp.route('/get_shelves', methods=['GET'])
def get_shelves():
    shelves = Shelf.query.all()
    shelves_json = [{
        'id': s.get_id(),
        'name': s.get_shelf_name(),
        'room': s.get_room_id()
    }for s in shelves]

    return jsonify({'shelves': shelves_json})



#---------------------transaction stuff---------------------------

@bp.route('/transactions/<username>', methods=['GET'])
def get_user_transactions(username):
    user = User.query.filter_by(username=username).first()
    if user is not None:
        transactions = Transaction.query.all()
        print(transactions)
        filtered_transactions = []
        for t in transactions:
            owned_book = Owned_Book.query.filter_by(owned_book_id=t.book_id).first()
            if owned_book.owner_id == user.id:
                print(t)
                filtered_transactions.append(t)

        filtered_transactions_2 = Transaction.query.filter_by(borrower_id=user.id)
        filtered_transactions += filtered_transactions_2
        if filtered_transactions is not None:
            transactions_json = [{
                'id': t.get_id(),
                'reservation_date': t.get_reservation_date(),
                'rent_date': t.get_rent_date(),
                'return_date': t.get_return_date(),
                'state': t.get_state().name,
                'book_id': t.get_book_id(),
                'borrower_id': t.get_borrower_id(),
                'borrower_username': t.get_borrower_username()
            } for t in filtered_transactions]
            return jsonify({'transactions': transactions_json})
    return jsonify({'msg': 'it no good'})

@bp.route('/transaction/<t_id>', methods=['GET'])
def get_transaction_by_id(t_id):
   transaction = Transaction.query.filter_by(transaction_id=t_id).first()
   if transaction is not None:

        owned_book = Owned_Book.query.filter_by(owned_book_id=transaction.get_book_id()).first()

        transaction_json = {
            'id': transaction.get_id(),
            'reservation_date': transaction.get_reservation_date(),
            'rent_date': transaction.get_rent_date(),
            'return_date': transaction.get_return_date(),
            'state': transaction.get_state().name,
            'book_id': transaction.get_book_id(),
            'borrower_id': transaction.get_borrower_id(),
            'borrower_username': transaction.get_borrower_username(),
            'owner_id': owned_book.get_id(),
            'condition': States(owned_book.get_book_state()).name,
        }
        return jsonify({'transaction': transaction_json})
   return jsonify({'msg': 'it no good'})

@bp.route('/transaction/<username>/<t_id>', methods=['GET'])
def get_transaction(username, t_id):
   user = User.query.filter_by(username=username).first()
   if user is not None:
       transaction = Transaction.query.filter_by(borrower_id=user.id).filter_by(transaction_id=t_id).first();
       if transaction is not None:
        transaction_json = {
            'id': transaction.get_id(),
            'reservation_date': transaction.get_reservation_date(),
            'rent_date': transaction.get_rent_date(),
            'return_date': transaction.get_return_date(),
            'state': transaction.get_state().name,
            'book_id': transaction.get_book_id(),
            'borrower_id': transaction.get_borrower_id(),
            'borrower_username': transaction.get_borrower_username()               
        }
        return jsonify({'transaction': transaction_json})
   return jsonify({'msg': 'it no good'})

@bp.route('/transactions', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.all()
    if transactions is not None:
        transaction_json = [{
            'id': t.get_id(),
            'reservation_date': t.get_reservation_date(),
            'rent_date': t.get_rent_date(),
            'return_date': t.get_return_date(),
            'state': t.get_state().name,
            'book_id': t.get_book_id(),
            'borrower_id': t.get_borrower_id()
        } for t in transactions]
        return jsonify({'transactions': transaction_json})
    return jsonify({'msg': 'it no good'})


#---------------------opinions stuff---------------------------
@bp.route('/opinions/<username>', methods=['GET'])
def get_user_opinions(username):
    user = User.query.filter_by(username=username).first()
    if user is not None:
        opinions = Review.query.filter_by(borrower_id=user.id)
        if opinions is not None:
            opinion_json = [{
                'user': o.get_renter_id(),
                'date': o.get_date(),
                'score': o.get_rating(),
                'content': o.get_content(),
                'opinion_id': o.get_id()
            } for o in opinions]
            return jsonify({'opinions': opinion_json})
    return jsonify({'msg': 'it no good'})

@bp.route('/opinions', methods=['GET'])
def get_opinions():
    opinions = Review.query.all()
    if opinions is not None:
        opinion_json = [{
            'user': o.get_renter_id(),
            'date': o.get_date(),
            'score': o.get_rating(),
            'content': o.get_content(),
            'opinion_id': o.get_id()
        } for o in opinions]
        return jsonify({'opinions': opinion_json})
    return jsonify({'msg': 'it no good'})

#---------------------report stuff---------------------------
@bp.route('/reports', methods=['GET'])
def get_reports():
    reports = Report.query.all()
    if reports is not None:
        report_json = [{
            'reportDate': r.get_report_date(),
            'reporter': r.get_reporter_id(),
            'reported': r.get_reported_id(),
            'status': r.get_status(),
            'opinionDate': r.get_opinion_date(),
            'opinionContent': r.get_opinion_info(),
            'reportContent': r.get_content()
        } for r in reports]
        return jsonify({'reports': report_json})
    return jsonify({'msg': 'it no good'})

@bp.route('/filtered_reports', methods=['GET'])
def get_filtered_reports():
    reports = Report.query.filter_by(status='0')
    if reports is not None:
        report_json = [{
            'reportDate': r.get_report_date(),
            'reporter': r.get_reporter_id(),
            'reported': r.get_reported_id(),
            'status': r.get_status(),
            'opinionDate': r.get_opinion_date(),
            'opinionContent': r.get_opinion_info(),
            'reportContent': r.get_content()
        } for r in reports]
        return jsonify({'reports': report_json})
    return jsonify({'msg': 'it no good'})
#---------------------adding things---------------------------

@bp.route('/<entity_type>/<action>', methods=['POST'])
def add_or_edit_entity(entity_type, action):
    data = request.get_json()
    entity_type = str(entity_type)
    entity = None
    entity2 = None
    #user = User.query.filter_by(key=data['user_key']).first()

    try:
        if entity_type == 'owned_book':
            book = data['book']
            book_id = book['googleId']
            title = book['title']
            author = book['author']
            isbn = book['ISBN']
            cover_photo = book['src']
            book_state = data['book_state']
            rentable = data['rentable']
            shelf_id = data['shelf_id']

            book_in_db = Book.query.filter_by(google_book_id=book_id).first()
            user = User.query.filter_by(key=data['user_key']).first()
            owner_id = user.id

            if action == "add" and book_in_db is not None:
                entity = Owned_Book(
                    book_id=book_in_db.book_id,
                    book_state=book_state,
                    rentable=rentable,
                    shelf_id=shelf_id,
                    owner_id=owner_id
                )
            elif action == "add" and book_in_db is None:
                    entity2 = Book(
                        google_book_id = book_id,
                        isbn = isbn,
                        title = title,
                        author = author,
                        cover_photo = cover_photo
                    )
                    db.session.add(entity2)
                    db.session.commit()
                    book_in_db = Book.query.filter_by(google_book_id=book_id).first()
                    entity = Owned_Book(
                        book_id=book_in_db.book_id,
                        book_state=book_state,
                        rentable=rentable,
                        shelf_id=shelf_id,
                        owner_id=owner_id
                    )

            elif action == "edit":
                entity = Owned_Book.query.filter_by(id=data['id']).first()
                entity.book_id = book_id
                entity.book_state = book_state
                entity.rentable = rentable
                entity.shelf_id = shelf_id
                entity.owner_id = owner_id

        elif entity_type == 'wanted_book':
            book = data['book']
            book_id = book['googleId']
            title = book['title']
            author = book['author']
            isbn = book['ISBN']
            cover_photo = book['src']

            book_in_db = Book.query.filter_by(google_book_id=book_id).first()
            user = User.query.filter_by(key=data['user_key']).first()
            owner_id = user.id

            if action == "add" and book_in_db is not None:
                entity = Wanted_Book(
                    user_id=owner_id,
                    foreign_book_id = book_in_db.book_id
                )
            elif action == "add" and book_in_db is None:
                    entity2 = Book(
                        google_book_id = book_id,
                        isbn = isbn,
                        title = title,
                        author = author,
                        cover_photo = cover_photo
                    )
                    db.session.add(entity2)
                    db.session.commit()
                    book_in_db = Book.query.filter_by(google_book_id=book_id).first()
                    entity = Wanted_Book(
                        user_id=owner_id,
                        foreign_book_id=book_in_db.book_id
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
            user = User.query.filter_by(key=data['user_key']).first()
            owner_id = user.id

            if action == "add":
                entity = Room(
                    room_name=room_name,
                    owner_id=owner_id
                )
            elif action == "edit":
                entity = Room.query.filter_by(id=data['id']).first()
                entity.room_name = room_name

        elif entity_type == 'opinion':
            rating = data['rating']
            visible = data['visible']
            content = data['content']
            borrower_id = data['borrower_id']
            renter_id = data['renter_id']

            if action == "add":
                entity = Review(
                    rating = rating,
                    visible = visible,
                    content = content,
                    borrower_id = borrower_id,
                    renter_id = renter_id,
                    reported = False,
                    date = date.today(),
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
            book_id = data['book_id']
            state = data['state']
            user = User.query.filter_by(key=data['borrower_key']).first()
            specific_book = Owned_Book.query.filter_by(owned_book_id=book_id).first()
            owner = User.query.filter_by(id=specific_book.get_owner_id()).first()
            borrower_id = user.id
            if action == "add":
                entity = Transaction(
                    reservation_date=date.today(),
                    rent_date=sqlalchemy.sql.null(),
                    return_date=sqlalchemy.sql.null(),
                    state=state,
                    book_id=book_id,
                    borrower_id=borrower_id
                )
                attr_inputter_args = attr_input_args_id("status-change-link", "href",
                                                        "http://localhost:3000/Transactions")
                inner_html_inputter_args = inner_html_input_args_id("username", owner.get_username())

                inputter_list = []
                inputter_list.append(html_attr_inputter_by_id(attr_inputter_args))
                inputter_list.append(html_inner_inputter_by_id(inner_html_inputter_args))

                send_mail_from_html_file(owner.get_email(), "Banana books: New transaction",
                                         "reservation_notify.html",
                                         inputter_list)

            elif action == "edit":
                entity = Transaction.query.filter_by(transaction_id=data['id']).first()
                entity.rent_date = rent_date
                entity.return_date = return_date
                entity.state = StatesForTransactions(state)

                if state in (2,3,5,6,7,10,11,12):
                    attr_inputter_args = attr_input_args_id("status-change-link", "href",
                                                            "http://localhost:3000/Transactions" + str(entity.get_id()))
                    inner_html_inputter_args = inner_html_input_args_id("username", user.get_username())

                    inputter_list_borrower = []
                    inputter_list_borrower.append(html_attr_inputter_by_id(attr_inputter_args))
                    inputter_list_borrower.append(html_inner_inputter_by_id(inner_html_inputter_args))

                    match state:
                        case 2:
                            send_mail_from_html_file(user.get_email(), "Banana books: Transaction status update", "reservation_accepted.html",
                                             inputter_list_borrower)
                        case 3:
                            send_mail_from_html_file(user.get_email(), "Banana books: Transaction status update", "reservation_collection.html",
                                             inputter_list_borrower)
                        case 5:
                            send_mail_from_html_file(user.get_email(), "Banana books: Transaction status update", "email_confirmation.html",
                                             inputter_list_borrower) #do zmiany
                        case 6:
                            send_mail_from_html_file(user.get_email(), "Banana books: Transaction status update", "reservation_contact.html",
                                             inputter_list_borrower)
                        case 7:
                            send_mail_from_html_file(user.get_email(), "Banana books: Transaction status update", "email_confirmation.html",
                                             inputter_list_borrower) #do zmiany
                        case 10:
                            send_mail_from_html_file(user.get_email(), "Banana books: Transaction status update", "transaction_cancelled.html",
                                             inputter_list_borrower)
                        case 11:
                            send_mail_from_html_file(user.get_email(), "Banana books: Transaction status update", "transaction_finished.html",
                                             inputter_list_borrower)
                        case 12:
                            send_mail_from_html_file(user.get_email(), "Banana books: Transaction status update", "transaction_finished.html",
                                             inputter_list_borrower)

                if state in (4,9,10,11,12):
                    attr_inputter_args = attr_input_args_id("status-change-link", "href",
                                                            "http://localhost:3000/Transactions" + entity.get_id())
                    inner_html_inputter_args = inner_html_input_args_id("username", user.get_username())

                    inputter_list_owner = []
                    inputter_list_owner.append(html_attr_inputter_by_id(attr_inputter_args))
                    inputter_list_owner.append(html_inner_inputter_by_id(inner_html_inputter_args))
                    match state:
                        case 4:
                            send_mail_from_html_file(owner.get_email(), "Banana books: Transaction status update",
                                                     "reservation_confirmation.html",
                                                     inputter_list_owner)
                        case 9:
                            send_mail_from_html_file(owner.get_email(), "Banana books: Transaction status update", "reservation_collection.html",
                                             inputter_list_owner) #do zmiany
                        case 10:
                            send_mail_from_html_file(owner.get_email(), "Banana books: Transaction status update", "transaction_cancelled.html",
                                             inputter_list_owner)
                        case 11:
                            send_mail_from_html_file(owner.get_email(), "Banana books: Transaction status update", "transaction_finished.html",
                                             inputter_list_owner)
                        case 12:
                            send_mail_from_html_file(owner.get_email(), "Banana books: Transaction status update", "transaction_finished.html",
                                             inputter_list_owner)

        elif entity_type == 'report':
            content = data['content']
            report_date = data['date']
            opinion_id = data['opinion_id']
            #reported_user = User.query.filter_by(id=data['reported']).first()
            reporter_user = User.query.filter_by(username=data['reporter']).first()
            #reported_id = reported_user.id
            reporter_id = reporter_user.id
            reported_id = data['reported']
            if action == "add":
                entity = Report(
                    content=content,
                    report_date=report_date,
                    opinion_id=opinion_id,
                    status=False,
                    reporter_id=reporter_id,
                    reported_id=reported_id
                )
            elif action == "edit":
                entity = Report.query.filter_by(id=data['id']).first()
                status = data['state']
                entity.status = status

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



@bp.route('/return_books/', methods=['GET'])
def get_all_books():
    books = Book.query.all()
    if books is not None:
        books_json = [{
            'book': b.get_title()
        } for b in books]
        return jsonify({'books': books_json})
    return jsonify({'msg': 'no books?'})