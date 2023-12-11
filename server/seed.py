#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from app import app
from datetime import datetime
from config import db
from models import db, User, Workout, Exercise, Log



def seed_data():
    print("deleting tables")
    Log.query.delete()
    Exercise.query.delete()
    Workout.query.delete()
    User.query.delete()
    # Create sample users
    user1 = User(username='user1', password='password1')
    user2 = User(username='user2', password='password2')

    db.session.add_all([user1, user2])
    db.session.commit()

    # Create sample workouts
    workout1 = Workout(name='Workout 1', date=datetime.utcnow(), user_id=user1.id)
    workout2 = Workout(name='Workout 2', date=datetime.utcnow(), user_id=user2.id)

    db.session.add_all([workout1, workout2])
    db.session.commit()

    # Create sample exercises
    exercise1 = Exercise(name='Exercise 1', duration=30, workout_id=workout1.id)
    exercise2 = Exercise(name='Exercise 2', duration=45, workout_id=workout2.id)

    db.session.add_all([exercise1, exercise2])
    db.session.commit()

    # Create sample logs
    log1 = Log(date=datetime.utcnow(), exercise_id=exercise1.id, user_id=user1.id, reps=10, sets=3, weight=50.0)
    log2 = Log(date=datetime.utcnow(), exercise_id=exercise2.id, user_id=user2.id, reps=8, sets=4, weight=60.0)

    db.session.add_all([log1, log2])
    db.session.commit()




if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        seed_data()
        print("Seeding Complete!")
        # Seed code goes here!