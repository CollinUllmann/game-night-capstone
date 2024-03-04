from app.models import db, environment, SCHEMA, DeckCard, Match, Deck
from sqlalchemy.sql import text



def seed_deck_matches():
  deckIds = [1, 2]

  matches = Match.query.all()
  decks = Deck.query.filter(Deck.id.in_(deckIds)).all()

  # Am I able to pass just the id, or do I have to pass the full object for the sake of the db relationship?
  for match in matches:
    for deck in decks:
      match.decks.append(deck)
  db.session.commit()
  return 

def undo_deck_matches():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.deck_matches RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM deck_matches"))
        
  db.session.commit()