from app.models import db, Deck, environment, SCHEMA
from sqlalchemy.sql import text

def seed_decks():
    decks = [
        Deck(
            name='Deck1',
            user_id=1,
            format='Modern',
            preview_image='https://cards.scryfall.io/large/front/9/4/9459ffca-5a1f-4641-88d4-8a499b261faa.jpg'
        ),
        Deck(
            name='Deck2',
            user_id=2,
            format='Legacy',
            preview_image='https://cards.scryfall.io/large/front/7/b/7b215968-93a6-4278-ac61-4e3e8c3c3943.jpg'

        ),
        Deck(
            name='Deck3',
            user_id=3,
            format='Commander',
            preview_image='https://cards.scryfall.io/large/front/a/9/a959b40d-dd8c-49d8-8003-744d0c877b04.jpg'

        ),
        Deck(
            name='Deck4',
            user_id=4,
            format='Commander',
            preview_image='https://cards.scryfall.io/large/front/6/7/676ab73f-2759-43b6-9ae8-ca33a55ebf80.jpg'

        )
    ]
    for deck in decks:
      db.session.add(deck)
    db.session.commit()
    return decks





def undo_decks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.decks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM decks"))
        
    db.session.commit()
