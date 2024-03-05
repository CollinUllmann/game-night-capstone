import { useSelector } from "react-redux";
import { CardTile } from "./CardTile";

export function DecklistPanel({ deckId }) {

  const cardById = useSelector(state => state.cards);
  const deckById = useSelector(state => state.decks)
  const deck = deckById[deckId]


  const cardCounts = deck?.cards.map(deckCard =>({count: deckCard.count, card: cardById[deckCard.cardId]}))

  return (
    <div className="decklist-panel-div">
      {cardCounts?.map(cardCount => <CardTile key={cardCount.card.id} card={cardCount.card} count={cardCount.count} />)}
    </div>
  )
}