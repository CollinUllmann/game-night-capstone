from .db import db, environment, SCHEMA, add_prefix_for_prod
from models.deck_match import deck_matches
from .deck_card import deck_cards

class Deck(db.Model):
  __tablename__ = 'decks'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')))
  format = db.Column(db.String(50), nullable=False)
  
  matches = db.relationship("Match", secondary=deck_matches, back_populates=("decks"))
  user = db.relationship("User", back_populates="decks")
  cards = db.relationship("Card", secondary=deck_cards, back_populates=("decks"))

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'userId': self.user_id,
      'format': self.format
    }