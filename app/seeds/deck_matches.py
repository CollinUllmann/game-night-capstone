from app.models import db, environment, SCHEMA, DeckCard, Match, Deck
from sqlalchemy.sql import text



def seed_deck_matches():
  deckIds = [1, 2, 3, 4]

  matches = Match.query.all()
  decks = Deck.query.all()

  # Am I able to pass just the id, or do I have to pass the full object for the sake of the db relationship?
  matches[0].decks.append(decks[1])
  matches[0].decks.append(decks[17])
  matches[0].decks.append(decks[18])
  matches[0].decks.append(decks[19])

  matches[1].decks.append(decks[0])
  matches[1].decks.append(decks[17])
  matches[1].decks.append(decks[18])
  matches[1].decks.append(decks[19])

  matches[2].decks.append(decks[1])
  matches[2].decks.append(decks[17])
  matches[2].decks.append(decks[18])
  matches[2].decks.append(decks[19])

  matches[3].decks.append(decks[2])
  matches[3].decks.append(decks[17])
  matches[3].decks.append(decks[18])
  matches[3].decks.append(decks[19])

  matches[4].decks.append(decks[2])
  matches[4].decks.append(decks[17])
  matches[4].decks.append(decks[18])
  matches[4].decks.append(decks[19])
  
  matches[5].decks.append(decks[1])
  matches[5].decks.append(decks[17])
  matches[5].decks.append(decks[18])
  matches[5].decks.append(decks[19])

  matches[6].decks.append(decks[2])
  matches[6].decks.append(decks[17])
  matches[6].decks.append(decks[18])
  matches[6].decks.append(decks[19])

  matches[7].decks.append(decks[1])
  matches[7].decks.append(decks[17])
  matches[7].decks.append(decks[18])
  matches[7].decks.append(decks[19])

  matches[8].decks.append(decks[0])
  matches[8].decks.append(decks[17])
  matches[8].decks.append(decks[18])
  matches[8].decks.append(decks[19])

  matches[9].decks.append(decks[3])
  matches[9].decks.append(decks[17])
  matches[9].decks.append(decks[18])
  matches[9].decks.append(decks[19])

  matches[10].decks.append(decks[3])
  matches[10].decks.append(decks[7])

  matches[11].decks.append(decks[3])
  matches[11].decks.append(decks[9])

  matches[12].decks.append(decks[3])
  matches[12].decks.append(decks[11])

  matches[13].decks.append(decks[3])
  matches[13].decks.append(decks[13])

  matches[14].decks.append(decks[3])
  matches[14].decks.append(decks[15])

  matches[15].decks.append(decks[3])
  matches[15].decks.append(decks[7])

  matches[16].decks.append(decks[3])
  matches[16].decks.append(decks[9])

  matches[17].decks.append(decks[3])
  matches[17].decks.append(decks[11])

  matches[18].decks.append(decks[3])
  matches[18].decks.append(decks[13])

  matches[19].decks.append(decks[3])
  matches[19].decks.append(decks[15])

  # for match in matches:
  #   for deck in decks:
  #     match.decks.append(deck)
  db.session.commit()
  return 

def undo_deck_matches():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.deck_matches RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM deck_matches"))
        
  db.session.commit()