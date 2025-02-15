#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from app import app
from datetime import datetime
from config import db
from models import db, User, Workout, Exercise, Log



def seed_data():
    print("deleting tables")
    Exercise.query.delete()
    Workout.query.delete()
    Log.query.delete()
    User.query.delete()
    # Create sample users
    user1 = User(username='user1', password='password1')
    user2 = User(username='user2', password='password2')
    user3 = User(username='user3', password='password3')

    db.session.add_all([user1, user2])
    db.session.commit()

    # Create sample workouts
    workout1 = Workout(name='Workout 1', date=datetime.utcnow())
    workout2 = Workout(name='Workout 2', date=datetime.utcnow())

    db.session.add_all([workout1, workout2])
    db.session.commit()

    # Create sample exercises
    exercise1 = Exercise(name='Exercise 1', duration=30, workout_id=workout1.id, reps=10, sets=3, weight=50)
    exercise2 = Exercise(name='Exercise 2', duration=45, workout_id=workout2.id,  reps=8, sets=4, weight=60.0)

    db.session.add_all([exercise1, exercise2])
    db.session.commit()

    # Create sample logs
    log1 = Log(date=datetime.utcnow(), user_id= user1.id, workouts = [workout1])
    log2 = Log(date=datetime.utcnow(), user_id=user2.id, workouts=[workout2])

    db.session.add_all([log1, log2])
    db.session.commit()




if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        seed_data()
        print("Seeding Complete!")
        # Seed code goes here!