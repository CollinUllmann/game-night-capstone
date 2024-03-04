

import { useDispatch, useSelector } from 'react-redux'
import './MatchTile.css'
import { FaTrashAlt } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { thunkDeleteMatch } from '../../../redux/match';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { thunkFetchDeckById } from '../../../redux/deck';


export function MatchTile({ match, onClick, matchNum }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const decks = useSelector(state => state.decks)
  const cards = useSelector(state => state.cards)
  const [decksList, setDecksList] = useState([])
  useEffect(() => {
    match.deckIds.forEach(deckId => {
      dispatch(thunkFetchDeckById(deckId)).then(() => {
        setDecksList(prevDecksList => [...prevDecksList, decks[deckId]])
      })
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

  let key = 0;
  return (
    <div onClick={onClick} style={{backgroundColor: 'gray'}} className="match-tile-div">
      <div className='match-tile-content-div'>
        <p className='match-tile-match-name'>Match {matchNum}</p>
        <div className='match-tile-deck-div'>
          {decksList.map(deck => <div key={key++} style={{backgroundImage: `url(${cards[deck.cards[0].cardId].imageUrl})`, backgroundPositionX: '50%', backgroundPositionY: '22%', }} className={isWinningDeck(deck)} /> )}
        </div>
      </div>
      
      <div className='match-tile-icon-div'>
        <FaTrashAlt className="match-tile-delete icon" onClick={handleDelete} />
        <RxUpdate className="match-tile-update icon" onClick={() => navigate(`/matches/${match.id}/update`)}/>
      </div>
    </div>
  )
}