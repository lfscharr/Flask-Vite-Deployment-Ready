#!/usr/bin/env python3

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

@app.before_request
def check_if_logged_in():
    open_access_list = [
        'signup',
        'signin',
        'check_session'
    ]

    if (request.endpoint) not in open_access_list and (not session.get('user_id')):
        return {'error': '401 Unauthorized'}, 401

class UserResource(Resource):
    def get(self):
      users = User.query.all()
      return {'users': [user.serialize() for user in users]}, 200

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
        return {"message": "User created successfully", "user_id": username.id}, 201
    
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
        
class UserResourceById(Resource):
    def get(self, user_id):
        user_id = [u.to_dict() for u in User.query.all()]
        if user_id:
            return user_id, 200
        else:
            return {"message": "User not found"}, 404

    def post(self, user_id):
        data = request.get_json()
        username = data['username']
        password = data['password']

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return {"message": "Username already exists. Choose a different username."}, 400


        username = User(username=username, password=password)
        db.session.add(username)
        db.session.commit()
        return {"message": "User created successfully", "user_id": username.id}, 201
    
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


class CheckSession(Resource):

    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        
        return {}, 401
        

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']  
        print(data)
        user = User.query.filter(User.username==username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            return "Unauthorized", 401

class WorkoutResource(Resource):
    def get(self, workout_id):
        workout = Workout.query.get(workout_id)
        if workout:
            return workout.to_dict(), 200
        else:
            return {"message": "Workout not found"}, 404

    def post(self, workout_id):
        data = request.get_json()
        name = data['name']
        user_id = data['user_id']

        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404

        new_workout = Workout(name=name, user=user)
        db.session.add(new_workout)

        # Add new exercises and logs from data
        for exercise_data in data['exercises']:
            new_exercise = Exercise(name=exercise_data['name'], duration=exercise_data['duration'], workout=new_workout)
            db.session.add(new_exercise)

            for set_data in exercise_data['sets']:
                new_log = Log(
                    reps=set_data['reps'],
                    sets=set_data['sets'],
                    weight=set_data.get('weight'), 
                    exercise=new_exercise,
                    user=user
                )
                db.session.add(new_log)

        db.session.commit()

        return new_workout.to_dict(), 201

    def delete(self, workout_id):
        workout = Workout.query.get(workout_id)
        if workout:
            db.session.delete(workout)
            db.session.commit()
            return {'message': 'Workout deleted successfully'}, 200
        else:
            return {'message': 'Workout not found'}, 404

    def patch(self, workout_id):
        workout = Workout.query.get(workout_id)
        if workout:
            data = request.get_json()
            if 'name' in data:
                workout.name = data['name']

            db.session.commit()
            return {'message': 'Workout updated successfully'}, 200
        else:
            return {'message': 'Workout not found'}, 404


class ExerciseResource(Resource):
    def get(self, exercise_id):
        exercise = Exercise.query.get(exercise_id)
        if exercise:
            return exercise.to_dict(), 200
        else:
            return {"message": "Exercise not found"}, 404

    def post(self):
        data = request.get_json()
        name = data['name']
        duration = data['duration']
        # workout_id = data['workout_id']

        # workout = Workout.query.get(workout_id)
        # if not workout:
        #     return {"message": "Workout not found"}, 404

        # new_exercise = Exercise(name=name, duration=duration, workout=workout)
        new_exercise = Exercise(name=name, duration=duration)
        db.session.add(new_exercise)
        db.session.commit()

        return new_exercise.to_dict(), 201

    def delete(self, exercise_id):
        exercise = Exercise.query.get(exercise_id)
        if exercise:
            db.session.delete(exercise)
            db.session.commit()
            return {'message': 'Exercise deleted successfully'}, 200
        else:
            return {'message': 'Exercise not found'}, 404

    def patch(self, exercise_id):
        exercise = Exercise.query.get(exercise_id)
        if exercise:
            data = request.get_json()
            if 'name' in data:
                exercise.name = data['name']
            if 'duration' in data:
                exercise.duration = data['duration']

            db.session.commit()
            return {'message': 'Exercise updated successfully'}, 200
        else:
            return {'message': 'Exercise not found'}, 404


class LogResource(Resource):
    def get(self, log_id):
        log = Log.query.get(log_id)
        if log:
            return log.to_dict(), 200
        else:
            return {"message": "Log not found"}, 404

    def post(self):
        data = request.get_json()
        reps = data['reps']
        sets = data['sets']
        weight = data['weight']
        exercise_id = data['exercise_id']
        user_id = data['user_id']

        exercise = Exercise.query.get(exercise_id)
        user = User.query.get(user_id)

        if not exercise or not user:
            return {"message": "Exercise or User not found"}, 404

        new_log = Log(reps=reps, sets=sets, weight=weight, exercise=exercise, user=user)
        db.session.add(new_log)
        db.session.commit()

        return new_log.to_dict(), 201

    def delete(self, log_id):
        log = Log.query.get(log_id)
        if log:
            db.session.delete(log)
            db.session.commit()
            return {'message': 'Log deleted successfully'}, 200
        else:
            return {'message': 'Log not found'}, 404

    def patch(self, log_id):
        log = Log.query.get(log_id)
        if log:
            data = request.get_json()
            if 'reps' in data:
                log.reps = data['reps']
            if 'sets' in data:
                log.sets = data['sets']
            if 'weight' in data:
                log.weight = data['weight']

            db.session.commit()
            return {'message': 'Log updated successfully'}, 200
        else:
            return {'message': 'Log not found'}, 404
        
class UserLogs(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404

        # Get all logs for the user
        logs = user.logs
        return [log.to_dict() for log in logs], 200


class WorkoutLogs(Resource):
    def get(self, workout_id):
        workout = Workout.query.get(workout_id)
        if not workout:
            return {"message": "Workout not found"}, 404

        # Get all logs associated with the workout
        logs = workout.exercises.all()
        log_data = [exercise.to_dict() for exercise in logs]
        for exercise in log_data:
            exercise['logs'] = [log.to_dict() for log in exercise.logs]

        return log_data, 200


class ExerciseLogs(Resource):
    def get(self, exercise_id):
        exercise = Exercise.query.get(exercise_id)
        if not exercise:
            return {"message": "Exercise not found"}, 404

        # Get all logs associated with the exercise
        logs = exercise.logs
        return [log.to_dict() for log in logs], 200

        
# Define Routes

api.add_resource(UserResource, '/user') 
api.add_resource(UserResourceById, '/user/<int:user_id>')
api.add_resource(Users, '/signup', endpoint="signup")
api.add_resource(UserLogs, '/user/<int:user_id>/logs')
api.add_resource(Logout, '/logout', endpoint = "logout")   
api.add_resource(Login, '/signin', endpoint = "signin")
api.add_resource(WorkoutResource, '/workout/<int:workout_id>', '/workout')
api.add_resource(WorkoutLogs, '/workout/<int:workout_id>/logs')
api.add_resource(ExerciseResource, '/exercise/<int:exercise_id>', '/exercise', '/workout/<int:workout_id>/exercise')
api.add_resource(ExerciseLogs, '/exercise/<int:exercise_id>/logs')
api.add_resource(LogResource, '/log/<int:log_id>', '/log')
api.add_resource(CheckSession, '/check_session', endpoint = "check_session")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

if __name__ == '__main__':
    app.run(port=5000, debug=True)


