import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateMatch, thunkFetchMatchById, thunkUpdateMatch } from "../../../redux/match";

import './MatchFormPage.css'
import { useNavigate, useParams } from "react-router-dom";
import { thunkFetchAllDecks } from "../../../redux/deck";
import { MatchDeckSelector } from "./MatchDeckSelector/MatchDeckSelector";
import { thunkFetchAllUsers } from "../../../redux/users";
import { thunkFetchAllEvents } from "../../../redux/event";

export function MatchFormPage({ formtype }) {
  const { matchId } = useParams()

  const cardById = useSelector(state => state.cards)
  const matchById = useSelector(state => state.matches)
  const deckById = useSelector(state => state.decks)
  const userById = useSelector(state => state.users)
  const eventById = useSelector(state => state.events)
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state variables for data needed for creation
  const [eventId, setEventId] = useState();
  const [userIdWinner, setUserIdWinner] = useState()
  const [deckIds, setDeckIds] = useState([])


  const [errors] = useState({});
  
  useEffect(() => {
    dispatch(thunkFetchAllUsers())
    dispatch(thunkFetchAllDecks())
    dispatch(thunkFetchAllEvents())
  }, [dispatch])


  const playingUsers = deckIds.map(deckId => {
    const userId = deckById[deckId]?.userId;
    return userId == null ? undefined : userById[userId];
  })

  //stuff for update
  useEffect(() => {
    if (formtype == 'update') {
      dispatch(thunkFetchMatchById(matchId))
    }
  }, [formtype, matchId, dispatch])

  //stuff for update
  useEffect(() => {
    const match = matchById[matchId];
    if(!match) return;

    setEventId(match.eventId)
    setUserIdWinner(match.userIdWinner)

    const matchDeckIds = match.deckIds
    const matchDeckIdsSet = []
    for (const deckId of matchDeckIds) {
      const deckObj = deckById[deckId]
      if(deckObj) {
        matchDeckIdsSet.push(deckId)
        setDeckIds(matchDeckIdsSet)
      }
    }s
  }, [deckById, matchId, matchById, cardById])


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const matchFormData = new FormData()
    matchFormData.append('event_id', eventId)
    matchFormData.append('user_id_winner', userIdWinner)
    matchFormData.append('deck_ids', deckIds.join(' '))

    if (formtype == 'update') {
      dispatch(thunkUpdateMatch(matchId, matchFormData)).then(() => navigate('/matches'))
    } else {
      dispatch(thunkCreateMatch(matchFormData)).then(() => navigate('/matches'))
    }
  };

  return (
    <>
      <div className="match-form-container">
        <h1>Match Form</h1>        
      
      <form className="match-form-div" onSubmit={handleSubmit}>
        <label className="match-form-input">
          Event
          <select
            name="eventId"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          >
          <option value="">(Choose One)</option>
          {Object.values(eventById).map(event => <option value={event.id}>{event.name}</option>)}
          </select>
        </label>
        {errors.eventId && <p>{errors.eventId}</p>}

        <label className="match-form-input">
          Number of Players
          <input type="number" name="numUsers" value={deckIds.length} onChange={e => {
            const newCount = Math.max(0, Math.min(6, Math.round(e.target.value)));
            const newDeckIds = [...deckIds];
            while(newDeckIds.length > newCount) newDeckIds.pop();
            while(newDeckIds.length < newCount) newDeckIds.push(undefined);
            setDeckIds(newDeckIds);
          }}/>
        </label>

        {deckIds.map((deckId, index) => <MatchDeckSelector key={index} index={index} deckId={deckId} onChangeDeckId={newDeckId => {
          const newDeckIds = [...deckIds];
          newDeckIds[index] = newDeckId;
          setDeckIds(newDeckIds);
        }}></MatchDeckSelector>)}

        <label className="match-form-input">
          Winner
          <select name="userIdWinner" value={userIdWinner} onChange={e => setUserIdWinner(e.target.value)}>
            <option value=''>(Choose One)</option>
            {playingUsers.map((user, index) => user == null ? <></> : <option key={index} value={user.id}>{user.username}</option>)}

          </select>

        </label>


        <div className="match-form-submit-button-div">
          <button className='match-form-modal-button'
            onClick={() => {handleSubmit}}>Submit</button>
        </div>
      </form>
      </div>
    </>
  );
}
