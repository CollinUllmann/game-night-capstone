from app.models import db, environment, SCHEMA, DeckCard
from sqlalchemy.sql import text


def seed_deck_cards():
  deck_cards = [
  DeckCard(
    deck_id = 1,
    card_id = 1,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 2,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 3,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 4,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 5,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 6,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 7,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 8,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 9,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 10,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 11,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 12,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 13,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 14,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 15,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 16,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 17,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 18,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 19,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 20,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 21,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 22,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 23,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 24,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 25,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 26,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 27,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 28,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 29,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 30,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 31,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 32,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 33,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 34,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 35,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 36,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 37,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 38,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 39,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 40,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 41,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 42,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 43,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 44,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 45,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 46,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 47,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 48,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 49,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 50,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 51,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 52,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 53,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 54,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 55,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 56,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 57,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 58,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 59,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 60,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 61,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 62,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 63,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 64,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 65,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 66,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 67,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 68,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 69,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 70,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 71,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 72,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 73,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 74,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 75,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 76,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 77,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 78,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 79,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 80,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 81,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 82,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 83,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 84,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 85,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 86,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 87,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 88,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 89,
    count = 1
  ),
  DeckCard(
    deck_id = 1,
    card_id = 90,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 91,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 92,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 93,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 94,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 95,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 96,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 97,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 98,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 99,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 100,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 101,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 102,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 103,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 104,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 105,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 106,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 107,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 108,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 109,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 110,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 111,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 112,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 113,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 114,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 115,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 116,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 117,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 118,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 119,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 120,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 121,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 122,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 123,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 124,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 125,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 126,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 127,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 128,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 129,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 130,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 131,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 132,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 133,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 134,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 135,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 136,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 137,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 138,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 139,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 140,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 141,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 142,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 143,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 144,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 145,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 146,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 147,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 148,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 149,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 150,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 151,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 152,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 153,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 154,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 155,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 156,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 157,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 158,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 159,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 160,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 161,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 162,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 163,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 164,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 165,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 166,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 167,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 168,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 169,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 170,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 171,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 172,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 173,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 174,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 175,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 176,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 177,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 178,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 179,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 180,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 181,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 182,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 183,
    count = 1
  ),
  DeckCard(
    deck_id = 2,
    card_id = 184,
    count = 1
  ),
  DeckCard(
    deck_id = 3,
    card_id = 184,
    count = 1
  ),
  DeckCard(
    deck_id = 3,
    card_id = 150,
    count = 1
  ),
  DeckCard(
    deck_id = 3,
    card_id = 162,
    count = 1
  ),
  DeckCard(
    deck_id = 3,
    card_id = 141,
    count = 1
  ),
  DeckCard(
    deck_id = 3,
    card_id = 175,
    count = 1
  ),
  DeckCard(
    deck_id = 4,
    card_id = 75,
    count = 1
  ),
  DeckCard(
    deck_id = 4,
    card_id = 90,
    count = 1
  ),
  DeckCard(
    deck_id = 4,
    card_id = 4,
    count = 1
  ),
  DeckCard(
    deck_id = 4,
    card_id = 87,
    count = 1
  ),
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