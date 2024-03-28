

import { useDispatch, useSelector } from 'react-redux'
import './MatchTile.css'
// import { FaTrashAlt } from "react-icons/fa";
// import { RxUpdate } from "react-icons/rx";
// import { thunkDeleteMatch } from '../../../redux/match';
// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { thunkFetchDeckById } from '../../../redux/deck';
import { thunkFetchAllEvents } from '../../../redux/event';

import OpenModalDeleteIcon from '../../DeckComponents/DeckTile/OpenDeleteIconModal';
import { DeleteMatchConfirmationModal } from './DeleteMatchConfirmationModal';
import OpenModalUpdateIcon from '../../DeckComponents/DeckTile/OpenUpdateIconModal';
import { MatchFormModal } from '../MatchFormModal/MatchFormModal';


export function MatchTile({ match, onClick, matchNum }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const decks = useSelector(state => state.decks)
  // const cards = useSelector(state => state.cards)
  const eventById = useSelector(state => state.events)
  
  useEffect(() => {
    dispatch(thunkFetchAllEvents())
  }, [dispatch])

  useEffect(() => {
    match.deckIds.forEach(deckId => {
      dispatch(thunkFetchDeckById(deckId))
    })
  }, [match, dispatch])

  // const handleDelete = (e) => {
  //   e.stopPropagation();
  //   dispatch(thunkDeleteMatch(match.id))
  // }

  // const handleUpdate = (e) => {
  //   e.stopPropagation();
  //   navigate(`/matches/${match.id}/update`)
  // }
  
  const isWinningDeck = (deck) => {
    if (deck.userId == match.userIdWinner) {
      return 'match-tile-deck-img winning-deck-tile'
    } else {
      return 'match-tile-deck-img'
    }
  }

  return (
    <div onClick={onClick} style={{backgroundColor: 'rgba(0, 0, 0, 0.300)'}} className="match-tile-div">
      <div className='match-tile-content-div'>
        <p className='match-tile-match-name'>Match {matchNum}</p>
        <p className='match-tile-event-name'>{eventById[match.eventId]?.name}</p>
        <div className='match-tile-deck-div'>
          {match.deckIds.map(deckId => {
            const deck = decks[deckId];
            if (!deck) return undefined
            
            // const firstCardId = deck.cards[0].cardId;
            // const firstCard = firstCardId != null ? cards[firstCardId] : undefined;
            return <div
              key={deckId}
              style={{
                backgroundImage: `url(${deck.previewImage})`,
                backgroundPositionX: '50%',
                backgroundPositionY: '22%',
              }}
              className={isWinningDeck(deck)}
            ></div>
          })}
        </div>
      </div>
      
      <div className='match-tile-icon-div'>
        <div className="match-tile-update icon">
          <OpenModalUpdateIcon modalComponent={<MatchFormModal formtype={'update'} matchId={match?.id}/>} />
        </div>
        {/* <RxUpdate className="match-tile-update icon" onClick={handleUpdate}/> */}
        <div  className="match-tile-delete icon">
          <OpenModalDeleteIcon modalComponent={<DeleteMatchConfirmationModal matchId={match?.id}/>}/>
        </div>
        {/* <FaTrashAlt className="match-tile-delete icon" onClick={handleDelete} /> */}
      </div>
    </div>
  )
}