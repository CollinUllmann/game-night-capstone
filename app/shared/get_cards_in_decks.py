from app.models import Match, Card, Deck

def get_cards_in_decks(deck_dicts):
  # get all card ids in decks
  card_ids_set = set()
  for deck in deck_dicts:
    for card in deck['cards']:
      card_ids_set.add(card['cardId'])
  card_ids = list(card_ids_set)

  # query for all cards in decks
  cards = Card.query.filter(Card.id.in_(card_ids)).all()

  return [card.to_dict() for card in cards]
