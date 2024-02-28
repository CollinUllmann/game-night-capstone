from .db import db, environment, SCHEMA, add_prefix_for_prod

class Event(db.Model):
  __tablename__ = 'events'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  date = db.Column(db.Date, nullable=False)
  format = db.Column(db.String, nullable=False)

  matches = db.relationship("Match", back_populates="event")