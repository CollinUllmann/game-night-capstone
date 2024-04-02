from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_events():
    events = [
        Event(
            name="Kitchen Table Commander",
            date=date(2023, 12, 4),
            format="Commander"
        ),
        Event(
            name="Webcam Commander",
            date=date(2023, 12, 15),
            format="Commander"
        ),
        Event(
            name="Friday Night Magic",
            date=date(2024, 1, 6),
            format="Modern"
        ),
        Event(
            name="PTQ Antarctica",
            date=date(2023, 2, 11),
            format="Legacy"
        ),
    ]
    for event in events:
      db.session.add(event)
    db.session.commit()
    return events





def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))
        
    db.session.commit()
