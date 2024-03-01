from .db import db, environment, SCHEMA, add_prefix_for_prod

class DeckCard(db.Model):
  __tablename__ = 'deck_cards'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  deck_id = db.Column("deck_id", db.Integer, db.ForeignKey(add_prefix_for_prod('decks.id')), primary_key=True),
  card_id = db.Column("card_id", db.Integer, db.ForeignKey(add_prefix_for_prod('cards.id')), primary_key=True)
  count = db.Column("count", db.Integer, nullable=False)

  deck = db.relationship("Deck", back_populates="cards")
  card = db.relationship("Card", back_populates="decks")

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'userId': self.user_id,
      'format': self.format,
      'cards': [card.to_dict() for card in self.cards]
    }