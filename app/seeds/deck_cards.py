from app.models import db, environment, SCHEMA, DeckCard
from sqlalchemy.sql import text


def seed_deck_cards():
  deck_cards = [
    DeckCard(
      deck_id = 1,
      card_id = 1,
      count = 2
    ),
    DeckCard(
      deck_id = 1,
      card_id = 2,
      count = 4
    ),
    DeckCard(
      deck_id = 2,
      card_id = 3,
      count = 2
    ),
    DeckCard(
      deck_id = 2,
      card_id = 4,
      count = 4
    )
  ]

  for deck_card in deck_cards:
    db.session.add(deck_card)
  db.session.commit()
  return deck_cards

def undo_deck_cards():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.deck_cards RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM deck_cards"))
        
  db.session.commit()