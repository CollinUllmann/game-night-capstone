import { useDispatch, useSelector } from "react-redux";
import { CardTile } from "./CardTile";
import { useEffect } from "react";
import { thunkFetchAllCards } from "../../../redux/card";
import { thunkFetchAllDecks } from "../../../redux/deck";

export function DecklistPanel({ deckId }) {
  const dispatch = useDispatch();

  const cardById = useSelector(state => state.cards);
  const deckById = useSelector(state => state.decks)
  const deck = deckById[deckId]

  useEffect(() => {
    dispatch(thunkFetchAllCards)
    dispatch(thunkFetchAllDecks)
  })


  const cardCounts = deck?.cards.map(deckCard =>({count: deckCard.count, card: cardById[deckCard.cardId]})).filter(cardCount => cardCount.card)

  return (
    <div className="decklist-panel-div">
      {cardCounts?.map(cardCount => <CardTile key={cardCount.card.id} card={cardCount.card} count={cardCount.count} />)}
    </div>
  )
}