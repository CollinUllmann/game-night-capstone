from app.models import Match, Card, Deck

def get_matches_in_events(event_dicts):
  # get all deck ids in events
  match_ids_set = set()
  for event in event_dicts:
    for matchId in event['matchIds']:
      match_ids_set.add(matchId)
  match_ids = list(match_ids_set)

  # query for all matches in events
  matches = Match.query.filter(Match.id.in_(match_ids)).all()
    
  return [match.to_dict() for match in matches]