from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_events():
    events = [
        Event(
            name="Saturday Night Gamin",
            date=date(2024, 12, 4),
            format="Commander"
        ),
        Event(
            name="Friday Webcam Games",
            date=date(2024, 12, 10),
            format="Commander"
        )
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
