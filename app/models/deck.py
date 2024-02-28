from .db import db, environment, SCHEMA, add_prefix_for_prod
from models import user_deck_matches


class Deck(db.Model):
  __tablename__ = 'decks'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')))
  format = db.Column(db.String(50), nullable=False)
  
  matches = db.relationship("Match", secondary=user_deck_matches, backref=db.backref("decks"))
  

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'userId': self.user_id,
      'format': self.format
    }