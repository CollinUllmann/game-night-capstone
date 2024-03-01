from flask import Blueprint, request
from app.models import Deck, db, Card
from flask_login import current_user, login_required
from ..forms import NewDeckForm

import json

deck_routes = Blueprint('decks', __name__)

@deck_routes.route('/')
def deck_index():
  decks = Deck.query.all()
  return {'decks': [deck.to_dict() for deck in decks]}

@deck_routes.route('/<int:deckId>')
def deck_details(deckId):
  deck = Deck.query.get(deckId)
  if (not deck):
    return {"message": "Deck not found"}
  return deck.to_dict()

@deck_routes.route('/', methods = ['POST'])
@login_required
def create_new_deck():
  form = NewDeckForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    cards_string = form.data['cards']
    cards_list = list(map(str.strip, cards_string.split('\n')))
    cards = Card.query.filter(Card.name.in_(cards_list)).all()

    params = {
      'name': form.data['name'],
      'user_id': current_user.id,
      'format': form.data['format']
    }
    new_deck = Deck(**params)
    for card in cards:
      new_deck.cards.append(card)
    db.session.add(new_deck)
    db.session.commit()

    return new_deck.to_dict()
  
  return form.errors, 401

@deck_routes.route('/<int:deckId>', methods = ['PUT'])
@login_required
def update_deck(deckId):
  deck = Deck.query.get(deckId)

  if not deck:
    return {"message": "Deck not found"}
  
  if current_user.id != deck.user_id:
    return {"error": "You are not the owner of this deck"}, 401
  
  form = NewDeckForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    deck = Deck.query.get(deckId)

    cards_string = form.data['cards']
    cards_list = list(map(str.strip, cards_string.split('\n')))
    cards = Card.query.filter(Card.name.in_(cards_list)).all()

    deck.name = form.data['name']
    deck.format = form.data['format']
    deck.cards = []
    for card in cards:
      deck.cards.append(card)
    db.session.commit()
    return deck.to_dict()
  return form.errors, 401

@deck_routes.route('/<int:deckId>', methods = ['DELETE'])
@login_required
def delete_deck(deckId):
  deck = Deck.query.get(deckId)

  if not deck: 
    return {"message": "Deck not ofund"}
  
  if current_user.id != deck.user_id:
    return {"error": "You are not the owner of this deck",
            "current_user_id": current_user.id,
            "deck_user_id": deck.user_id}, 401
  
  db.session.delete(deck)
  db.session.commit()
  
  return {"message": "Successfully deleted!"}
