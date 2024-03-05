import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import '../MatchFormPage.css'


export function MatchDeckSelector({ index, deckId, onChangeDeckId }) {
  const userById = useSelector(state => state.users)
  const users = Object.values(userById)

  const deckById = useSelector(state => state.decks)

  const [userId, setUserId] = useState(deckById[deckId]?.userId);


  return (
    <div className="match-form-player-input-div">
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
              users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)
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
    </div>
  )
}