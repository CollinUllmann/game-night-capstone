

import { useDispatch, useSelector } from 'react-redux'
import './MatchTile.css'
import { FaTrashAlt } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { thunkDeleteMatch } from '../../../redux/match';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { thunkFetchDeckById } from '../../../redux/deck';


export function MatchTile({ match, onClick, matchNum }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const decks = useSelector(state => state.decks)
  const cards = useSelector(state => state.cards)
  useEffect(() => {
    match.deckIds.forEach(deckId => {
      dispatch(thunkFetchDeckById(deckId))
    })
  }, [match, dispatch])

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(thunkDeleteMatch(match.id))
  }
  
  const isWinningDeck = (deck) => {
    if (deck.userId == match.userIdWinner) {
      return 'match-tile-deck-img winning-deck-tile'
    } else {
      return 'match-tile-deck-img'
    }
  }

  return (
    <div onClick={onClick} style={{backgroundColor: 'gray'}} className="match-tile-div">
      <div className='match-tile-content-div'>
        <p className='match-tile-match-name'>Match {matchNum}</p>
        <div className='match-tile-deck-div'>
          {match.deckIds.map(deckId => {
            const deck = decks[deckId];
            const firstCardId = deck.cards[0]?.cardId;
            const firstCard = firstCardId != null ? cards[firstCardId] : undefined;
            return !deck ? <></> : <div
              key={deckId}
              style={{
                backgroundImage: `url(${firstCard?.imageUrl})`,
                backgroundPositionX: '50%',
                backgroundPositionY: '22%',
              }}
              className={isWinningDeck(deck)}
            ></div>
          })}
        </div>
      </div>
      
      <div className='match-tile-icon-div'>
        <FaTrashAlt className="match-tile-delete icon" onClick={handleDelete} />
        <RxUpdate className="match-tile-update icon" onClick={() => navigate(`/matches/${match.id}/update`)}/>
      </div>
    </div>
  )
}