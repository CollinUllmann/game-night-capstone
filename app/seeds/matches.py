from app.models import db, Match, environment, SCHEMA
from sqlalchemy.sql import text

def seed_matches():
    matches = [
        Match(
            event_id=1,
            user_id_winner=1
        ),
        Match(
            event_id=1,
            user_id_winner=9
        ),
        Match(
            event_id=1,
            user_id_winner=8
        ),
        Match(
            event_id=1,
            user_id_winner=7
        ),
        Match(
            event_id=2,
            user_id_winner=9
        ),
        Match(
            event_id=2,
            user_id_winner=9
        ),
        Match(
            event_id=2,
            user_id_winner=1
        ),
        Match(
            event_id=2,
            user_id_winner=8
        ),
        Match(
            event_id=2,
            user_id_winner=7
        ),
        Match(
            event_id=2,
            user_id_winner=9
        ),
        Match(
            event_id=2,
            user_id_winner=1
        ),
        Match(
            event_id=3,
            user_id_winner=1
        ),
        Match(
            event_id=3,
            user_id_winner=1
        ),
        Match(
            event_id=3,
            user_id_winner=1
        ),
        Match(
            event_id=3,
            user_id_winner=5
        ),
        Match(
            event_id=3,
            user_id_winner=6
        ),
        Match(
            event_id=3,
            user_id_winner=1
        ),
        Match(
            event_id=3,
            user_id_winner=1
        ),
        Match(
            event_id=3,
            user_id_winner=1
        ),
        Match(
            event_id=3,
            user_id_winner=5
        ),
        Match(
            event_id=3,
            user_id_winner=6
        ),
    ]
    for match in matches:
      db.session.add(match)
    db.session.commit()
    return matches





def undo_matches():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.matches RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM matches"))
        
    db.session.commit()
