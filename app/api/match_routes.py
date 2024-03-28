from flask import Blueprint, request
from app.models import Match, db, Card, Deck, User
from flask_login import current_user, login_required
from ..forms import NewMatchForm
from ..shared.get_cards_in_decks import get_cards_in_decks
from ..shared.get_decks_in_matches import get_decks_in_matches



import json

match_routes = Blueprint('matches', __name__)

@match_routes.route('/')
def match_index():
  matches = Match.query.all()

  matches_temp = [match.to_dict() for match in matches]
  decks_temp = get_decks_in_matches(matches_temp)
  cards_temp = get_cards_in_decks(decks_temp)
    
  return {'matches': matches_temp, 'decks': decks_temp, 'cards': cards_temp }

@match_routes.route('/<int:matchId>')
def match_details(matchId):
  match = Match.query.get(matchId)
  if (not match):
    return {"message": "Match not found"}
  matches = [match]

  matches_temp = [match.to_dict() for match in matches]
  decks_temp = get_decks_in_matches(matches_temp)
  cards_temp = get_cards_in_decks(decks_temp)
    
  return {'matches': matches_temp, 'decks': decks_temp, 'cards': cards_temp }

@match_routes.route('/', methods = ['POST'])
# @login_required
def create_new_match():
  print('entered route')
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
  print('entered update route')
  match = Match.query.get(matchId)

  if not match:
    return {"message": "Match not found"}
  
  # if current_user.id != match.user_id:
  #   return {"error": "You are not the owner of this match"}, 401
  
  form = NewMatchForm()
  form.user_id_winner.choices = [ (user.id, user.username) for user in User.query.all()]
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    match = Match.query.get(matchId)
    match.event_id = form.data['event_id']
    match.user_id_winner = form.data['user_id_winner']
    # Can I do this?
    while len(match.decks) > 0:
      match.decks.pop(0)
    deck_ids = form.data['deck_ids'].split(' ')
    decks = Deck.query.filter(Deck.id.in_(deck_ids)).all()
    for deck in decks:
      match.decks.append(deck)
    db.session.commit()

    return match.to_dict()
  return form.errors, 401

@match_routes.route('/<int:matchId>', methods = ['DELETE'])
# @login_required
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
