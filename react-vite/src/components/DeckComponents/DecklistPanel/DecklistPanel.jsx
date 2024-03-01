import { useSelector } from "react-redux";
import { CardTile } from "./CardTile";

export function DecklistPanel({ deckId }) {

  const decksObj = useSelector(state => state.decks)
  const deck = decksObj[deckId]

  return (
    <div className="decklist-panel-div">
      {deck?.cards.map(card => <CardTile key={card.id} card={card} />)}
    </div>
  )
}