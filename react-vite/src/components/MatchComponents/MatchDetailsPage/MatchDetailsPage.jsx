import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DeckTile } from "../../DeckComponents/DeckTile/DeckTile";
import { DecklistPanel } from "../../DeckComponents/DecklistPanel/DecklistPanel";
import { MatchStats } from "./MatchStats/MatchStats";
import OpenModalUpdateIcon from "../../DeckComponents/DeckTile/OpenUpdateIconModal";
import OpenModalDeleteIcon from "../../DeckComponents/DeckTile/OpenDeleteIconModal";
import { MatchFormModal } from "../MatchFormModal/MatchFormModal";
import { DeleteMatchConfirmationModal } from "../MatchTile/DeleteMatchConfirmationModal";


import './MatchDetailsPage.css'
import { thunkFetchAllEvents } from "../../../redux/event";

import { MdEmojiEvents } from "react-icons/md";
import { RiBoxingFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";




export function MatchDetailsPage() {
  const {matchId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const sessionUser = useSelector((state) => state.session.user);
  const matchById = useSelector(state => state.matches)
  const decksById = useSelector(state => state.decks)
  const eventsById = useSelector(state => state.events);
  const match = matchById[matchId]
  const matchDecks = Object.values(decksById).filter(deck => {
    if (!match) return
    for (const deckId of match.deckIds) {
      if (deck.id == deckId) {
       return true
      }
   }
   return false
  })
  const eventId = match?.eventId;
  const event = eventId != null ? eventsById[eventId] : undefined;

  const winningDeckId = match ? Object.values(match.deckIds).filter(deckId => decksById[deckId]?.userId == match?.userIdWinner)[0] : undefined;
  
  useEffect(() => {
    dispatch(thunkFetchAllEvents())
  }, [dispatch])

  if (!winningDeckId) return
  // if (sessionUser?.id != match?.userId) return <Navigate to="/" replace={true} />;

  function onClickEventName() {
    if(eventId != null) {
      navigate(`/events/${eventId}`)
    }
  }
  
  let key = 1;
  return (
    <div>
      <div style={{display:'flex', alignItems:'center'}}>
        <p className="match-details-title"><MdEmojiEvents style={{height: '20px'}}/><span  style={{cursor: 'pointer'}} onClick={onClickEventName}>{event?.name} </span> <IoIosArrowForward /><RiBoxingFill style={{height: '20px'}}/><span className="page-title">Match Details</span></p>
        <div className="match-tile-update icon">
          <OpenModalUpdateIcon modalComponent={<MatchFormModal formtype={'update'} matchId={match?.id}/>} />
        </div>
        <div  className="match-tile-delete icon">
          <OpenModalDeleteIcon modalComponent={<DeleteMatchConfirmationModal matchId={match?.id}/>}/>
        </div>
      </div>
      <div className="match-details-div">
        <div className="match-details-decklist-sidepanel-div top-level-section">
          <p className="match-details-decklist-title">Winning Decklist</p>
          <DecklistPanel className="match-details-decklist-panel" deckId={winningDeckId} />
        </div>
        <div className="match-details-stats-decks-div">
          <div className="match-details-match-stats-div top-level-section">
            <MatchStats />
          </div>
          <p className="match-details-match-decks-title">Decks</p>
          <div className="match-details-match-decks-div">
            {matchDecks.map(deck => <div key={key++} onClick={() => navigate(`/decks/${deck.id}`)} className="match-details-decktile-div top-level-section"><DeckTile deck={deck} key={key++} /></div>)}

          </div>
        </div>
      </div>
    </div>
  )
}