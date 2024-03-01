import { useSelector } from "react-redux";
import { CardTile } from "./CardTile";

export function DecklistPanel({ deckId }) {

  const cardById = useSelector(state => state.cards);
  const deckById = useSelector(state => state.decks)
  const deck = deckById[deckId]

  const cards = deck?.cards.map(deckCard => cardById[deckCard.cardId])

  return (
    <div className="decklist-panel-div">
      {cards?.map(card => <CardTile key={card.id} card={card} />)}
    </div>
  )
}