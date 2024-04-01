from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
import json
from app.models import Card

def load_oracle_cards():
  cards = []
  with open('app/seeds/card_seeder.json') as card_seeder_file:
    card_seeder_file_contents = card_seeder_file.read()
    card_seeder_file_json = json.loads(card_seeder_file_contents)

    for card_seeder_card in card_seeder_file_json:
      card = Card(
        image_url = card_seeder_card['image_url'],
        name = card_seeder_card['name'],
        mana_cost = card_seeder_card['mana_cost'],
        cmc = card_seeder_card['cmc'],
        type_line = card_seeder_card['type_line'],
        colors = card_seeder_card['colors'],
        color_identity = card_seeder_card['color_identity'],
        rarity = card_seeder_card['rarity'],
        power = card_seeder_card['power'],
        toughness = card_seeder_card['toughness'],
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
