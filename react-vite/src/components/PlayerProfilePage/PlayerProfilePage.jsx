import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkFetchAllUsers } from "../../redux/users";
import { thunkFetchAllDecks } from "../../redux/deck";
import { thunkFetchAllMatches } from "../../redux/match";
import { thunkFetchAllEvents } from "../../redux/event";
import { DeckTile } from "../DeckComponents/DeckTile/DeckTile";
// import { AddDeckTile } from "../DeckComponents/DeckTile/AddDeckTile";
import { PlayerStats } from "./PlayerStats/PlayerStats";
import { PlayerConstruction } from "./PlayerStats/PlayerConstruction/PlayerConstruction";

// import OpenModalButton from "../OpenModalButton/OpenModalButton";
import OpenModalTile from "./OpenModalTile";
// import OpenModalTile from "../EventComponents/OpenAddEventModalTile";
import OpenAddEventModal from "../EventComponents/OpenAddEventModal";
import { DeckFormModal } from "../DeckComponents/DeckFormModal/DeckFormModal";
import { EventFormModal } from "../EventComponents/EventFormModal/EventFormModal";

import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

import './PlayerProfilePage.css'


export function PlayerProfilePage() {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [statsPage, setStatsPage] = useState('performance');
  const [deckPageNum, setDeckPageNum] = useState(1);



  const userById = useSelector(state => state.users)
  const deckById = useSelector(state => state.decks)
  const eventById = useSelector(state => state.events)
  const currentUser = useSelector(state => state.session.user)
  const user = userById[userId]
  const userDecks = Object.values(deckById).filter(deck => deck.userId == userId)
  const playerEventIds = useSelector(state => {
    const playerMatches = Object.values(state.matches).filter(match => {
      for (const deckId of match.deckIds) {
        if (state.decks[deckId]?.userId == userId) {
          return true
        }
      }
      return false
    })

    const playerEventIdsSet = new Set([])
    playerMatches.forEach(match => playerEventIdsSet.add(match.eventId))
    return Array.from(playerEventIdsSet);
  })
  
  useEffect(() => {
    dispatch(thunkFetchAllUsers())
    dispatch(thunkFetchAllDecks())
    dispatch(thunkFetchAllMatches())
    dispatch(thunkFetchAllEvents())
  }, [dispatch])

  function formatDate(date) {
    if (!date) return
    let splitDate = date.split(' ')
    return `${splitDate[2]} ${splitDate[1]}, ${splitDate[3]}`
  }

  const setStatsPageSelectionClass = (thisStatsPage, baseClassName) => statsPage == thisStatsPage ? `${baseClassName}-selected` : `${baseClassName}`

  
  // if (sessionUser?.id != userId) return <Navigate to="/" replace={true} />;

  //pagination
  function getMatchesSlice(pageNum) {
    if (pageNum == 1) return userDecks.reverse().slice(0, 9)
    return userDecks.reverse().slice((((pageNum - 1) * 10) - 1), ((pageNum * 10) - 1))
  }

  const decksList = getMatchesSlice(deckPageNum)

  const deckPageNumMax = userDecks.length % 10 == 0 ? (userDecks.length / 10) + 1 : Math.ceil(userDecks.length / 10)

  console.log('deckPageNumMax: ', deckPageNumMax)
  
  if (!user) return
  let key = 0;
  return (
    <div>
      <p className="player-profile-title"><span className="page-title">{user?.username}&apos;s</span> Profile</p>
      <div className="player-profile-div">
        <div className="player-profile-player-event-list-sidepanel-div top-level-section">
          <p className="player-profile-player-event-list-title">Events</p>
          {playerEventIds.map(eventId => eventById[eventId]).filter(event => event).map(event => 
            <div key={key++} className="player-profile-player-event-tile-div">
              <div className="player-profile-player-event-tile" onClick={() => navigate(`/events/${event.id}`)}>
                <p className="player-profile-player-event-tile-event">{event.name}</p>
                <p className="player-profile-player-event-tile-date">{formatDate(event.date)}</p>
              </div>
            </div>
          )}
          <div className="player-profile-add-event-button">
            <OpenAddEventModal modalComponent={<EventFormModal />}/>
              
            
          </div>
        </div>
        <div className="player-profile-stats-decks-div">
          <div className="player-profile-player-stats-div top-level-section">
          <div className="player-profile-player-stats-selection-div">
              <p className={setStatsPageSelectionClass('performance', 'player-profile-player-stats-page-selector')} onClick={() => setStatsPage('performance')}>Performance</p>
              <p className={setStatsPageSelectionClass('construction', 'player-profile-player-stats-page-selector')} onClick={() => setStatsPage('construction')}>Construction</p>
              {/* <p onClick={handleNavigateUserProfile}></p> */}
            </div>
            {statsPage == 'performance' && <PlayerStats />}
            {statsPage == 'construction' && <PlayerConstruction />}

          </div>
          <p className="player-profiel-player-decks-title"> <MdNavigateBefore onClick={() => deckPageNum == 1 ? null : setDeckPageNum(deckPageNum - 1)} style={{cursor:'pointer'}} /> Decks <MdNavigateNext onClick={() => deckPageNum < deckPageNumMax ? setDeckPageNum(deckPageNum + 1) : null} style={{cursor:'pointer'}}/></p>
          <div className="player-profile-player-decks-div">
            {deckPageNum == 1 && <div className={currentUser?.id == userId ? "player-profile-add-deck-button-div" : "hidden"}>
              <OpenModalTile 
                modalComponent={<DeckFormModal className="deck-tile-div add"/>}
              />
            </div>}
            {decksList.map(deck => <div key={key++} onClick={() => navigate(`/decks/${deck.id}`)} className="player-profile-decktile-div top-level-section"><DeckTile deck={deck} key={key++} /></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}