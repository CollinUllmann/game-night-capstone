from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cards():
  cards = [
    Card(
      image_url='https://cards.scryfall.io/large/front/c/c/ccee0b4c-0cb0-4c0f-8ddc-bc74b8b97273.jpg',
      name = 'Lightning Bolt',
      mana_cost = '{R}',
      cmc = 1,
      type_line = 'Instant',
      colors = 'R',
      color_identity = 'R',
      rarity = 'C'
    ),
    Card(
      image_url='https://cards.scryfall.io/large/front/3/d/3d69a3e0-6a2e-475a-964e-0affed1c017d.jpg',
      name = 'Birds of Paradise',
      mana_cost = '{G}',
      cmc = 1,
      type_line = 'Creature — Bird',
      colors = 'G',
      color_identity = 'G',
      rarity = 'R',
      power = 0,
      toughness = 1
    ),
    Card(
      image_url='https://cards.scryfall.io/large/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.jpg',
      name = 'Dark Ritual',
      mana_cost = '{B}',
      cmc = 1,
      type_line = 'Instant',
      colors = 'G',
      color_identity = 'G',
      rarity = 'R'
    ),
    Card(
      image_url='https://cards.scryfall.io/large/front/2/d/2dd41293-d7c8-4422-9f0c-b3e96350f5c9.jpg',
      name = 'Ancestral Recall',
      mana_cost = '{U}',
      cmc = 1,
      type_line = 'Instant',
      colors = 'U',
      color_identity = 'U',
      rarity = 'R'
    ),
    Card(
      image_url='https://cards.scryfall.io/large/front/0/8/08c59dfa-361d-4ff1-a15d-6b0cb66571a3.jpg',
      name = 'Path to Exile',
      mana_cost = '{W}',
      cmc = 1,
      type_line = 'Instant',
      colors = 'W',
      color_identity = 'W',
      rarity = 'U'
    ),
    Card(
      image_url='https://cards.scryfall.io/large/front/9/5/95e5828a-3e54-4b9c-9e84-21880930f2d5.jpg',
      name = 'Watchwolf',
      mana_cost = '{G}{W}',
      cmc = 2,
      type_line = 'Creature — Wolf',
      colors = 'GW',
      color_identity = 'GW',
      rarity = 'U',
      power = 3,
      toughness = 3
    ),
    Card(
      image_url='https://cards.scryfall.io/large/front/9/5/95315204-a5f7-4d20-bda3-957029da29fe.jpg',
      name = 'Mountain',
      mana_cost = '',
      cmc = 0,
      type_line = 'Basic Land — Mountain',
      colors = '',
      color_identity = 'R',
      rarity = 'C'
    ),
    Card(
      image_url='https://cards.scryfall.io/large/front/4/5/4520cdcc-a10f-4b39-9c6f-ba86f6aa2c87.jpg',
      name = 'Zada, Hedron Grinder',
      mana_cost = '{3}{R}',
      cmc = 4,
      type_line = 'Legendary Creature — Goblin Ally',
      colors = 'R',
      color_identity = 'R',
      rarity = 'U'
    )
  ]
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
