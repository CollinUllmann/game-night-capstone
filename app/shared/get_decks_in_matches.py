from app.models import Match, Card, Deck

def get_decks_in_matches(match_dicts):
  # get all deck ids in matches
  deck_ids_set = set()
  for match in match_dicts:
    for deckId in match['deckIds']:
      deck_ids_set.add(deckId)
  deck_ids = list(deck_ids_set)

  # query for all decks in matches
  decks = Deck.query.filter(Deck.id.in_(deck_ids)).all()

  return [deck.to_dict() for deck in decks]
