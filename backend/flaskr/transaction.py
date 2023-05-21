from flask import Flask, request
import psycopg2
from . import db
from datetime import datetime
import enum
from sqlalchemy import text, create_engine, ForeignKey

# class States(enum.Enum):
#     reservation = 1
#     accepted_reservation = 2
#     passed_down = 3
#     lent = 4
#     returned = 5
#     cancelled = 6
#     successfully_finished = 7
#     unsuccessfully_finished = 8

engine = create_engine("postgresql://banana_books_user:p5KDYaDuvdp5rwHoVyO9bkH2uXkSedzB@dpg-cgljb682qv24jlvodv40-a.frankfurt-postgres.render.com/banana_books")

class StatesForTransactions(enum.Enum):
    reservation = 1
    accepted_reservation = 2
    passed_down = 3
    lent = 4
    returned = 5
    cancelled = 6
    successfully_finished = 7
    unsuccessfully_finished = 8

class Transaction(db.Model):
    __tablename__ = 'transactions'
    transaction_id = db.Column(db.Integer, primary_key=True)
    reservation_date = db.Column(db.DateTime, default=datetime.date)
    rent_date = db.Column(db.DateTime, default=datetime.date)
    return_date = db.Column(db.DateTime, default=datetime.date)
    state = db.Column(db.Enum(StatesForTransactions))
    book_id = db.Column(db.Integer, db.ForeignKey('shelves.shelf_id'))
    borrower_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def get_id(self):
        return self.transaction_id

    def get_reservation_date(self):
        return self.reservation_date

    def get_rent_date(self):
        return self.rent_date

    def get_return_date(self):
        return self.return_date

    def get_state(self):
        return self.state

    def get_book_id(self):
        return self.book_id

    def get_borrower_id(self):
        return self.borrower_id

    def get_borrower_username(self):
        sql = text("""SELECT username FROM users u
        WHERE u.id = """ + str(self.borrower_id))
        with engine.connect() as con:
            result = con.execute(sql).scalar()
        return result