from flask import Blueprint, request
from app.models import Match, db, Card, Deck, User
from flask_login import current_user, login_required
from ..forms import NewMatchForm

import json

match_routes = Blueprint('matches', __name__)

@match_routes.route('/')
def match_index():
  matches = Match.query.all()
  matches_temp = [match.to_dict() for match in matches]

  # get all deck ids in all matches
  deck_ids_set = set()
  for match in matches_temp:
    for deckId in match['deckIds']:
      deck_ids_set.add(deckId)
  deck_ids = list(deck_ids_set)

  # query for all decks in all matches
  decks = Deck.query.filter(Deck.id.in_(deck_ids)).all()
    
  return {'matches': matches_temp, 'decks': [deck.to_dict() for deck in decks] }

@match_routes.route('/<int:matchId>')
def match_details(matchId):
  match = Match.query.get(matchId)
  if (not match):
    return {"message": "Match not found"}
  matches_temp = [match.to_dict() for match in [match]]

  # get all deck ids in all matches
  deck_ids_set = set()
  for match in matches_temp:
    for deckId in match['deckIds']:
      deck_ids_set.add(deckId)
  deck_ids = list(deck_ids_set)

  # query for all decks in all matches
  decks = Deck.query.filter(Deck.id.in_(deck_ids)).all()
    
  return {'matches': matches_temp, 'decks': [deck.to_dict() for deck in decks] }

@match_routes.route('/', methods = ['POST'])
# @login_required
def create_new_match():
  form = NewMatchForm()
  form.user_id_winner.choices = [ (user.id, user.username) for user in User.query.all()]
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    params = {
      'event_id': form.data['event_id'],
      'user_id_winner': form.data['user_id_winner']
    }
    new_match = Match(**params)
    db.session.add(new_match)
    db.session.commit()
    #add the many-to-many relationship data: append deck to match's decks attribute
    deck_ids = form.data['deck_ids'].split(' ')
    decks = Deck.query.filter(Deck.id.in_(deck_ids)).all()
    for deck in decks:
      new_match.decks.append(deck)
    db.session.commit()

    return new_match.to_dict()
  
  return form.errors, 401

@match_routes.route('/<int:matchId>', methods = ['PUT'])
# @login_required
def update_match(matchId):
  match = Match.query.get(matchId)

  if not match:
    return {"message": "Match not found"}
  
  if current_user.id != match.user_id:
    return {"error": "You are not the owner of this match"}, 401
  
  form = NewMatchForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    match = Match.query.get(matchId)
    match.name = form.data['name']
    match.format = form.data['format']
    # Can I do this?
    while len(match.decks) > 0:
      match.decks.pop(0)
    deck_ids = form.data['deck_ids'].split(' ')
    decks = Deck.query.filter(Deck.id.in_(deck_ids)).all()
    for deck in decks:
      match.decks.append(deck)
    db.session.commit()

    return match.to_dict()
  #   match.cards = []

  #   cards_string = form.data['cards']
  #   cards_count_list = list(map(str.strip, cards_string.split('\n')))
  #   card_count_obj = {}
  #   for card_count in cards_count_list:
  #     card_count_split = card_count.split('x ')
  #     card_count_obj[card_count_split[1]] = card_count_split[0]

  #   cards = Card.query.filter(Card.name.in_(card_count_obj.keys())).all()

  #   for card in cards:
  #     match_card_params = {
  #       'match_id': match.id,
  #       'card_id': card.id,
  #       'count': card_count_obj[card.name]
  #     }
  #     match_card = MatchCard(**match_card_params)
  #     db.session.add(match_card)
  #   db.session.commit()
  #   return match.to_dict()
  return form.errors, 401

@match_routes.route('/<int:matchId>', methods = ['DELETE'])
@login_required
def delete_match(matchId):
  match = Match.query.get(matchId)

  if not match: 
    return {"message": "Match not found"}
  
  # if current_user.id != match.user_id:
  #   return {"error": "You are not the owner of this match",
  #           "current_user_id": current_user.id,
  #           "match_user_id": match.user_id}, 401
  
  db.session.delete(match)
  db.session.commit()
  
  return {"message": "Successfully deleted!"}
