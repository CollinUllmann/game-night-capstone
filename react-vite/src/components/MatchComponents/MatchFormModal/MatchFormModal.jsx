import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateMatch, thunkFetchMatchById, thunkUpdateMatch } from "../../../redux/match";

import './MatchFormModal.css'
import { useNavigate } from "react-router-dom";
import { thunkFetchAllDecks } from "../../../redux/deck";
import { MatchDeckSelector } from "./MatchDeckSelector/MatchDeckSelector";
import { thunkFetchAllUsers } from "../../../redux/users";
import { thunkFetchAllEvents } from "../../../redux/event";
import { useModal } from "../../../context/Modal";
import '../../LoadingSpinnerModal.css'

export function MatchFormModal({ formtype, matchId }) {
  // const { matchId } = useParams()

  const { closeModal } = useModal();

  const [loading, setLoading] = useState(false)
 

  const matchById = useSelector(state => state.matches)
  const deckById = useSelector(state => state.decks)
  const userById = useSelector(state => state.users)
  const eventById = useSelector(state => state.events)
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state variables for data needed for creation
  const [eventId, setEventId] = useState();
  const [userIdWinner, setUserIdWinner] = useState()
  const [deckIds, setDeckIds] = useState([undefined, undefined])


  const [errors, setErrors] = useState({});
  
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
    setDeckIds(match.deckIds)
  }, [matchId, matchById])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(deckIds.length < 2) {
      return setErrors({
        deckCount: 'At least two decks must be selected'
      })
    }
    setLoading(true)
    const matchFormData = new FormData()
    matchFormData.append('event_id', eventId)
    matchFormData.append('user_id_winner', userIdWinner)
    matchFormData.append('deck_ids', deckIds.join(' '))
    
    if (formtype == 'update') {
      dispatch(thunkUpdateMatch(matchId, matchFormData)).then(() => setLoading(false)).then(() => navigate(`/matches/${matchId}`)).then(() => closeModal())
    } else {
      dispatch(thunkCreateMatch(matchFormData)).then(() => setLoading(false)).then(responseMatch => navigate(`/matches/${responseMatch.id}`)).then(() => closeModal())
    }
  };

  return (
    <>
      <div className={loading ? "loadingDiv loading" : "loadingDiv"} >
        <div class="lds-dual-ring"></div>
      </div>
      <div className="match-form-container">
        <h1>Match Form</h1>        
      
      <form className="match-form-div" onSubmit={handleSubmit}>
        <label className="match-form-input">
          Event
          <select
            name="eventId"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
          >
          <option value="">(Choose One)</option>
          {Object.values(eventById).map(event => <option key={event.id} value={event.id}>{event.name}</option>)}
          </select>
        </label>

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

        {deckIds.map((deckId, index) => <><MatchDeckSelector key={index} index={index} deckId={deckId} onChangeDeckId={newDeckId => {
          const newDeckIds = [...deckIds];
          newDeckIds[index] = newDeckId;
          setDeckIds(newDeckIds);
        }}></MatchDeckSelector><hr style={{borderTop:'1px solid #444', borderColor: '#444', backgroundColor: '#444', width:'70%'}} /></>)}

        <label className="match-form-input">
          Winner
          <select
            name="userIdWinner"
            value={userIdWinner}
            onChange={e => setUserIdWinner(e.target.value)}
            required
          >
            <option value=''>(Choose One)</option>
            {playingUsers.map((user, index) => user == null ? <></> : <option key={index} value={user.id}>{user.username}</option>)}

          </select>

        </label>

        <div className="validation-error">
        {errors.deckCount && <p>{errors.deckCount}</p>}
        </div>

        <div className="match-form-submit-button-div">
          <button className='match-form-modal-button standard' onClick={() => {handleSubmit}}>Submit</button>
          <button className="standard match-form-modal-button" onClick={closeModal}>Cancel</button>
        </div>
      </form>
      </div>
    </>
  );
}
