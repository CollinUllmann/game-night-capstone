from flask.cli import AppGroup
from .users import seed_users, undo_users
from .decks import seed_decks, undo_decks
from .cards import seed_cards, undo_cards
from .deck_cards import seed_deck_cards, undo_deck_cards
from .matches import seed_matches, undo_matches
from .deck_matches import seed_deck_matches, undo_deck_matches
from .events import seed_events, undo_events

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_users()
    seed_cards()
    seed_decks()
    seed_deck_cards()
    seed_events()
    seed_matches()
    seed_deck_matches()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_deck_matches()
    undo_matches()
    undo_deck_cards()
    undo_events()
    undo_users()
    undo_cards()
    undo_decks()
    # Add other undo functions here
