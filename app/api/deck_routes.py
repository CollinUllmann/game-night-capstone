from flask import Blueprint, request
from app.models import Deck, db, Card, DeckCard
from flask_login import current_user, login_required
from ..forms import NewDeckForm
from ..shared.get_cards_in_decks import get_cards_in_decks

import json

deck_routes = Blueprint('decks', __name__)

def transform_card_count(card_count_string):
  card_count_split = card_count_string.split('x ')
  return {
    'count': card_count_split[0],
    'name': 'x '.join(card_count_split[1:])
  }

@deck_routes.route('/')
def deck_index():
  decks = Deck.query.all()

  decks_temp = [deck.to_dict() for deck in decks]
  cards_temp = get_cards_in_decks(decks_temp)
    
  return {'decks': decks_temp, 'cards': cards_temp }

@deck_routes.route('/<int:deckId>')
def deck_details(deckId):
  deck = Deck.query.get(deckId)
  if (not deck):
    return {"message": "Deck not found"}
  decks = [deck]

  decks_temp = [deck.to_dict() for deck in decks]
  cards_temp = get_cards_in_decks(decks_temp)
    
  return {'decks': decks_temp, 'cards': cards_temp }

@deck_routes.route('/', methods = ['POST'])
@login_required
def create_new_deck():
  form = NewDeckForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    cards_string = form.data['cards']
    cards_count_list = list(map(str.strip, cards_string.split('\n')))
    card_count_obj = {}
    
    
    for card_count in cards_count_list:
      card_count_split = transform_card_count(card_count)
      card_count_obj[card_count_split['name']] = card_count_split['count']

    card_names_requested = card_count_obj.keys()

    cards = Card.query.filter(Card.name.in_(card_names_requested)).all()

    card_names_found = [card.name for card in cards]

    card_names_requested_but_not_found = list(set(list(card_names_requested)).difference(set(card_names_found)))
    if len(card_names_requested_but_not_found) > 0:
      return { 'card_names_requested_but_not_found': card_names_requested_but_not_found }, 400

    first_card_split = transform_card_count(cards_count_list[0])
    preview_card_name = first_card_split['name']
    preview_cards = Card.query.filter(Card.name.in_([preview_card_name])).all()

    params = {
      'name': form.data['name'],
      'user_id': current_user.id,
      'format': form.data['format'],
      'preview_image': preview_cards[0].image_url
    }
    new_deck = Deck(**params)
    db.session.add(new_deck)
    db.session.commit()
    for card in cards:
      deck_card_params = {
        'deck_id': new_deck.id,
        'card_id': card.id,
        'count': card_count_obj[card.name]
      }
      deck_card = DeckCard(**deck_card_params)
      db.session.add(deck_card)
      # new_deck.cards.append(card)
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
    deck.name = form.data['name']
    deck.format = form.data['format']
    deck.cards = []

    cards_string = form.data['cards']
    cards_count_list = list(map(str.strip, cards_string.split('\n')))
    card_count_obj = {}
    for card_count in cards_count_list:
      card_count_split = transform_card_count(card_count)
      card_count_obj[card_count_split['name']] = card_count_split['count']

    card_names_requested = card_count_obj.keys()

    cards = Card.query.filter(Card.name.in_(card_count_obj.keys())).all()

    card_names_found = [card.name for card in cards]

    card_names_requested_but_not_found = list(set(list(card_names_requested)).difference(set(card_names_found)))
    if len(card_names_requested_but_not_found) > 0:
      return { 'card_names_requested_but_not_found': card_names_requested_but_not_found }, 400

    first_card_split = transform_card_count(cards_count_list[0])
    preview_card_name = first_card_split['name']
    preview_cards = Card.query.filter(Card.name.in_([preview_card_name])).all()
    
    deck.preview_image = preview_cards[0].image_url

    for card in cards:
      deck_card_params = {
        'deck_id': deck.id,
        'card_id': card.id,
        'count': card_count_obj[card.name]
      }
      deck_card = DeckCard(**deck_card_params)
      db.session.add(deck_card)
    db.session.commit()
    return deck.to_dict()
  return form.errors, 401

@deck_routes.route('/<int:deckId>', methods = ['DELETE'])
@login_required
def delete_deck(deckId):
  deck = Deck.query.get(deckId)

  if not deck: 
    return {"message": "Deck not found"}
  
  if current_user.id != deck.user_id:
    return {"error": "You are not the owner of this deck",
            "current_user_id": current_user.id,
            "deck_user_id": deck.user_id}, 401
  
  db.session.delete(deck)
  db.session.commit()
  
  return {"message": "Successfully deleted!"}
