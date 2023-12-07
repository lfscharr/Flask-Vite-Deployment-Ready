#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, render_template, make_response, jsonify, session
from flask_restful import Resource, Api
from flask_migrate import Migrate
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.exceptions import NotFound
from flask_bcrypt import Bcrypt
from config import app, db, api
from models import User, Workout, Exercise, Log
api = Api(app)
CORS(app)


app.secret_key = b'\x196Nz\x9e8\xcb\x11G\xa1\x87\x16a\xe9L\xad'

# @app.route('/')
# def index():
#     return '<h1>Phase 4 Project Server</h1>'

# Views go here! use either route!
# @app.errorhandler(404)
# def not_found(e):
#     return render_template("index.html")

class UserResource(Resource):
    def get(self):
        user = [u.to_dict() for u in User.query.all()]
        if user:
            return user, 200
        else:
            return {"message": "User not found"}, 404

    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        # Check if the username already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return {"message": "Username already exists. Choose a different username."}, 400


        username = User(username=username, password=password)
        db.session.add(username)
        db.session.commit()
        return {"message": "User created successfully", "user_id": user.id}, 201
    
    def delete(self, user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User deleted successfully'}, 200
        else:
            return {'message': 'User not found'}, 404

    def patch(self, user_id):
        user = User.query.get(user_id)
        if user:
            data = request.get_json()
            if 'username' in data:
                user.username = data['username']
            if 'password' in data:
                user.password = data['password']

            db.session.commit()
            return {'message': 'User updated successfully'}, 200
        else:
            return {'message': 'User not found'}, 404
        
class Users(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(
            username = data['username'],
            password = data['password']
        )
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        print(session['user_id'])
        return new_user.to_dict(), 201
    
        
class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
        return {}, 204

@app.before_request
def check_session():
    if session.get('user_id') is None:
        session['user_id'] = None
        print(session['user_id'])
    else:
        print('There is a session')
        print(session['user_id'])

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']  
        user = user.query.filter_by(username=username).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            return "Unauthorized", 401
        


# Define Routes

api.add_resource(UserResource, '/user', '/user/<int:user_id>') 
api.add_resource(Users, '/signup')
api.add_resource(Logout, '/logout')   
api.add_resource(Login, '/signin')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

