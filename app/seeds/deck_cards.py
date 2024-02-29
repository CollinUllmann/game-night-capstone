from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cards_for_deck(deck, cards):
  for card in cards:
    deck.cards.append(card)

def seed_deck_cards(decks, cards):
  seed_cards_for_deck(decks[0], [cards[0], cards[1], cards[2]])
  seed_cards_for_deck(decks[1], [cards[3], cards[4], cards[5]])

  db.session.commit()

def undo_deck_cards():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.deck_cards RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM deck_cards"))
        
  db.session.commit()