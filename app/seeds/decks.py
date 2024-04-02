from app.models import db, Deck, environment, SCHEMA
from sqlalchemy.sql import text

def seed_decks():
    decks = [
        Deck(
            name='Darigaaz EDH',
            user_id=1,
            format='Commander',
            preview_image='https://cards.scryfall.io/large/front/9/4/9459ffca-5a1f-4641-88d4-8a499b261faa.jpg'
        ),
        Deck(
            name='Chatterfang EDH',
            user_id=1,
            format='Commander',
            preview_image='https://cards.scryfall.io/large/front/1/7/1785cf85-1ac0-4246-9b89-1a8221a8e1b2.jpg'

        ),
        Deck(
            name='Gandalf EDH',
            user_id=1,
            format='Commander',
            preview_image='https://cards.scryfall.io/large/front/e/2/e2b975e6-e709-481f-bfbc-41a832508283.jpg'

        ),
        Deck(
            name='Modern Burn',
            user_id=1,
            format='Modern',
            preview_image='https://cards.scryfall.io/large/front/7/7/77c6fa74-5543-42ac-9ead-0e890b188e99.jpg'

        ),
        Deck(
            name='Modern Tron',
            user_id=1,
            format='Modern',
            preview_image='https://cards.scryfall.io/large/front/9/2/92fae767-8c14-46ef-a548-4f66225defdb.jpg'

        ),
        Deck(
            name='Modern Zoo',
            user_id=1,
            format='Modern',
            preview_image='https://cards.scryfall.io/large/front/a/9/a9738cda-adb1-47fb-9f4c-ecd930228c4d.jpg'

        ),
        Deck(
            name='Izzet Delver?',
            user_id=1,
            format='Legacy',
            preview_image='https://cards.scryfall.io/large/front/2/0/20c4aae1-7665-4df7-bd51-a1d95bf8a17d.jpg'

        ),
        Deck(
            name='Stu Bru',
            user_id=2,
            format='Modern',
            preview_image='https://cards.scryfall.io/large/front/7/c/7c024bae-5631-4e20-ac69-df392ac9e109.jpg'

        ),
        Deck(
            name='Red Prison',
            user_id=2,
            format='Legacy',
            preview_image='https://cards.scryfall.io/large/front/d/0/d072e9ca-aae7-45dc-8025-3ce590bae63f.jpg'

        ),
        Deck(
            name='JTMD',
            user_id=3,
            format='Modern',
            preview_image='https://cards.scryfall.io/large/front/d/0/d072e9ca-aae7-45dc-8025-3ce590bae63f.jpg'

        ),
        Deck(
            name='Doomsday Clock',
            user_id=3,
            format='Legacy',
            preview_image='https://cards.scryfall.io/large/front/6/8/68c73755-9678-467a-abd5-f8dd1556864e.jpg'

        ),
        Deck(
            name='Creativity',
            user_id=4,
            format='Modern',
            preview_image='https://cards.scryfall.io/large/front/e/d/edd00e45-2ae1-4cd0-92a1-155c95f8dc72.jpg'

        ),
        Deck(
            name='Stiflnaught',
            user_id=4,
            format='Legacy',
            preview_image='https://cards.scryfall.io/large/front/7/b/7b8197b9-0cd1-4fa1-9668-d1b5f1759151.jpg'

        ),
        Deck(
            name='Modern Scales',
            user_id=5,
            format='Modern',
            preview_image='https://cards.scryfall.io/large/front/f/c/fc69ad56-9ae2-4eb5-b7e2-558524f6cbcc.jpg'

        ),
        Deck(
            name='Dark Depths',
            user_id=5,
            format='Legacy',
            preview_image='https://cards.scryfall.io/large/front/9/2/92409c3a-fb1a-4205-9fe1-0f5affc7b21d.jpg'

        ),
        Deck(
            name='Modern Mill',
            user_id=6,
            format='Modern',
            preview_image='https://cards.scryfall.io/large/front/f/0/f0fa1946-4f97-4c52-b5f2-b80571230616.jpg'

        ),
        Deck(
            name='Lands',
            user_id=6,
            format='Legacy',
            preview_image='https://cards.scryfall.io/large/front/5/5/551c0a45-9515-4e51-84e5-79703832a661.jpg'

        ),
        Deck(
            name='Niv-Mizzet EDH',
            user_id=8,
            format='Commander',
            preview_image='https://cards.scryfall.io/large/front/7/b/7be6bedd-8d38-4bd9-aa93-29f88a7f0126.jpg'

        ),
        Deck(
            name='Stompy EDH',
            user_id=7,
            format='Commander',
            preview_image='https://cards.scryfall.io/large/front/e/e/ee47f23a-3ba9-4615-b170-c89d8ab99d78.jpg'

        ),
        Deck(
            name='Atraxa EDH',
            user_id=9,
            format='Commander',
            preview_image='https://cards.scryfall.io/large/front/d/0/d0d33d52-3d28-4635-b985-51e126289259.jpg'

        ),

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
