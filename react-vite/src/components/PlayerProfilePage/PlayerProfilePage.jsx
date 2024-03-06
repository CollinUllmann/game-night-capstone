import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { thunkFetchAllUsers } from "../../redux/users";
import { thunkFetchAllDecks } from "../../redux/deck";
import { thunkFetchAllMatches } from "../../redux/match";
import { thunkFetchAllEvents } from "../../redux/event";


import './PlayerProfilePage.css'


export function PlayerProfilePage() {
  const {userId} = useParams();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const userById = useSelector(state => state.users)
  const deckById = useSelector(state => state.decks)
  const eventById = useSelector(state => state.events)
  const matchesById = useSelector(state => state.matches)
  const user = userById[userId]
  // const userDecks = Object.values(deckById).filter(deck => deck.userId == userId)

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
  
  if (sessionUser?.id != userId) return <Navigate to="/" replace={true} />;
  
  if (!user) return
  let key = 0;
  return (
    <div className="player-profile-div">
      <p className="player-profile-title">{user?.username}&apos;s Profile</p>
      <div className="player-profile-player-event-list-sidepanel-div">
        <p className="player-profile-player-event-list-title">Events</p>
        {playerEventIds?.map(eventId => <p key={key++}>{eventById[eventId]?.name}</p>)}
      </div>
    </div>
  )
}