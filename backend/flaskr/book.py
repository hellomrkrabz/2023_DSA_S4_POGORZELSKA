from flask import Flask, request
import psycopg2
from . import db
import enum

class States(enum.Enum):
    mint = 1
    near_mint = 2
    very_good = 3
    good = 4
    fair = 5
    poor = 6

class Owned_Book(db.Model):
    __tablename__ = 'books'
    book_id = db.Column(db.Integer, primary_key=True)
    google_book_id = db.Column(db.String(15))
    book_state = db.Column(db.Enum(States))
    rentable = db.Column(db.Boolean)
    shelf_id = db.Column(db.Integer, db.ForeignKey('shelves.shelf_id'))


    def get_book_id(self):
        return self.book_id

    def get_google_book_id(self):
        return self.google_book_id

    def get_book_state(self):
        return self.book_state

    def get_rentable(self):
        return self.rentable

    def get_shelf_id(self):
        return self.shelf_id

class Wanted_Book(db.Model):
    __tablename__ = 'wanted_books'
    book_id = db.Column(db.Integer, primary_key=True)
    google_book_id = db.Column(db.String(15))


    def get_book_id(self):
        return self.book_id

    def get_google_book_id(self):
        return self.google_book_id
