
import { useSelector } from "react-redux";

import './DeckTile.css'


export function DeckTile(deck) {

  // const deckObj = useSelector(state => state.decks[deck?.id])
  // console.log('deckObj: ', deckObj)

  console.log('deck: ', deck)
  console.log('url: ', deck.deck.cards[0].imageUrl)

  return (
    <div className="deck-tile-div">
      <h3>{deck?.deck?.name}</h3>
      {deck?.deck?.cards?.map(card => <p key={card?.id}>{card.name}</p>)}

    </div>
  )
}