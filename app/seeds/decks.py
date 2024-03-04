from app.models import db, Deck, environment, SCHEMA
from sqlalchemy.sql import text

def seed_decks():
    decks = [
        Deck(
            name='Deck1',
            user_id=1,
            format='Modern'
        ),
        Deck(
            name='Deck2',
            user_id=2,
            format='Legacy'
        ),
        Deck(
            name='Deck3',
            user_id=3,
            format='Commander'
        ),
        Deck(
            name='Deck4',
            user_id=4,
            format='Commander'
        )
    ]
    for deck in decks:
      db.session.add(deck)
    db.session.commit()
    return decks





def undo_decks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.decks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM decks"))
        
    db.session.commit()
