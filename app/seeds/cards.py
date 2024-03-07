from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cards():
  cards = [

  Card(
    image_url = 'https://cards.scryfall.io/normal/front/9/4/9459ffca-5a1f-4641-88d4-8a499b261faa.jpg?1562739719',
    name = "Darigaaz Reincarnated",
    mana_cost = '{4}{B}{R}{G}',
    cmc = 7,
    type_line = 'Legendary Creature — Dragon',
    colors = 'BGR',
    color_identity = 'BGR',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/e/5/e5a2a709-0273-48a3-874b-13aff4872b0a.jpg?1631235364',
    name = "Casualties of War",
    mana_cost = '{2}{B}{B}{G}{G}',
    cmc = 6,
    type_line = 'Sorcery',
    colors = 'BG',
    color_identity = 'BG',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/8/b8d58c2d-2bff-4d25-a023-0a6342167f5f.jpg?1674142441',
    name = "Escape to the Wilds",
    mana_cost = '{3}{R}{G}',
    cmc = 5,
    type_line = 'Sorcery',
    colors = 'GR',
    color_identity = 'GR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/7/676ab73f-2759-43b6-9ae8-ca33a55ebf80.jpg?1599708139',
    name = "Maelstrom Pulse",
    mana_cost = '{1}{B}{G}',
    cmc = 3,
    type_line = 'Sorcery',
    colors = 'BG',
    color_identity = 'BG',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/7/175e21a3-00f7-4c51-8a8e-fbfd7089efda.jpg?1574767873',
    name = "Scapeshift",
    mana_cost = '{2}{G}{G}',
    cmc = 4,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = 'G',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/c/b/cbe78a66-2e72-4bd8-b8a4-db77a63f36b3.jpg?1689997770',
    name = "Drakuseth, Maw of Flames",
    mana_cost = '{4}{R}{R}{R}',
    cmc = 7,
    type_line = 'Legendary Creature — Dragon',
    colors = 'R',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/0/1/0127d42f-bf40-48f4-a3a0-1a1c4039f432.jpg?1599710528',
    name = "Graven Cairns",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'BR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/4/8/4847f8e8-9979-427e-999a-26711e542f82.jpg?1562734655',
    name = "Natural Affinity",
    mana_cost = '{2}{G}',
    cmc = 3,
    type_line = 'Instant',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/e/b/eb40c41c-f5f9-4323-b6ac-e28e405909d0.jpg?1699022527',
    name = "Beast Within",
    mana_cost = '{2}{G}',
    cmc = 3,
    type_line = 'Instant',
    colors = 'G',
    color_identity = 'G',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/f/f/ff4c78b4-7178-4a60-ba22-086fb18146df.jpg?1708707304',
    name = "Forest",
    mana_cost = '',
    cmc = 0,
    type_line = 'Basic Land — Forest',
    colors = '',
    color_identity = 'G',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/6/8652e3a1-bcd4-4c0c-a085-34f19702df26.jpg?1562437624',
    name = "Pernicious Deed",
    mana_cost = '{1}{B}{G}',
    cmc = 3,
    type_line = 'Enchantment',
    colors = 'BG',
    color_identity = 'BG',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/f/a/fa6a5029-f4df-43dd-b5a9-fbf6ff003675.jpg?1709431593',
    name = "Evolving Wilds",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/6/6640956f-c8a1-4cd7-835b-e4f23fa778c0.jpg?1706945535',
    name = "Decimate",
    mana_cost = '{2}{R}{G}',
    cmc = 4,
    type_line = 'Sorcery',
    colors = 'GR',
    color_identity = 'GR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/8/18a1b3f5-473d-45ca-be0d-e67e77ba30ce.jpg?1674138220',
    name = "Reflecting Pool",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/3/6340e0f3-7f9c-4d71-8daf-e1be5505eb5b.jpg?1689998574',
    name = "The Great Henge",
    mana_cost = '{7}{G}{G}',
    cmc = 9,
    type_line = 'Legendary Artifact',
    colors = 'G',
    color_identity = 'G',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/e/8e37fae5-ddd0-4e16-8581-71579f89d9c5.jpg?1707507997',
    name = "Gamble",
    mana_cost = '{R}',
    cmc = 1,
    type_line = 'Sorcery',
    colors = 'R',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/9/69955979-1ca3-4fd3-ab7a-dd65c06a9ce0.jpg?1706241196',
    name = "Mosswort Bridge",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/2/1/2135ac5a-187b-4dc9-8f82-34e8d1603416.jpg?1654568912',
    name = "Boseiju, Who Endures",
    mana_cost = '',
    cmc = 0,
    type_line = 'Legendary Land',
    colors = '',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/c/8/c8e3909e-e00a-4855-a0be-b1c538f89cb8.jpg?1708707363',
    name = "Swamp",
    mana_cost = '',
    cmc = 0,
    type_line = 'Basic Land — Swamp',
    colors = '',
    color_identity = 'B',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/e/1/e19cd136-0541-4db0-997f-20a58ec8d028.jpg?1698988348',
    name = "Cultivate",
    mana_cost = '{2}{G}',
    cmc = 3,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = 'G',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/8/b89b2c79-e3d3-4ef9-bfc8-f9c090975011.jpg?1673308330',
    name = "Karplusan Forest",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'GR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/9/8967ceff-9e25-46da-926b-e05f4ee98325.jpg?1562706023',
    name = "Realms Uncharted",
    mana_cost = '{2}{G}',
    cmc = 3,
    type_line = 'Instant',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/f/c/fcdbc6ba-714d-4f38-8299-dc875ec76a3d.jpg?1706241180',
    name = "Kessig Wolf Run",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'GR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/0/4/0430db1a-5cad-4444-ba93-57fb32e65606.jpg?1592516651',
    name = "Dread Presence",
    mana_cost = '{3}{B}',
    cmc = 4,
    type_line = 'Creature — Nightmare',
    colors = 'B',
    color_identity = 'B',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/5/2/523414cb-f8db-407a-808a-01454e03d8b9.jpg?1681724998',
    name = "Crop Rotation",
    mana_cost = '{G}',
    cmc = 1,
    type_line = 'Instant',
    colors = 'G',
    color_identity = 'G',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/4/b/4bf47fb5-2072-473d-96f9-5cdb7840f887.jpg?1690004919',
    name = "The Mending of Dominaria",
    mana_cost = '{3}{G}{G}',
    cmc = 5,
    type_line = 'Enchantment — Saga',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/c/1/c1bba8fb-d763-4efa-8db1-e5e81994b5f9.jpg?1708704819',
    name = "Mountain",
    mana_cost = '',
    cmc = 0,
    type_line = 'Basic Land — Mountain',
    colors = '',
    color_identity = 'R',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/2/5/2540964b-9caa-4951-8bba-ea2f84dc3698.jpg?1706240917',
    name = "Return of the Wildspeaker",
    mana_cost = '{4}{G}',
    cmc = 5,
    type_line = 'Instant',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/2/9/29fc8594-931f-4cf6-95b8-9b589d6cbcf9.jpg?1698988371',
    name = "Kodama's Reach",
    mana_cost = '{2}{G}',
    cmc = 3,
    type_line = 'Sorcery — Arcane',
    colors = 'G',
    color_identity = 'G',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/c/c/ccf744d0-4349-4338-99aa-db0780c7296f.jpg?1562623825',
    name = "Nissa's Pilgrimage",
    mana_cost = '{2}{G}',
    cmc = 3,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = 'G',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/5/1524face-5843-4fca-823b-0e9eaf9be96f.jpg?1673486235',
    name = "Twilight Mire",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'BG',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/5/9/59927e3b-65bc-4ab6-ad7b-6f558ccca6a8.jpg?1702429570',
    name = "Life from the Loam",
    mana_cost = '{1}{G}',
    cmc = 2,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/3/d313d051-7295-4884-8cbf-f2f835fd45f4.jpg?1594737636',
    name = "Fabled Passage",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/5/159c309c-568d-4780-9db5-b50a997e7bb2.jpg?1690004886',
    name = "Khalni Heart Expedition",
    mana_cost = '{1}{G}',
    cmc = 2,
    type_line = 'Enchantment',
    colors = 'G',
    color_identity = 'G',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/9/2/92144021-7425-44e1-a32b-13252f1b7036.jpg?1593813861',
    name = "Primal Command",
    mana_cost = '{3}{G}{G}',
    cmc = 5,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/4/a/4a297ec1-0a7c-4f67-936b-d9227767e989.jpg?1702429815',
    name = "Overgrown Tomb",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Swamp Forest',
    colors = '',
    color_identity = 'BG',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/4/e/4e11ea8a-f895-438d-a3b7-f070238e4161.jpg?1708707631',
    name = "Wooded Foothills",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/3/7/37bce60d-2cb0-4772-9f5c-122a7ed426a0.jpg?1562611305',
    name = "Valakut, the Molten Pinnacle",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/0/f/0f4a7c01-95ca-43bf-bc53-875cfb4bffa1.jpg?1636684088',
    name = "Dire-Strain Rampage",
    mana_cost = '{1}{R}{G}',
    cmc = 3,
    type_line = 'Sorcery',
    colors = 'GR',
    color_identity = 'GR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/7/872301b2-b6e7-4972-a479-66a7e304c1d3.jpg?1702429826',
    name = "Stomping Ground",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Mountain Forest',
    colors = '',
    color_identity = 'GR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/3/7/373a4e3e-6244-43e8-80ac-f5508db9ce57.jpg?1673148154',
    name = "Oracle of Mul Daya",
    mana_cost = '{3}{G}',
    cmc = 4,
    type_line = 'Creature — Elf Shaman',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/0/9/0994aef4-b341-45f4-8881-523565a5956e.jpg?1702429795',
    name = "Blood Crypt",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Swamp Mountain',
    colors = '',
    color_identity = 'BR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/2/629aa907-9533-4681-9bf2-9e56450a4cc2.jpg?1673307826',
    name = "Tear Asunder",
    mana_cost = '{1}{G}',
    cmc = 2,
    type_line = 'Instant',
    colors = 'G',
    color_identity = 'BG',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/9/4/94c229ea-90da-4aa0-bfda-b162fb3b5b8b.jpg?1707235008',
    name = "Verdant Catacombs",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/9/89f5cc05-5d9d-4709-b3c5-a6249c294acc.jpg?1562202103',
    name = "Hexdrinker",
    mana_cost = '{G}',
    cmc = 1,
    type_line = 'Creature — Snake',
    colors = 'G',
    color_identity = 'G',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/9/197455e5-7929-47b8-ad00-8d3918949eb7.jpg?1624593207',
    name = "Verdant Mastery",
    mana_cost = '{5}{G}',
    cmc = 6,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/9/19b72af8-9bb9-4542-9115-09c27ad6e7ad.jpg?1698988643',
    name = "Terramorphic Expanse",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/3/1/3145ca68-7a9d-4161-9456-518591251b56.jpg?1593092414',
    name = "Archetype of Endurance",
    mana_cost = '{6}{G}{G}',
    cmc = 8,
    type_line = 'Enchantment Creature — Boar',
    colors = 'G',
    color_identity = 'G',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/4/3/43be1363-7e73-4862-b45f-07f490ab46be.jpg?1690004795',
    name = "Dryad of the Ilysian Grove",
    mana_cost = '{2}{G}',
    cmc = 3,
    type_line = 'Enchantment Creature — Nymph Dryad',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/2/6/26a0ae4f-a48c-4333-a53f-70702b5b4c9e.jpg?1591321208',
    name = "Deathsprout",
    mana_cost = '{1}{B}{B}{G}',
    cmc = 4,
    type_line = 'Instant',
    colors = 'BG',
    color_identity = 'BG',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/5/b/5b372045-a4a0-44c8-96ec-1e201d61ed26.jpg?1675200396',
    name = "Exploration",
    mana_cost = '{G}',
    cmc = 1,
    type_line = 'Enchantment',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/5/7/579743fe-f71e-4cb2-8629-d6b02ed1591d.jpg?1708707881',
    name = "Bloodstained Mire",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/9/d9c88546-13c9-4d7e-a618-cb2ccd1dbc0f.jpg?1674422181',
    name = "Demolition Field",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/f/9/f9ae7693-a6b5-42f8-9f05-c0643b95a710.jpg?1627708646',
    name = "You Happen On a Glade",
    mana_cost = '{2}{G}',
    cmc = 3,
    type_line = 'Instant',
    colors = 'G',
    color_identity = 'G',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/0/9/099352e2-38c8-4fb4-a25f-6d928aa20f9e.jpg?1673306226',
    name = "Shizo, Death's Storehouse",
    mana_cost = '',
    cmc = 0,
    type_line = 'Legendary Land',
    colors = '',
    color_identity = 'B',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/2/12277fd6-d010-4f8e-8c58-146a14c9e5b6.jpg?1702429693',
    name = "Putrefy",
    mana_cost = '{1}{B}{G}',
    cmc = 3,
    type_line = 'Instant',
    colors = 'BG',
    color_identity = 'BG',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/a/da57eb54-5199-4a56-95f7-f6ac432876b1.jpg?1669839398',
    name = "Cragcrown Pathway",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = ''
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/b/bb9c6068-cfd8-4371-b549-e474d573e52e.jpg?1601078552',
    name = "Sarkhan's Unsealing",
    mana_cost = '{3}{R}',
    cmc = 4,
    type_line = 'Enchantment',
    colors = 'R',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/3/9/39704000-65d3-4d39-849e-a3b617376bbc.jpg?1689998488',
    name = "Eternal Witness",
    mana_cost = '{1}{G}{G}',
    cmc = 3,
    type_line = 'Creature — Human Shaman',
    colors = 'G',
    color_identity = 'G',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/c/bc7239ea-f8aa-4a6f-87bd-c35359635673.jpg?1604197844',
    name = "Shatterskull Smashing",
    mana_cost = '{X}{R}{R}',
    cmc = 0,
    type_line = 'Sorcery',
    colors = 'R',
    color_identity = '',
    rarity = ''
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/7/2/72aed540-7833-4442-90a9-aa5468014c65.jpg?1674138245',
    name = "Spire Garden",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'GR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/5/7/57a6f727-8239-45e6-9dbb-67d2d3c9239d.jpg?1674141682',
    name = "In Garruk's Wake",
    mana_cost = '{7}{B}{B}',
    cmc = 9,
    type_line = 'Sorcery',
    colors = 'B',
    color_identity = 'B',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/a/1/a12b16b0-f75f-42d8-9b24-947c1908e0f7.jpg?1628801715',
    name = "Fires of Invention",
    mana_cost = '{3}{R}',
    cmc = 4,
    type_line = 'Enchantment',
    colors = 'R',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/f/f/ff0063da-ab6b-499d-8e87-8b34d46f0372.jpg?1562209457',
    name = "Nissa, Vastwood Seer",
    mana_cost = '{2}{G}',
    cmc = 0,
    type_line = 'Legendary Creature — Elf Scout',
    colors = 'G',
    color_identity = '',
    rarity = ''
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/e/8eaa45a5-7652-4e99-a756-509e458a801a.jpg?1625977652',
    name = "Gaze of Granite",
    mana_cost = '{X}{B}{B}{G}',
    cmc = 3,
    type_line = 'Sorcery',
    colors = 'BG',
    color_identity = 'BG',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/2/1/21945dec-25d8-482e-bacb-8bbb92bb9d88.jpg?1698988379',
    name = "Rampant Growth",
    mana_cost = '{1}{G}',
    cmc = 2,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = 'G',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/0/6/061d9fa5-a8e0-4263-9804-22d648554eba.jpg?1593095908',
    name = "Bearer of the Heavens",
    mana_cost = '{7}{R}',
    cmc = 8,
    type_line = 'Creature — Giant',
    colors = 'R',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/5/1/51d4d1c2-671c-498c-a232-7d076e3dc3bb.jpg?1562735600',
    name = "Grow from the Ashes",
    mana_cost = '{2}{G}',
    cmc = 3,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = 'G',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/c/5/c5ee374f-31dc-4b2c-beba-431d5b1126d0.jpg?1562814095',
    name = "Hour of Promise",
    mana_cost = '{4}{G}',
    cmc = 5,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/9/5/95a5d742-187a-4eba-82e4-7a4cc5c4e6f3.jpg?1698988417',
    name = "Wayward Swordtooth",
    mana_cost = '{2}{G}',
    cmc = 3,
    type_line = 'Creature — Dinosaur',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/4/7/470ca3f4-29aa-4c4c-8ff2-8cdd70c69943.jpg?1650599538',
    name = "Field of the Dead",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/9/e/9e1a9e38-6ffc-490f-b0be-23ba4e8204c6.jpg?1619399578',
    name = "Urborg, Tomb of Yawgmoth",
    mana_cost = '',
    cmc = 0,
    type_line = 'Legendary Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/2/b/2bbd37b1-49cb-4295-9a1f-fb85368a8f12.jpg?1594737431',
    name = "Radha, Heart of Keld",
    mana_cost = '{1}{R}{G}',
    cmc = 3,
    type_line = 'Legendary Creature — Elf Warrior',
    colors = 'GR',
    color_identity = 'GR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/f/5/f5615c05-eb1e-4d27-a323-72d643d7c1d8.jpg?1706547171',
    name = "Nature's Lore",
    mana_cost = '{1}{G}',
    cmc = 2,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = 'G',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/e/1e5d990f-0eb4-4634-a446-7783915e8eec.jpg?1674143088',
    name = "Spinerock Knoll",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/a/3/a3f4356f-8cfb-43ed-bdf9-6191bb563388.jpg?1562153163',
    name = "Journey of Discovery",
    mana_cost = '{2}{G}',
    cmc = 3,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = 'G',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/9/1927d645-ca43-4b8e-9932-7e70acca7aa6.jpg?1599710453',
    name = "Fire-Lit Thicket",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'GR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/1/b18fe7e0-8344-40cc-b242-83f01c6be7a6.jpg?1702429548',
    name = "Chord of Calling",
    mana_cost = '{X}{G}{G}{G}',
    cmc = 3,
    type_line = 'Instant',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/7/f/7fac6154-fb85-45e5-8c9f-f02d0f1be24e.jpg?1702429553',
    name = "Farseek",
    mana_cost = '{1}{G}',
    cmc = 2,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = 'G',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/e/3/e3c2c66c-f7f0-41d5-a805-a129aeaf1b75.jpg?1572491176',
    name = "Castle Garenbrig",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/a/4/a4b759f0-901f-4be3-93fa-224609b08d48.jpg?1604199124',
    name = "Lotus Cobra",
    mana_cost = '{1}{G}',
    cmc = 2,
    type_line = 'Creature — Snake',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/7/1/71727ccd-8243-48f2-a90e-6ae4b80bb61b.jpg?1698988629',
    name = "Smoldering Marsh",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Swamp Mountain',
    colors = '',
    color_identity = 'BR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/f/6f1bc3bb-46da-492a-850c-f1f588ad8d18.jpg?1698988492',
    name = "Xenagos, God of Revels",
    mana_cost = '{3}{R}{G}',
    cmc = 5,
    type_line = 'Legendary Enchantment Creature — God',
    colors = 'GR',
    color_identity = 'GR',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/c/dc63d2ea-a980-466e-9ebb-f28008f84c3d.jpg?1690004764',
    name = "Courser of Kruphix",
    mana_cost = '{1}{G}{G}',
    cmc = 3,
    type_line = 'Enchantment Creature — Centaur',
    colors = 'G',
    color_identity = 'G',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/0/10716909-1254-4b2b-997e-23a18994a98d.jpg?1674422216',
    name = "Llanowar Wastes",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'BG',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/a/baa54bbc-88dd-46ba-9a91-6291c3fb420f.jpg?1706240924',
    name = "Sakura-Tribe Elder",
    mana_cost = '{1}{G}',
    cmc = 2,
    type_line = 'Creature — Snake Shaman',
    colors = 'G',
    color_identity = 'G',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/1/61bd69ea-1e9e-46b0-b1a1-ed7fdbe3deb6.jpg?1604199791',
    name = "Turntimber Symbiosis",
    mana_cost = '{4}{G}{G}{G}',
    cmc = 0,
    type_line = 'Sorcery',
    colors = 'G',
    color_identity = '',
    rarity = ''
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/2/e/2eac0eaa-55b2-444a-863d-c66769aab4ee.jpg?1690004652',
    name = "Chandra, Torch of Defiance",
    mana_cost = '{2}{R}{R}',
    cmc = 4,
    type_line = 'Legendary Planeswalker — Chandra',
    colors = 'R',
    color_identity = 'R',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/0/10caa17e-3892-435a-8f48-f3d6e4619114.jpg?1706241136',
    name = "Cinder Glade",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Mountain Forest',
    colors = '',
    color_identity = 'GR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/6/1612bf83-c800-41de-ab06-fb1732d5b5a6.jpg?1637631349',
    name = "Yavimaya Elder",
    mana_cost = '{1}{G}{G}',
    cmc = 3,
    type_line = 'Creature — Human Druid',
    colors = 'G',
    color_identity = 'G',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/7/b/7b215968-93a6-4278-ac61-4e3e8c3c3943.jpg?1566971561',
    name = "Nicol Bolas, the Ravager",
    mana_cost = '{1}{U}{B}{R}',
    cmc = 0,
    type_line = 'Legendary Creature — Elder Dragon',
    colors = 'BRU',
    color_identity = '',
    rarity = ''
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/7/6700409d-afda-480c-8a66-b5c782f3e5e4.jpg?1698988120',
    name = "Aetherize",
    mana_cost = '{3}{U}',
    cmc = 4,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/9/e/9e61209b-0f56-4bab-9ada-700f91b18dec.jpg?1562928403',
    name = "Ashes to Ashes",
    mana_cost = '{1}{B}{B}',
    cmc = 3,
    type_line = 'Sorcery',
    colors = 'B',
    color_identity = 'B',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/f/c/fc81669c-af6e-4af4-b1eb-43ff7fdda590.jpg?1673305468',
    name = "Bedevil",
    mana_cost = '{B}{B}{R}',
    cmc = 3,
    type_line = 'Instant',
    colors = 'BR',
    color_identity = 'BR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/e/8/e842b4bb-a1b7-440b-a0da-856fb0eea4c4.jpg?1706240756',
    name = "Black Sun's Zenith",
    mana_cost = '{X}{B}{B}',
    cmc = 2,
    type_line = 'Sorcery',
    colors = 'B',
    color_identity = 'B',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/a/8aa9682d-5176-4475-a0bd-e000f1d6999a.jpg?1698988297',
    name = "Blasphemous Act",
    mana_cost = '{8}{R}',
    cmc = 9,
    type_line = 'Sorcery',
    colors = 'R',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/0/9/0994aef4-b341-45f4-8881-523565a5956e.jpg?1702429795',
    name = "Blood Crypt",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Swamp Mountain',
    colors = '',
    color_identity = 'BR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/0/5/059e8447-6b1c-4651-a734-a8fea2cbf7b2.jpg?1604195360',
    name = "Bloodchief's Thirst",
    mana_cost = '{B}',
    cmc = 1,
    type_line = 'Sorcery',
    colors = 'B',
    color_identity = 'B',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/5/0/500a2aa4-712f-41be-920e-f2f448ff83d0.jpg?1562435461',
    name = "Blue Sun's Zenith",
    mana_cost = '{X}{U}{U}{U}',
    cmc = 3,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/4/84479779-d570-4eee-9982-f6e918b4d75b.jpg?1706240670',
    name = "Brainstorm",
    mana_cost = '{U}',
    cmc = 1,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/7/b76f2de1-ea17-40b0-8d90-4c4369516eff.jpg?1706241128',
    name = "Canopy Vista",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Forest Plains',
    colors = '',
    color_identity = 'GW',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/c/8cb273d9-466d-416d-b27d-d1bc8a249076.jpg?1543676351',
    name = "Canyon Slough",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Swamp Mountain',
    colors = '',
    color_identity = 'BR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/c/dcf70844-18b1-4046-ae1d-ef41790bdcde.jpg?1674142829',
    name = "Castle Vantress",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'U',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/a/b/aba4cc8a-05f3-499d-96c2-0edee9fc0ba0.jpg?1706240824',
    name = "Chaos Warp",
    mana_cost = '{2}{R}',
    cmc = 3,
    type_line = 'Instant',
    colors = 'R',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/4/b4b99ebb-0d54-4fe5-a495-979aaa564aa8.jpg?1669839436',
    name = "Clearwater Pathway",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = ''
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/4/8493131c-0a7b-4be6-a8a2-0b425f4f67fb.jpg?1689996248',
    name = "Counterspell",
    mana_cost = '{U}{U}',
    cmc = 2,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/f/9/f99f864e-a10f-47f4-94c5-4571b5c11b3b.jpg?1547518010',
    name = "Countersquall",
    mana_cost = '{U}{B}',
    cmc = 2,
    type_line = 'Instant',
    colors = 'BU',
    color_identity = 'BU',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/7/d71a8ea5-199e-473e-a2b1-e2f7cc804ffc.jpg?1592765938',
    name = "Cruel Ultimatum",
    mana_cost = '{U}{U}{B}{B}{B}{R}{R}',
    cmc = 7,
    type_line = 'Sorcery',
    colors = 'BRU',
    color_identity = 'BRU',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/e/be1434e1-a0d6-4028-918b-1e2d17d3a227.jpg?1562933235',
    name = "Crush of Tentacles",
    mana_cost = '{4}{U}{U}',
    cmc = 6,
    type_line = 'Sorcery',
    colors = 'U',
    color_identity = 'U',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/c/a/cab5b199-e79d-4ca9-970c-cfd9df8fd1e4.jpg?1562814658',
    name = "Crypt of the Eternals",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'BRU',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/3/0/30f6fca9-003b-4f6b-9d6e-1e88adda4155.jpg?1562847413',
    name = "Cryptic Command",
    mana_cost = '{1}{U}{U}{U}',
    cmc = 4,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/3/d3c0aac5-b9f1-4446-bfea-3e1dd1cf1f2f.jpg?1673147492',
    name = "Damnation",
    mana_cost = '{2}{B}{B}',
    cmc = 4,
    type_line = 'Sorcery',
    colors = 'B',
    color_identity = 'B',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.jpg?1628801678',
    name = "Dark Ritual",
    mana_cost = '{B}',
    cmc = 1,
    type_line = 'Instant',
    colors = 'B',
    color_identity = 'B',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/c/bcbda15b-e49a-4445-a0e1-f221aa82c1e8.jpg?1675957267',
    name = "Darkslick Shores",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'BU',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/a/2/a24b4cb6-cebb-428b-8654-74347a6a8d63.jpg?1701989302',
    name = "Demonic Tutor",
    mana_cost = '{1}{B}',
    cmc = 2,
    type_line = 'Sorcery',
    colors = 'B',
    color_identity = 'B',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/7/6/76c57c43-18be-4eee-afa4-111269d8ad87.jpg?1698988318',
    name = "Dire Fleet Daredevil",
    mana_cost = '{1}{R}',
    cmc = 2,
    type_line = 'Creature — Human Pirate',
    colors = 'R',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/2/5/25f05814-a5a5-460f-9d29-0ab03efecf4c.jpg?1576381471',
    name = "Disallow",
    mana_cost = '{1}{U}{U}',
    cmc = 3,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/5/b/5b08b019-796b-4304-806f-59bf7d22b729.jpg?1706240109',
    name = "Discovery // Dispersal",
    mana_cost = '{1}{U/B} // {3}{U}{B}',
    cmc = 7,
    type_line = 'Sorcery // Instant',
    colors = 'BU',
    color_identity = 'BU',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/5/8/588c6217-c460-417e-98bf-de5475780baf.jpg?1693867173',
    name = "Disdainful Stroke",
    mana_cost = '{1}{U}',
    cmc = 2,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/c/8c5a9cb7-6c97-47fd-acd0-bc6dd11b77b4.jpg?1673306001',
    name = "Dragonskull Summit",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'BR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/a/5/a5134828-5876-4d17-b0bb-f7e80e54c100.jpg?1702429625',
    name = "Dreadbore",
    mana_cost = '{B}{R}',
    cmc = 2,
    type_line = 'Sorcery',
    colors = 'BR',
    color_identity = 'BR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/e/8ef728f1-5153-47d6-8f9c-dfd473ee0750.jpg?1562559858',
    name = "Drowned Catacomb",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'BU',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/7/6741ab27-9e1f-4aa5-96b9-b450eda7c5c2.jpg?1625978606',
    name = "Elixir of Immortality",
    mana_cost = '{1}',
    cmc = 1,
    type_line = 'Artifact',
    colors = '',
    color_identity = '',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/7/b7ad4441-e300-4267-bedb-4ae6a64f59cd.jpg?1673306711',
    name = "Essence Scatter",
    mana_cost = '{1}{U}',
    cmc = 2,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/e/be082a49-1a90-48fd-ba61-c26c90f1f64e.jpg?1702429747',
    name = "Expansion // Explosion",
    mana_cost = '{U/R}{U/R} // {X}{U}{U}{R}{R}',
    cmc = 6,
    type_line = 'Instant // Instant',
    colors = 'RU',
    color_identity = 'RU',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/3/d313d051-7295-4884-8cbf-f2f835fd45f4.jpg?1594737636',
    name = "Fabled Passage",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/9/f/9f48e48d-6bc5-4f9c-9c3e-457cf6632cf5.jpg?1698988254',
    name = "Feed the Swarm",
    mana_cost = '{1}{B}',
    cmc = 2,
    type_line = 'Sorcery',
    colors = 'B',
    color_identity = 'B',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/4/0/404fb2b0-cce9-4fe2-8008-2c9fb29e710d.jpg?1706241155',
    name = "Fetid Pools",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Island Swamp',
    colors = '',
    color_identity = 'BU',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/4/7/470ca3f4-29aa-4c4c-8ff2-8cdd70c69943.jpg?1650599538',
    name = "Field of the Dead",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/8/1825a719-1b2a-4af9-9cd2-7cb497cd0317.jpg?1673147298',
    name = "Force of Negation",
    mana_cost = '{1}{U}{U}',
    cmc = 3,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/2/62b0b5f8-6b51-4fa5-85ae-290475525a9d.jpg?1625980082',
    name = "Forgotten Cave",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'R',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/f/1f5ddcf8-c87b-4a26-b226-8593f517a74a.jpg?1674135559',
    name = "Gale's Redirection",
    mana_cost = '{3}{U}{U}',
    cmc = 5,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/2/12f8071c-8955-4aa2-889c-6043df047223.jpg?1562272439',
    name = "Ghost Quarter",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/0/1/01852cd2-16e4-4518-b5d5-b9a378b8664d.jpg?1690016712',
    name = "Gonti, Lord of Luxury",
    mana_cost = '{2}{B}{B}',
    cmc = 4,
    type_line = 'Legendary Creature — Aetherborn Rogue',
    colors = 'B',
    color_identity = 'B',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/4/d420cc12-cfd7-4007-a0c2-b16c8f63a754.jpg?1562816057',
    name = "Hour of Devastation",
    mana_cost = '{3}{R}{R}',
    cmc = 5,
    type_line = 'Sorcery',
    colors = 'R',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/0/b/0b88728b-9b18-40c6-b634-f87f8da83665.jpg?1562788706',
    name = "Ifnir Deadlands",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Desert',
    colors = '',
    color_identity = 'B',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/1/8181f54d-4515-43c6-8d08-b23a9e4199cc.jpg?1682208779',
    name = "Imprisoned in the Moon",
    mana_cost = '{2}{U}',
    cmc = 3,
    type_line = 'Enchantment — Aura',
    colors = 'U',
    color_identity = 'U',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/c/1cb1ac28-ee04-4892-97ea-2cfdebbafcad.jpg?1708707317',
    name = "Island",
    mana_cost = '',
    cmc = 0,
    type_line = 'Basic Land — Island',
    colors = '',
    color_identity = 'U',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/2/82b1616a-75f6-4da1-821a-ff1b1071bce2.jpg?1706240216',
    name = "Izzet Signet",
    mana_cost = '{2}',
    cmc = 2,
    type_line = 'Artifact',
    colors = '',
    color_identity = 'RU',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/c/8/c8817585-0d32-4d56-9142-0d29512e86a9.jpg?1598304029',
    name = "Jace, the Mind Sculptor",
    mana_cost = '{2}{U}{U}',
    cmc = 4,
    type_line = 'Legendary Planeswalker — Jace',
    colors = 'U',
    color_identity = 'U',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/a/0/a0dab027-a475-481b-b012-b6a76e21e494.jpg?1673148845',
    name = "Kolaghan's Command",
    mana_cost = '{1}{B}{R}',
    cmc = 3,
    type_line = 'Instant',
    colors = 'BR',
    color_identity = 'BR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/7/7/77c6fa74-5543-42ac-9ead-0e890b188e99.jpg?1706239968',
    name = "Lightning Bolt",
    mana_cost = '{R}',
    cmc = 1,
    type_line = 'Instant',
    colors = 'R',
    color_identity = 'R',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/2/624feb0e-f683-4eb6-a63b-7872d0e28f1f.jpg?1619394325',
    name = "Logic Knot",
    mana_cost = '{X}{U}{U}',
    cmc = 2,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/a/8a8945b4-d2e1-4779-9c33-a8b062637fa6.jpg?1631587342',
    name = "Magmaquake",
    mana_cost = '{X}{R}{R}',
    cmc = 2,
    type_line = 'Instant',
    colors = 'R',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/7/179236d9-6fe2-4db6-bdfb-f851e8d531a2.jpg?1673147361',
    name = "Mana Leak",
    mana_cost = '{1}{U}',
    cmc = 2,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/8/d80eb098-5433-4b1e-aad5-0fd31bf598dd.jpg?1673306092',
    name = "Mikokoro, Center of the Sea",
    mana_cost = '',
    cmc = 0,
    type_line = 'Legendary Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/5/e/5ed398e7-9d2b-4bd2-9a4b-2885e4749003.jpg?1706240710',
    name = "Mission Briefing",
    mana_cost = '{U}{U}',
    cmc = 2,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/c/1/c1bba8fb-d763-4efa-8db1-e5e81994b5f9.jpg?1708704819',
    name = "Mountain",
    mana_cost = '',
    cmc = 0,
    type_line = 'Basic Land — Mountain',
    colors = '',
    color_identity = 'R',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/0/80fffad3-2486-4350-8dff-54a215ebfc28.jpg?1682209129',
    name = "Murderous Rider // Swift End",
    mana_cost = '{1}{B}{B} // {1}{B}{B}',
    cmc = 3,
    type_line = 'Creature — Zombie Knight // Instant — Adventure',
    colors = 'B',
    color_identity = 'B',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/a/9/a959b40d-dd8c-49d8-8003-744d0c877b04.jpg?1608912140',
    name = "Nezahal, Primal Tide",
    mana_cost = '{5}{U}{U}',
    cmc = 7,
    type_line = 'Legendary Creature — Elder Dinosaur',
    colors = 'U',
    color_identity = 'U',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/c/5/c5408607-af8f-48fe-bc40-32828d1976de.jpg?1702429680',
    name = "Nicol Bolas, Dragon-God",
    mana_cost = '{U}{B}{B}{B}{R}',
    cmc = 5,
    type_line = 'Legendary Planeswalker — Bolas',
    colors = 'BRU',
    color_identity = 'BRU',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/7/b/7be6bedd-8d38-4bd9-aa93-29f88a7f0126.jpg?1702429680',
    name = "Niv-Mizzet, Parun",
    mana_cost = '{U}{U}{U}{R}{R}{R}',
    cmc = 6,
    type_line = 'Legendary Creature — Dragon Wizard',
    colors = 'RU',
    color_identity = 'RU',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/3/2/323db259-d35e-467d-9a46-4adcb2fc107c.jpg?1652898493',
    name = "Opt",
    mana_cost = '{U}',
    cmc = 1,
    type_line = 'Instant',
    colors = 'U',
    color_identity = 'U',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/3/83fe992f-0441-42be-89f9-2387b4bc24ce.jpg?1562926087',
    name = "Part the Waterveil",
    mana_cost = '{4}{U}{U}',
    cmc = 6,
    type_line = 'Sorcery',
    colors = 'U',
    color_identity = 'U',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/e/6e288374-2b71-4ace-b1d2-a19fee6cb4af.jpg?1708707795',
    name = "Polluted Delta",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/4/4/44dcfc0c-b23d-48be-bf3a-a6fc6806c5e1.jpg?1673483971',
    name = "Ponder",
    mana_cost = '{U}',
    cmc = 1,
    type_line = 'Sorcery',
    colors = 'U',
    color_identity = 'U',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/1/d10b9be3-d4ff-4e3c-b0d5-5ab2c4e6d684.jpg?1691417733',
    name = "Preordain",
    mana_cost = '{U}',
    cmc = 1,
    type_line = 'Sorcery',
    colors = 'U',
    color_identity = 'U',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/c/5/c52066b3-84dc-4198-8090-3336e7df8b5d.jpg?1572893786',
    name = "Ral, Izzet Viceroy",
    mana_cost = '{3}{U}{R}',
    cmc = 5,
    type_line = 'Legendary Planeswalker — Ral',
    colors = 'RU',
    color_identity = 'RU',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/2/6/2668ac91-6cda-4f81-a08d-4fc5f9cb35b2.jpg?1669839416',
    name = "Riverglide Pathway",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = ''
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/e/d/ed34e8de-d63a-4e4f-b9d4-80f66bb20641.jpg?1689999788',
    name = "Sapphire Medallion",
    mana_cost = '{2}',
    cmc = 2,
    type_line = 'Artifact',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/7/1/71e491c5-8c07-449b-b2f1-ffa052e6d311.jpg?1707235013',
    name = "Scalding Tarn",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/a/1a7e242e-bb48-4134-a1c2-6033713d658f.jpg?1665819797',
    name = "Search for Azcanta",
    mana_cost = '{1}{U}',
    cmc = 0,
    type_line = 'Legendary Enchantment',
    colors = 'U',
    color_identity = '',
    rarity = ''
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/8/4/8405a6c8-1dfb-4ac5-b44c-bce9e4bcc38c.jpg?1636209677',
    name = "Serum Visions",
    mana_cost = '{U}',
    cmc = 1,
    type_line = 'Sorcery',
    colors = 'U',
    color_identity = 'U',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/f/7/f7a1aa93-26d1-40b0-82d8-414f56a36337.jpg?1697121230',
    name = "Shatterstorm",
    mana_cost = '{2}{R}{R}',
    cmc = 4,
    type_line = 'Sorcery',
    colors = 'R',
    color_identity = 'R',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/4/14f42cc9-8b7f-4f8a-8d68-8480e668c239.jpg?1690005734',
    name = "Silent Arbiter",
    mana_cost = '{4}',
    cmc = 4,
    type_line = 'Artifact Creature — Construct',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/9/d9e098aa-a886-430e-8f11-78fb6f2d8ada.jpg?1706241086',
    name = "Sol Ring",
    mana_cost = '{1}',
    cmc = 1,
    type_line = 'Artifact',
    colors = '',
    color_identity = '',
    rarity = 'uncommon'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/a/6/a69541db-3f4e-412f-aa8e-dec1e74f74dc.jpg?1604198070',
    name = "Spikefield Hazard",
    mana_cost = '{R}',
    cmc = 0,
    type_line = 'Instant',
    colors = 'R',
    color_identity = '',
    rarity = ''
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/5/2/526d13cb-3616-4ac8-9ac0-04c729d447b2.jpg?1689998213',
    name = "Star of Extinction",
    mana_cost = '{5}{R}{R}',
    cmc = 7,
    type_line = 'Sorcery',
    colors = 'R',
    color_identity = 'R',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/6/66d618f4-443c-4a6c-8cbd-5d4ea96b2cd4.jpg?1702429824',
    name = "Steam Vents",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Island Mountain',
    colors = '',
    color_identity = 'RU',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/f/a/fae97b42-b84b-4a12-91f4-9d115b58729a.jpg?1698988629',
    name = "Sulfur Falls",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'RU',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/f/dfd5450a-6490-417f-9aea-b6fca6f380d7.jpg?1673308373',
    name = "Sulfurous Springs",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'BR',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/c/8/c8e3909e-e00a-4855-a0be-b1c538f89cb8.jpg?1708707363',
    name = "Swamp",
    mana_cost = '',
    cmc = 0,
    type_line = 'Basic Land — Swamp',
    colors = '',
    color_identity = 'B',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/d/7/d77363b9-276b-421d-b422-8c9a3838d118.jpg?1690006688',
    name = "Temple of Epiphany",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'RU',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/0/4/0476ea45-ee6d-41c6-93b8-50f92cb37b78.jpg?1673305697',
    name = "Terminate",
    mana_cost = '{B}{R}',
    cmc = 2,
    type_line = 'Instant',
    colors = 'BR',
    color_identity = 'BR',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/1/9/19b72af8-9bb9-4542-9115-09c27ad6e7ad.jpg?1698988643',
    name = "Terramorphic Expanse",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = '',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/f/4/f4f414ef-84a2-4694-9e98-51bee4576c84.jpg?1689999233',
    name = "The Scarab God",
    mana_cost = '{3}{U}{B}',
    cmc = 5,
    type_line = 'Legendary Creature — God',
    colors = 'BU',
    color_identity = 'BU',
    rarity = 'mythic'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/b/6bd85a34-c5f8-4d3a-8f12-4bbf42f1f638.jpg?1698988201',
    name = "Thieving Skydiver",
    mana_cost = '{1}{U}',
    cmc = 2,
    type_line = 'Creature — Merfolk Rogue',
    colors = 'U',
    color_identity = 'U',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/f/3/f3d62dbd-63db-4ac9-950f-9852627f23f2.jpg?1562946525',
    name = "Time Spiral",
    mana_cost = '{4}{U}{U}',
    cmc = 6,
    type_line = 'Sorcery',
    colors = 'U',
    color_identity = 'U',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/4/64edb748-497d-4737-9d7f-37105fb20cb9.jpg?1673484053',
    name = "Treasure Cruise",
    mana_cost = '{7}{U}',
    cmc = 8,
    type_line = 'Sorcery',
    colors = 'U',
    color_identity = 'U',
    rarity = 'common'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/9/e/9e1a9e38-6ffc-490f-b0be-23ba4e8204c6.jpg?1619399578',
    name = "Urborg, Tomb of Yawgmoth",
    mana_cost = '',
    cmc = 0,
    type_line = 'Legendary Land',
    colors = '',
    color_identity = '',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/b/d/bd7550dd-dfc5-43cd-a117-1244ee3086a8.jpg?1562563183',
    name = "Vraska's Contempt",
    mana_cost = '{2}{B}{B}',
    cmc = 4,
    type_line = 'Instant',
    colors = 'B',
    color_identity = 'B',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/c/e/ce3a6a8e-a01e-4d14-a6e5-c02c8205c749.jpg?1674143256',
    name = "Wandering Fumarole",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land',
    colors = '',
    color_identity = 'RU',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/6/e/6e86eb36-f4cc-4a75-b43a-4dee463a3b33.jpg?1702429828',
    name = "Watery Grave",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Island Swamp',
    colors = '',
    color_identity = 'BU',
    rarity = 'rare'
  ),
  Card(
    image_url = 'https://cards.scryfall.io/normal/front/5/4/54f449ff-4025-465e-9ec5-a5cf42c4c9d3.jpg?1664414651',
    name = "Xander's Lounge",
    mana_cost = '',
    cmc = 0,
    type_line = 'Land — Island Swamp Mountain',
    colors = '',
    color_identity = 'BRU',
    rarity = 'rare'
  )
]
  for card in cards:
    db.session.add(card)
  db.session.commit()
  return cards




def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))
        
    db.session.commit()
