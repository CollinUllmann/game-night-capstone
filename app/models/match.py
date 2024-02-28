from .db import db, environment, SCHEMA, add_prefix_for_prod
from models import deck_matches


class Match(db.Model):
  __tablename__ = 'matches'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('event.id')), nullable=False)
  user_id_winner = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)

  winning_user = db.relationship("User", back_populates="won_matches")
  decks = db.relationship("Deck", secondary=deck_matches, back_populates=("matches"))
  event = db.relationship("Event", back_populates=("matches"))
  
  def to_dict(self):
    return {
      'id': self.id,
      'eventId': self.event_id,
      'userIdWinner': self.user_id_winner
    }
  

  


