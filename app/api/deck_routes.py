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






@deck_routes.route('/test', methods = ['GET'])
def format_seeders():
  deckListString = """1x Atraxa, Praetors' Voice
1x Ajani, Sleeper Agent
1x Arcane Sanctum
1x Arcane Signet
1x Astral Cornucopia
1x Atomize
1x Birds of Paradise
1x Blighted Agent
1x Bloated Contaminator
1x Breeding Pool
1x Brokers Ascendancy
1x Byrke, Long Ear of the Law
1x Cankerbloom
1x Chromatic Lantern
1x Cleopatra, Exiled Pharaoh
1x Command Tower
1x Contagion Engine
1x Contaminant Grafter
1x Counterspell
1x Cultivate
1x Cyclonic Rift
1x Deepglow Skate
1x Demonic Tutor
1x Doubling Season
1x Drown in Ichor
1x Everflowing Chalice
1x Evolution Sage
1x Exotic Orchard
1x Experimental Augury
1x Ezuri, Stalker of Spheres
1x Farseek
1x Fellwar Stone
1x Flooded Strand
1x Flux Channeler
3x Forest
1x Glistening Sphere
1x Godless Shrine
1x Hallowed Fountain
1x Ichor Rats
1x Ichormoon Gauntlet
1x Indatha Triome
1x Inexorable Tide
1x Infectious Inquiry
3x Island
1x Ixhel, Scion of Atraxa
1x Karn's Bastion
1x Lae'zel, Vlaakith's Champion
1x Lightning Greaves
1x Marsh Flats
1x Misty Rainforest
1x Narset, Parter of Veils
1x Nature's Lore
1x Norn's Choirmaster
1x Norn's Decree
1x Oath of Teferi
1x Oko, Thief of Crowns
1x Oko, the Ringleader
1x Opulent Palace
1x Overgrown Tomb
1x Phyresis Outbreak
2x Plains
1x Polluted Delta
1x Prologue to Phyresis
1x Radstorm
1x Raffine's Tower
1x Rhystic Study
1x Ripples of Potential
1x Roaming Throne
1x Sandsteppe Citadel
1x Seaside Citadel
1x Shalai, Voice of Plenty
1x Skrelv's Hive
1x Skrelv, Defector Mite
1x Smothering Tithe
1x Sol Ring
1x Spara's Headquarters
1x Swamp
1x Swords to Plowshares
1x Tainted Observer
1x Tamiyo, Field Researcher
1x Teferi, Master of Time
1x Tekuthal, Inquiry Dominus
1x Temple Garden
1x Tezzeret's Gambit
1x Thrummingbird
1x Unnatural Restoration
1x Venerated Rotpriest
1x Verdant Catacombs
1x Voidwing Hybrid
1x Vorinclex, Monstrous Raider
1x Vraska's Fall
1x Vraska, Betrayal's Sting
1x Watery Grave
1x Windswept Heath
1x Zagoth Triome
"""
  cards_count_list = list(map(str.strip, deckListString.split('\n')))
  card_count_obj = {}
  for card_count in cards_count_list:
    card_count_split = transform_card_count(card_count)
    card_count_obj[card_count_split['name']] = card_count_split['count']

  cards = Card.query.filter(Card.name.in_(card_count_obj.keys())).all()
  return_str = ''
  for card in cards:
    return_str = return_str + f'DeckCard(deck_id = 20, card_id = {card.id}, count = {card_count_obj[card.name]}),\n'
  return return_str