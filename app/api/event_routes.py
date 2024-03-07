from flask import Blueprint, request
from app.models import Event, db, Card, Deck, User, Event, Match
from flask_login import current_user, login_required
from ..forms import NewEventForm

import json

event_routes = Blueprint('events', __name__)

@event_routes.route('/')
def event_index():
  events = Event.query.all()
  events_temp = [event.to_dict() for event in events]

  # get all deck ids in all events
  match_ids_set = set()
  for event in events_temp:
    for matchId in event['matchIds']:
      match_ids_set.add(matchId)
  match_ids = list(match_ids_set)

  # query for all matches in all events
  matches = Match.query.filter(Match.id.in_(match_ids)).all()
    
  return {'events': events_temp, 'matches': [match.to_dict() for match in matches] }

@event_routes.route('/<int:eventId>')
def event_details(eventId):
  event = Event.query.get(eventId)
  if (not event):
    return {"message": "Event not found"}
  events_temp = [event.to_dict() for event in [event]]

  # get all match ids in all events
  match_ids_set = set()
  for event in events_temp:
    for matchId in event['matchIds']:
      match_ids_set.add(matchId)
  match_ids = list(match_ids_set)

  # query for all decks in all events
  matches = Match.query.filter(Match.id.in_(match_ids)).all()
    
  return {'events': events_temp, 'matches': [match.to_dict() for match in matches] }

@event_routes.route('/', methods = ['POST'])
# @login_required
def create_new_event():
  form = NewEventForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    params = {
      'name': form.data['name'],
      'date': form.data['date'],
      'format': form.data['format']
    }
    new_event = Event(**params)
    db.session.add(new_event)
    db.session.commit()
    
    return new_event.to_dict()
  
  return form.errors, 401

@event_routes.route('/<int:eventId>', methods = ['PUT'])
# @login_required
def update_event(eventId):
  print('entered update route')
  event = Event.query.get(eventId)

  if not event:
    return {"message": "Event not found"}
  
  # if current_user.id != event.user_id:
  #   return {"error": "You are not the owner of this event"}, 401
  
  form = NewEventForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    event = Event.query.get(eventId)
    event.name = form.data['name']
    event.date = form.data['date']
    event.format = form.data['format']

    db.session.commit()

    return event.to_dict()
  return form.errors, 401

@event_routes.route('/<int:eventId>', methods = ['DELETE'])
# @login_required
def delete_event(eventId):
  event = Event.query.get(eventId)

  if not event: 
    return {"message": "Event not found"}
  
  # if current_user.id != event.user_id:
  #   return {"error": "You are not the owner of this event",
  #           "current_user_id": current_user.id,
  #           "event_user_id": event.user_id}, 401
  
  db.session.delete(event)
  db.session.commit()
  
  return {"message": "Successfully deleted!"}
