from .db import db, environment, SCHEMA, add_prefix_for_prod


deck_matches = db.Table(

  'deck_matches',
  db.Model.metadata,

  db.Column("deck_id", db.Integer, db.ForeignKey(add_prefix_for_prod('deck.id')), primary_key=True),
  db.Column("match_id", db.Integer, db.ForeignKey(add_prefix_for_prod('match.id')), primary_key=True)
  )

if environment == "production":
  deck_matches.schema = SCHEMA