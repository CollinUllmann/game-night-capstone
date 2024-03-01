
// import { useSelector } from "react-redux";

import './DeckTile.css'


export function DeckTile({ deck, onClick }) {

  // const deckObj = useSelector(state => state.decks[deck?.id])
  // console.log('deckObj: ', deckObj)

  // console.log('deck: ', deck)
  // console.log('url: ', deck.deck.cards[0].imageUrl)

  return (
    <div onClick={onClick} style={{backgroundImage: `url(${deck.cards[0]?.imageUrl})`, backgroundPositionX: '50%', backgroundPositionY: '25%', }} className="deck-tile-div">
      <div className='deck-tile-content-div'>
        <p className='deck-tile-deck-name'>{deck.name}</p>
        <p className='deck-tile-deck-format'>{deck.format}</p>
        {/* {deck.cards.map(card => <p key={card.id}>{card.name}</p>)} */}
      </div>
    </div>
  )
}