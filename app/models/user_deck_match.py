from .db import db, environment, SCHEMA, add_prefix_for_prod


user_deck_matches = db.Table(

  'user_deck_matches',
  db.Model.metadata,

  db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), primary_key=True),
  db.Column("deck_id", db.Integer, db.ForeignKey(add_prefix_for_prod('deck.id')), primary_key=True),
  db.Column("match_id", db.Integer, db.ForeignKey(add_prefix_for_prod('match.id')), primary_key=True)
  )

if environment == "production":
  user_deck_matches.schema = SCHEMA