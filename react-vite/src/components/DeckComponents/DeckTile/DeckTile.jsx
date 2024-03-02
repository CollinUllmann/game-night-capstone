
// import { useSelector } from "react-redux";

import { useDispatch, useSelector } from 'react-redux'
import './DeckTile.css'
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import DeckDeleteConfirmationModal from '../../DeckDeleteConfirmationModal/DeckDeleteConfirmationModal'
import { FaTrashAlt } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { thunkDeleteDeck } from '../../../redux/deck';
import { Navigate, useNavigate } from 'react-router-dom';


export function DeckTile({ deck, onClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const cardsById = useSelector(state => state.cards)
  const currentUser = useSelector(state => state.session.user)

  console.log(currentUser)

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(thunkDeleteDeck(deck.id))
  }

  return (
    <div onClick={onClick} style={{backgroundImage: `url(${cardsById[deck.cards[0]?.cardId]?.imageUrl})`, backgroundPositionX: '50%', backgroundPositionY: '25%', }} className="deck-tile-div">
      <div className='deck-tile-content-div'>
        <p className='deck-tile-deck-name'>{deck.name}</p>
        <p className='deck-tile-deck-format'>{deck.format}</p>
        {/* {deck.cards.map(card => <p key={card.id}>{card.name}</p>)} */}
      </div>
      {currentUser?.id == deck.userId && 
        <div className='deck-tile-icon-div'>
          <FaTrashAlt className="deck-tile-delete icon" onClick={handleDelete} />
          <RxUpdate className="deck-tile-update icon" onClick={() => navigate(`/decks/${deck.id}/update`)}/>
        </div>
      
      }
      {/* <OpenModalMenuItem
        itemText="Delete"
        modalComponent={<DeckDeleteConfirmationModal deckId={deck.id} />}
      /> */}
    </div>
  )
}