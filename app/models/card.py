from .db import db, environment, SCHEMA, add_prefix_for_prod
from .deck_card import deck_cards

class Card(db.Model):
  __tablename__ = 'cards'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  image_url = db.Column(db.String, nullable=False)
  name = db.Column(db.String, nullable=False)
  mana_cost = db.Column(db.String, nullable=False)
  cmc = db.Column(db.Integer, nullable=False)
  type_line = db.Column(db.String, nullable=False)
  colors = db.Column(db.String, nullable=False)
  color_identity = db.Column(db.String, nullable=False)
  rarity = db.Column(db.String, nullable=False)
  power = db.Column(db.String)
  toughness = db.Column(db.String)

  decks = db.relationship("Deck", secondary=deck_cards, back_populates="cards")

  def to_dict(self):
    return {
      'id': self.id,
      'imageUrl': self.image_url,
      'name': self.name,
      'manaCost': self.mana_cost,
      'cmc': self.cmc,
      'typeLine': self.type_line,
      'colors': self.colors,
      'colorIdentity': self.color_identity,
      'rarity': self.rarity,
      'power': self.power,
      'toughness': self.toughness
    }