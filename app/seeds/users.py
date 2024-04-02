from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    stu = User(
        username='Stu', email='stu@email.com', password='password')
    dynamite = User(
        username='Dynamite', email='dynamite@email.com', password='password')
    bassim = User(
        username='Bassim', email='bassim@email.com', password='password')
    pearlman = User(
        username='Pearlman', email='pearlman@email.com', password='password')
    lax = User(
        username='Lax', email='lax@email.com', password='password')
    tim = User(
        username='Tim', email='tim@email.com', password='password')
    johnny = User(
        username='Johnny', email='johnny@email.com', password='password')
    spike = User(
        username='Spike', email='spike@email.com', password='password')

    db.session.add(demo)
    db.session.add(stu)
    db.session.add(dynamite)
    db.session.add(bassim)
    db.session.add(pearlman)
    db.session.add(lax)
    db.session.add(tim)
    db.session.add(johnny)
    db.session.add(spike)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
