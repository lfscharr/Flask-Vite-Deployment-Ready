from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from config import db
from datetime import datetime
from flask_bcrypt import Bcrypt 
from sqlalchemy.ext.hybrid import hybrid_property
bcrypt = Bcrypt()


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    _password_hash = db.Column(db.String(255), nullable=False)
    # log = db.relationship('Log', backref=db.backref('users', lazy=True, cascade="all,delete"))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at= db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ('-workouts.user','-workouts.exercises', '-logs.user', '-logs.exercise')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))


    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 5:
            raise ValueError("Username must be at least two characters long")
        return username

    @validates('password')
    def validate_password(self, key, password):
        if len(password) < 5:
            raise ValueError("Password must be at least four characters long")
        return password

class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('workouts', lazy=True, cascade='all,delete'))

    serialize_rules = ('-user.workouts','-exrcises.workout')

class Exercise(db.Model, SerializerMixin):
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable=False)
    workout = db.relationship('Workout', backref=db.backref('exercises', lazy=True))
    logs = db.relationship('Log', backref='exercise', lazy=True)

    serialize_rules = ('-workout.exercises','-logs.exercises')

class Log(db.Model, SerializerMixin):
    __tablename__ = 'logs'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)
    exercise = db.relationship('Exercise', backref=db.backref('logs', lazy=True))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('logs', lazy=True))
    reps = db.Column(db.Integer)
    sets = db.Column(db.Integer)
    weight = db.Column(db.Float)

    serialize_rules = ('-user.logs', '-exercises.logs')