from .db import db, environment, SCHEMA, add_prefix_for_prod
from .deck_match import deck_matches

class Deck(db.Model):
  __tablename__ = 'decks'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  format = db.Column(db.String(50), nullable=False)
  
  matches = db.relationship("Match", secondary=deck_matches, back_populates="decks")
  user = db.relationship("User", back_populates="decks")
  cards = db.relationship("DeckCard", back_populates="deck")

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'userId': self.user_id,
      'format': self.format,
      'cards': [card.to_dict() for card in self.cards]
    }