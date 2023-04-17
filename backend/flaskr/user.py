from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy_utils import EmailType

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(EmailType, unique=True, index=True)
    password = db.Column(db.String(128))
    avatar = db.Column(db.String(128))
    username = db.Column(db.String(20))
    verifiedAccount = db.Column(db.Boolean, default=False)
    verificationHash = db.Column(db.String(128))
    key = db.Column(db.String(128))

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
        return self.verifiedAccount

    def get_username(self):
        return self.username

    def get_key(self):
        return self.key
    
    def get_verification_hash(self):
        return self.verificationHash