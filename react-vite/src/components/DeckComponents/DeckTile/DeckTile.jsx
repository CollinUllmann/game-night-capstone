
// import { useSelector } from "react-redux";

import { useDispatch, useSelector } from 'react-redux'
import './DeckTile.css'
// import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
// import DeckDeleteConfirmationModal from '../../DeckDeleteConfirmationModal/DeckDeleteConfirmationModal'
// import { FaTrashAlt } from "react-icons/fa";
// import { RxUpdate } from "react-icons/rx";
// import { thunkDeleteDeck } from '../../../redux/deck';
// import { useNavigate } from 'react-router-dom';
import { ManaSymbol } from '../../ManaSymbol/ManaSymbol';
import { useEffect } from 'react';
import { thunkFetchAllCards } from '../../../redux/card';
import { thunkFetchUserById } from '../../../redux/users';
import { thunkFetchAllMatches } from '../../../redux/match';
import OpenModalUpdateIcon from './OpenUpdateIconModal';
import { DeckFormModal } from '../DeckFormModal/DeckFormModal';
import OpenModalDeleteIcon from './OpenDeleteIconModal';
import { DeleteDeckConfirmationModal } from './DeleteDeckConfirmationModal';

export function DeckTile({ deck, onClick }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const cardsById = useSelector(state => state.cards)
  const currentUser = useSelector(state => state.session.user)
  const matchesById = useSelector(state => state.matches)

  useEffect(() => {
    dispatch(thunkFetchAllCards())
    dispatch(thunkFetchUserById(deck.userId))
    dispatch(thunkFetchAllMatches())
  }, [dispatch, deck.userId])


  // const handleDelete = (e) => {
  //   e.stopPropagation();
  //   dispatch(thunkDeleteDeck(deck.id))
  // }

  // const handleNavigate = (e) => {
  //   e.stopPropagation()
  //   navigate(`/decks/${deck.id}/update`)
  // }

  if (!matchesById) return

  const deckMatches = Object.values(matchesById).filter(match => {
    for (const deckId of match.deckIds) {
      if (deckId == deck.id) {
        return true
      }
    }
    return false
  })
  const deckMatchesWon = deckMatches.filter(match => match.userIdWinner == deck.userId)
  const winPercent = deckMatchesWon.length / deckMatches.length

  const deckColors = new Set([])
  for (const card of deck.cards) {
    const cardObj = cardsById[card.cardId]
    const splitColors = cardObj?.colors.split('') ?? []
    for (const color of splitColors) {
      deckColors.add(`{${color}}`)
    }
  }
  const deckColorsArr = [...deckColors]

  // function handleNavigate(e) {
  //   e.preventDefault()
  //   navigate(`/decks/${deck.id}/update`)
  // }

  let key = 0;
  return (
    <div onClick={onClick} style={{backgroundImage: `url(${cardsById[deck.cards[0]?.cardId]?.imageUrl})`, backgroundPositionX: '50%', backgroundPositionY: '25%', }} className="deck-tile-div">
      <div className='deck-tile-content-div'>
        <p className='deck-tile-deck-name'>{deck.name}</p>
        <p className='deck-tile-deck-format'>{deck.format}</p>
        <div className='deck-tile-mana-symbol-div'>{deckColorsArr.map(color => <ManaSymbol key={key++} symbol={color}/>)}</div>
        <div className='deck-tile-win-percent-matches-div'>
          <div className='deck-tile-win-percent-div'>
            <p className='deck-tile-win-percent-title'>Winrate</p>
            <p className='deck-tile-win-percent'>{winPercent ? Math.floor(winPercent * 100) : 0}%</p>
          </div>
          <div className='deck-tile-matches-div'>
            <p className='deck-tile-matches-title'>Matches</p>
            <p className='deck-tile-matches'>{deckMatchesWon.length}-{deckMatches.length - deckMatchesWon.length}</p>
          </div>
        </div>
        {/* {deck.cards.map(card => <p key={card.id}>{card.name}</p>)} */}
      </div>
      {currentUser?.id == deck.userId && 
        <div className='deck-tile-icon-div'>
          <div className="deck-tile-update icon">
            <OpenModalUpdateIcon modalComponent={<DeckFormModal deckId={deck.id} formtype={'update'}/>}/>
          </div>
          <div className='deck-tile-delete icon'>
            <OpenModalDeleteIcon modalComponent={<DeleteDeckConfirmationModal deckId={deck.id}/>}/>
          </div>
        </div>
      
      }
      {/* <OpenModalMenuItem
        itemText="Delete"
        modalComponent={<DeckDeleteConfirmationModal deckId={deck.id} />}
      /> */}
    </div>
  )
}