from flask import Flask, request
import psycopg2
from . import db

class Review(db.Model):
    __tablename__ = 'reviews'
    review_id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    visible = db.Column(db.Boolean)
    content = db.Column(db.String(500))
    borrower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    renter_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    reported = db.Column(db.Boolean)
    borrower = db.relationship('User',
                              foreign_keys=[borrower_id])
    renter = db.relationship('User',
                              foreign_keys=[renter_id])

    def get_review_id(self):
        return self.review_id

    def get_rating(self):
        return self.rating

    def get_visibility(self):
        return self.visible

    def get_content(self):
        return self.content

    def get_reported(self):
        return self.reported

#    def get_average_rating(user_id):
   #     number_of_reviews = 0
    #    rating = 0
     #   average_rating = 0

      #  for r in Review.review_id:
       #     if user_id == r.borrower_id or user_id == r.renter_id:
        #        number_of_reviews += 1
         #       rating += r.rating
       # average_rating = rating/number_of_reviews
       # return average_rating




