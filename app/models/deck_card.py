from .db import db, environment, SCHEMA, add_prefix_for_prod


deck_cards = db.Table(

  'deck_cards',
  db.Model.metadata,

  db.Column("deck_id", db.Integer, db.ForeignKey(add_prefix_for_prod('decks.id')), primary_key=True),
  db.Column("card_id", db.Integer, db.ForeignKey(add_prefix_for_prod('cards.id')), primary_key=True)
  )

if environment == "production":
  deck_cards.schema = SCHEMA