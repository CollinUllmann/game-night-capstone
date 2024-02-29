
import { useSelector } from "react-redux";


export function DeckTile(deck) {

  // const deckObj = useSelector(state => state.decks[deck?.id])
  // console.log('deckObj: ', deckObj)

  console.log('deck: ', deck)

  return (
    <div className="deck-tile-div">
      <h3>{deck?.deck?.name}</h3>
      {deck?.deck?.cards?.map(card => <p key={card?.id}>{card.name}</p>)}

    </div>
  )
}