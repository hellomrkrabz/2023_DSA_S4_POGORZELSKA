from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy_utils import EmailType
import enum
import base64
from .room import Room
from .transaction import Transaction
from .review import Review

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
    #user_rating = db.Column(Review.get_average_rating(id))
    rooms = db.relationship('Room',
                               backref='owner',
                               lazy='dynamic',
                               cascade="all, delete")
    transactions = db.relationship('Transaction',
                               backref='borrower',
                               lazy='dynamic',
                               cascade="all, delete")
    reviews = db.relationship('Review',
                               backref='borrower',
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

    def encode_avatar(self):
        with open(self.avatar, "rb") as image_file:
            encoded_avatar = str(base64.b64encode(image_file.read()))
        return encoded_avatar