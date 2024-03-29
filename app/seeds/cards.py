from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
import json
from app.models import Card

def load_oracle_cards():
  cards = []
  with open('app/seeds/oracle-cards-20240226100154.json') as oracle_cards_file:
    oracle_cards_file_contents = oracle_cards_file.read()
    oracle_cards_file_json = json.loads(oracle_cards_file_contents)

    for oracle_card in oracle_cards_file_json:

      card_face = oracle_card
      if 'card_faces' in oracle_card.keys() and oracle_card['card_faces'][0] is not None:
        card_face = oracle_card['card_faces'][0]

      card_face_keys = card_face.keys()

      image_url = ''
      if 'image_uris' in card_face_keys and 'large' in card_face['image_uris']:
        image_url = card_face['image_uris']['large']

      type_line = ''
      if 'type_line' in card_face_keys:
        type_line = card_face['type_line']

      colors = ''
      if 'colors' in card_face_keys:
        colors = ''.join(card_face['colors'])

      mana_cost = ''
      if 'mana_cost' in card_face_keys:
        mana_cost = card_face['mana_cost']

      power = ''
      if 'power' in card_face_keys:
        power = card_face['power']

      toughness = ''
      if 'toughness' in card_face_keys:
        toughness = card_face['toughness']

      card = Card(
        image_url = image_url,
        name = card_face['name'],
        mana_cost = mana_cost,
        cmc = oracle_card['cmc'],
        type_line = type_line,
        colors = colors,
        color_identity = ''.join(oracle_card['color_identity']),
        rarity = oracle_card['rarity'],
        power = power,
        toughness = toughness
      )
      
      cards.append(card)

  return cards

def seed_cards():
  cards = load_oracle_cards()
  for card in cards:
    db.session.add(card)
  db.session.commit()
  return cards

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))
        
    db.session.commit()
