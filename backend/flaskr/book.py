from flask import Flask, request
import psycopg2
from . import db

class Book(db.Model):
    __tablename__ = 'books'
    book_id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.Text)
    title = db.Column(db.Text)

    def get_book_id(self):
        return self.book_id

    def get_author(self):
        return self.author

    def get_title(self):
        return self.title