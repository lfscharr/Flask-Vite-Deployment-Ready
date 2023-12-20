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
    logs = db.relationship('Log', backref=db.backref('user', lazy=True, cascade="all,delete"))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at= db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ("-logs.user", "-logs")

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
    log_id = db.Column(db.Integer, db.ForeignKey("logs.id"))  
    exercises = db.relationship("Exercise", backref="exercise")

    serialize_rules = ("-exercises",)

class Exercise(db.Model, SerializerMixin):
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable=True)

class Log(db.Model, SerializerMixin):
    __tablename__ = 'logs'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    workouts = db.relationship("Workout", backref="workout_log")
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    reps = db.Column(db.Integer)
    sets = db.Column(db.Integer)
    weight = db.Column(db.Float)

    serialize_rules = ("-workouts", "-user.logs")