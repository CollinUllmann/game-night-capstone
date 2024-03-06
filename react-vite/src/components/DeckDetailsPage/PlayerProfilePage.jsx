import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { thunkFetchAllUsers } from "../../../redux/users";
import { thunkFetchAllDecks } from "../../../redux/deck";
import { thunkFetchAllMatches } from "../../../redux/match";
import { thunkFetchAllEvents } from "../../../redux/event";
import { DeckTile } from "../DeckTile/DeckTile";
import { AddDeckTile } from "../DeckTile/AddDeckTile";


import './PlayerProfilePage.css'


export function PlayerProfilePage() {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionUser = useSelector((state) => state.session.user);
  const userById = useSelector(state => state.users)
  const deckById = useSelector(state => state.decks)
  const eventById = useSelector(state => state.events)
  const matchesById = useSelector(state => state.matches)
  const user = userById[userId]
  const userDecks = Object.values(deckById).filter(deck => deck.userId == userId)

  const [playerEventIds, setPlayerEventIds] = useState([])
  
  useEffect(() => {
    dispatch(thunkFetchAllUsers())
    dispatch(thunkFetchAllDecks())
    dispatch(thunkFetchAllMatches())
    dispatch(thunkFetchAllEvents())
  }, [dispatch])

  useEffect(() => {
    const playerEventIdsSet = new Set([])
    const playerMatches = Object.values(matchesById).filter(match => {
      for (const deckId of match.deckIds) {
         if (deckById[deckId]?.userId == userId) {
          return true
         }
      }
      return false
    })
    playerMatches?.forEach(match => playerEventIdsSet.add(match.eventId))
    const playerEventIdsArr = Array.from(playerEventIdsSet)
    setPlayerEventIds(playerEventIdsArr)
  }, [userId, matchesById, deckById, setPlayerEventIds])

  function formatDate(date) {
    if (!date) return
    let splitDate = date.split(' ')
    return `${splitDate[2]} ${splitDate[1]}, ${splitDate[3]}`
  }
  
  if (sessionUser?.id != userId) return <Navigate to="/" replace={true} />;
  
  if (!user) return
  let key = 0;
  return (
    <div>
      <p className="player-profile-title">{user?.username}&apos;s Profile</p>
      <div className="player-profile-div">
        <div className="player-profile-player-event-list-sidepanel-div">
          <p className="player-profile-player-event-list-title">Events</p>
          {playerEventIds?.map(eventId => 
            <div key={key++} className="player-profile-player-event-tile-div">
              <div className="player-profile-player-event-tile">
                <p className="player-profile-player-event-tile-event">{eventById[eventId]?.name}</p>
                <p className="player-profile-player-event-tile-date">{formatDate(eventById[eventId]?.date)}</p>
              </div>
            </div>
          )}
          <div className="player-profile-add-event-button" onClick={() => navigate('/events/new')}>+</div>
        </div>
        <div className="player-profile-stats-decks-div">
          <div className="player-profile-player-stats-div"></div>
          <p className="player-profiel-player-decks-title">Decks</p>
          <div className="player-profile-player-decks-div">
            <div className="player-profile-add-deck-button-div" onClick={() => navigate('/decks/new')}>
              <AddDeckTile />
            </div>
            {userDecks.map(deck => <div key={key++} onClick={() => navigate(`/decks/${deck.id}`)} className="player-profile-decktile-div"><DeckTile deck={deck} key={key++} /></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}