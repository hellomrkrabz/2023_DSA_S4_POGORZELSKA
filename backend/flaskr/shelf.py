from flask import Flask, request
import psycopg2
from . import db
from .book import Book

class Shelf(db.Model):
    __tablename__ = 'shelves'
    shelf_id = db.Column(db.Integer, primary_key=True)
    shelf_name = db.Column(db.String(15))
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.room_id'))
    books = db.relationship('Book',
                               backref='shelf',
                               lazy='dynamic',
                               cascade="all, delete")

    def get_shelf_id(self):
        return self.shelf_id

    def get_shelf_name(self):
        return self.shelf_name

    def get_room_id(self):
        return self.room_id