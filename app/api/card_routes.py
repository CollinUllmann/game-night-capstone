from flask import Blueprint, request
from app.models import  Card


card_routes = Blueprint('cards', __name__)

@card_routes.route('/')
def card_index():
  cards = Card.query.all()
  cards_temp = [card.to_dict() for card in cards]
    
  return {'cards': cards_temp }

@card_routes.route('/<int:cardId>')
def card_details(cardId):
  card = Card.query.get(cardId)
  if (not card):
    return {"message": "Card not found"}
  card_temp = card.to_dict()

  return {'cards': [card_temp] }
