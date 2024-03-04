import { useState } from "react";
import { useSelector } from "react-redux";


export function MatchDeckSelector({ index, deckId, onChangeDeckId }) {
  const users = [
    { id: 1, name: 'Demo' },
    { id: 2, name: 'Marnie' },
    { id: 3, name: 'Bobbie' },
    { id: 4, name: 'Billy' },
  ]

  const deckById = useSelector(state => state.decks)

  const [userId, setUserId] = useState();

  return (
    <>
      <label className="match-form-input">
          Player {index+1}
          <select
            name="userId"
            value={userId}
            onChange={(e) => {
              const newUserId = e.target.value
              setUserId(newUserId)
              if (userId != newUserId) {
                onChangeDeckId(undefined)
              }
            }}
          >
            <option value="">(Pick One)</option>
            {
              users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
            }
          </select>
        </label>
        <label className="match-form-input">
        Player {index+1} Deck
          <select
            name="userDeck"
            value={deckId}
            onChange={(e) => onChangeDeckId(e.target.value)}
          >
            <option value="">(Pick One)</option>
            {Object.values(deckById)?.filter(deck => deck.userId == userId).map(deck => <option key={deck.id} value={deck.id}>{deck.name}</option>)}
          </select>
        </label>
    </>
  )
}