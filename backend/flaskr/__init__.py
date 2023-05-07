from flask import Flask, request, Blueprint, jsonify
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from flask_cors import CORS
from .config import config
import os

db = SQLAlchemy()
mail = Mail()

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_object(config['development'])
    config['development'].init_app(app)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import user_validation
    app.register_blueprint(user_validation.bp)

    from . import api
    app.register_blueprint(api.bp)

    from . import profile
    app.register_blueprint(profile.bp)

    from . import account_verification
    app.register_blueprint(account_verification.bp)




    db.init_app(app)

    from .book import Owned_Book
    from .user import User

    # create database tables
    with app.app_context():
        #db.drop_all()
        db.create_all()

    #initialize email sender
    app.config['MAIL_SERVER']='smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_DEFAULT_SENDER'] = 'banana.books.exchange@gmail.com'
    app.config['MAIL_USERNAME'] = 'banana.books.exchange@gmail.com'
    app.config['MAIL_PASSWORD'] = 'wfvqdpjysvtdfqvt'
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False

    mail = Mail(app)

    return app

