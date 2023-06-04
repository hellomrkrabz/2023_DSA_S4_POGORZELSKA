from flask import Flask, request
import psycopg2
from . import db
import enum
import base64
import json
from .transaction import Transaction

class States(enum.Enum):
    mint = 1
    near_mint = 2
    very_good = 3
    good = 4
    fair = 5
    poor = 6

class Book(db.Model):
    __tablename__ = 'books'
    book_id = db.Column(db.Integer, primary_key=True)
    google_book_id = db.Column(db.String(30))
    isbn = db.Column(db.String(15))
    title = db.Column(db.String(120))
    author = db.Column(db.String(120))
    cover_photo = db.Column(db.String(300))
    wanted_books = db.relationship('Wanted_Book',
                            backref='foreign_book',
                            lazy='dynamic',
                            cascade="all, delete")
    owned_books = db.relationship('Owned_Book',
                            backref='book',
                            lazy='dynamic',
                            cascade="all, delete")

    def get_id(self):
        return self.book_id

    def get_google_book_id(self):
        return self.google_book_id

    def get_isbn(self):
        return self.isbn

    def get_title(self):
        return self.title

    def get_author(self):
        return self.author

    def get_cover_photo(self):
        return self.cover_photo

class Owned_Book(db.Model):
    __tablename__ = 'owned_books'
    owned_book_id = db.Column(db.Integer, primary_key=True)
    book_state = db.Column(db.Enum(States))
    rentable = db.Column(db.Boolean)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    shelf_id = db.Column(db.Integer, db.ForeignKey('shelves.shelf_id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.book_id'))
    transactions = db.relationship('Transaction',
                            backref='transaction',
                            lazy='dynamic',
                            cascade="all, delete")



    def get_id(self):
        return self.owned_book_id

    def get_book_state(self):
        return self.book_state.value

    def get_rentable(self):
        return self.rentable

    def get_shelf_id(self):
        return self.shelf_id

    def get_owner_id(self):
        return self.owner_id

    def get_book_id(self):
        return self.book_id

class Wanted_Book(db.Model):
    __tablename__ = 'wanted_books'
    wanted_book_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    foreign_book_id = db.Column(db.Integer, db.ForeignKey('books.book_id'))


    def get_id(self):
        return self.wanted_book_id

    def get_user_id(self):
        return self.user_id

    def get_foreign_book_id(self):
        return self.foreign_book_id
