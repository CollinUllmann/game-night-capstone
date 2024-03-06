
// import { useSelector } from "react-redux";

import { useDispatch, useSelector } from 'react-redux'
import './DeckTile.css'
// import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
// import DeckDeleteConfirmationModal from '../../DeckDeleteConfirmationModal/DeckDeleteConfirmationModal'
import { FaTrashAlt } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { thunkDeleteDeck } from '../../../redux/deck';
import { useNavigate } from 'react-router-dom';
import { ManaSymbol } from '../../ManaSymbol/ManaSymbol';


export function DeckTile({ deck, onClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const cardsById = useSelector(state => state.cards)
  const currentUser = useSelector(state => state.session.user)


  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(thunkDeleteDeck(deck.id))
  }

  const handleNavigate = (e) => {
    e.stopPropagation()
    navigate(`/decks/${deck.id}/update`)
  }

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
            <p className='deck-tile-win-percent'>50%</p>
          </div>
          <div className='deck-tile-matches-div'>
            <p className='deck-tile-matches-title'>Matches</p>
            <p className='deck-tile-matches'>5-5</p>
          </div>
        </div>
        {/* {deck.cards.map(card => <p key={card.id}>{card.name}</p>)} */}
      </div>
      {currentUser?.id == deck.userId && 
        <div className='deck-tile-icon-div'>
          <FaTrashAlt className="deck-tile-delete icon" onClick={handleDelete} />
          <RxUpdate className="deck-tile-update icon" onClick={handleNavigate}/>
        </div>
      
      }
      {/* <OpenModalMenuItem
        itemText="Delete"
        modalComponent={<DeckDeleteConfirmationModal deckId={deck.id} />}
      /> */}
    </div>
  )
}