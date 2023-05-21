from flask import Flask, request
import psycopg2
from . import db
from datetime import datetime

class Report(db.Model):
    __tablename__ = 'reports'
    report_id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500))
    report_date = db.Column(db.DateTime, default=datetime.date)
    opinion_id = db.Column(db.Integer, db.ForeignKey('reviews.review_id'))
    reporter_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    reported_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.Boolean)
    opinion = db.relationship('Review',
                              foreign_keys=[opinion_id])
    reporter = db.relationship('User',
                              foreign_keys=[reporter_id])
    reported = db.relationship('User',
                              foreign_keys=[reported_id])
    def get_report_id(self):
        return self.report_id

    def get_report_date(self):
        return self.report_date

    def get_opinion_id(self):
        return self.opinion_id

    def get_content(self):
        return self.content

    def get_status(self):
        return self.status

    def get_repoter_id(self):
        return self.reporter_id
