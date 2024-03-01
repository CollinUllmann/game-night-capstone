from .db import db, environment, SCHEMA, add_prefix_for_prod


# deck_cards = db.Table(

#   'deck_cards',
#   db.Model.metadata,

#   db.Column("deck_id", db.Integer, db.ForeignKey(add_prefix_for_prod('decks.id')), primary_key=True),
#   db.Column("card_id", db.Integer, db.ForeignKey(add_prefix_for_prod('cards.id')), primary_key=True)
#   )

# if environment == "production":
#   deck_cards.schema = SCHEMA

class DeckCard(db.Model):
  __tablename__ = 'deck_cards'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  db.Column("deck_id", db.Integer, db.ForeignKey(add_prefix_for_prod('decks.id')), primary_key=True),
  db.Column("card_id", db.Integer, db.ForeignKey(add_prefix_for_prod('cards.id')), primary_key=True)
  db.Column("count", db.Integer, nullable=False)

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