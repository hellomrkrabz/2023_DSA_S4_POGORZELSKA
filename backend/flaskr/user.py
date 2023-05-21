from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy_utils import EmailType
import enum
import base64
from datetime import datetime
from .room import Room
from .transaction import Transaction
from .review import Review
from .book import Owned_Book
from .book import Wanted_Book
from .report import Report
from sqlalchemy import text, create_engine, ForeignKey

engine = create_engine("postgresql://banana_books_user:p5KDYaDuvdp5rwHoVyO9bkH2uXkSedzB@dpg-cgljb682qv24jlvodv40-a.frankfurt-postgres.render.com/banana_books")

class Permissions(enum.Enum):
    not_verified = 1
    verified = 2
    admin = 3
    warned = 4
    banned = 5

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(EmailType, unique=True, index=True)
    password = db.Column(db.String(128))
    avatar = db.Column(db.String(128))
    username = db.Column(db.String(20), unique=True)
    details = db.Column(db.String(255))
    city = db.Column(db.String(40))
    phone_number = db.Column(db.Integer)
    permissions = db.Column(db.Enum(Permissions))
    verificationHash = db.Column(db.String(128))
    key = db.Column(db.String(128))
    key_expiration_date = db.Column(db.DateTime)
    transactions = db.relationship('Transaction',
                               backref='borrower',
                               lazy='dynamic',
                               cascade="all, delete")
    owned_book = db.relationship('Owned_Book',
                            backref='owner',
                            lazy='dynamic',
                            cascade="all, delete")
    wanted_book = db.relationship('Wanted_Book',
                            backref='user',
                            lazy='dynamic',
                            cascade="all, delete")


    def verify_password(self, password) -> bool:
        return check_password_hash(self.password, password)

    def get_id(self):
        return self.id

    def get_email(self):
        return self.email

    def get_password(self):
        return self.password

    def set_password_hash(self, new_password):
        self.password = generate_password_hash(new_password)

    def get_avatar(self):
        return self.avatar

    def get_verified(self):
        return self.permissions

    def get_username(self):
        return self.username

    def get_key(self):
        return self.key
    
    def get_verification_hash(self):
        return self.verificationHash

    def get_permissions(self):
        return self.permissions

    def get_phone_number(self):
        return self.phone_number

    def get_city(self):
        return self.city

    def get_details(self):
        return self.details

    def get_key_expiration_date(self):
        return self.key_expiration_date

    def encode_avatar(self):
        with open(self.avatar, "rb") as image_file:
            encoded_avatar = str(base64.b64encode(image_file.read()))
        return encoded_avatar

    def get_book_info(self):
        testlist = []
        sql = text("""SELECT book_id FROM books B JOIN shelves S ON B.shelf_id = S.shelf_id 
        JOIN rooms R ON S.room_id = R.room_id
        JOIN users U ON R.owner_id = U.id WHERE U.id = """ + str(self.id))
        with engine.connect() as con:
            result = con.execute(sql)
            for row in result:
                testlist += row
                print (row)
        return testlist

    def get_room_info(self):
        testlist = []
        sql = text("""SELECT room_id FROM rooms R
        JOIN users U ON R.owner_id = U.id 
        WHERE U.id = """ + str(self.id))
        with engine.connect() as con:
            result = con.execute(sql)
            for row in result:
                testlist += row
        return testlist

    def get_shelf_info(self):
        testlist = []
        sql = text("""SELECT shelf_id FROM shelves S
        JOIN rooms R ON S.room_id = R.room_id
        JOIN users U ON R.owner_id = U.id WHERE U.id = """ + str(self.id))
        with engine.connect() as con:
            result = con.execute(sql)
            for row in result:
                testlist += row
        return testlist

    def get_user_rating(self):
        sql = text("""SELECT AVG(rating) FROM reviews r
        WHERE r.borrower_id = """ + str(self.id))
        with engine.connect() as con:
            result = con.execute(sql).scalar()
        return result

