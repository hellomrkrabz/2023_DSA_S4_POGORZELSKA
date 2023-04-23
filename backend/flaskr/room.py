from flask import Flask, request
import psycopg2
from . import db
from .shelf import Shelf
from .review import Review

class Room(db.Model):
    __tablename__ = 'rooms'
    room_id = db.Column(db.Integer, primary_key=True)
    room_name = db.Column(db.String(15))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    shelves = db.relationship('Shelf',
                               backref='room',
                               lazy='dynamic',
                               cascade="all, delete")
    reviews = db.relationship('Review',
                               backref='renter',
                               lazy='dynamic',
                               cascade="all, delete")

    def get_room_id(self):
        return self.room_id

    def get_room_name(self):
        return self.room_name

    def get_owner_id(self):
        return self.owner_id
