import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkFetchAllMatches } from "../../../redux/match";
import { MatchTile } from "../../MatchComponents/MatchTile/MatchTile";
import {  thunkFetchAllEvents } from "../../../redux/event";
import { AddMatchTile } from "../../MatchComponents/MatchTile/AddMatchTile";


import './EventDetailsPage.css'


export function EventDetailsPage() {
  const {eventId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const sessionUser = useSelector((state) => state.session.user);
  const matchesById = useSelector(state => state.matches)
  const eventsById = useSelector(state => state.events)
  const event = eventsById[eventId]
  const eventMatches = Object.values(matchesById).filter(match => match.eventId == eventId)

  
  useEffect(() => {
    dispatch(thunkFetchAllEvents())
    dispatch(thunkFetchAllMatches())
  }, [dispatch])


  function formatDate(date) {
    if (!date) return
    let splitDate = date.split(' ')
    return `${splitDate[2]} ${splitDate[1]}, ${splitDate[3]}`
  }
  
  // if (sessionUser?.id != deck?.userId) return <Navigate to="/" replace={true} />;
  
  let key = 1;
  return (
    <div>
      <p className="event-details-title">{event?.name} Details</p>
      <div className="event-details-div">
        <div className="event-details-eventlist-sidepanel-div">
          <p className="event-details-eventlist-title">All Events</p>
          {Object.keys(eventsById)?.map(eventId => 
            <div key={key++} className="event-details-event-tile-div">
              <div className="event-details-event-tile" onClick={() => navigate(`/events/${eventId}`)}>
                <p className="event-details-event-tile-event">{eventsById[eventId]?.name}</p>
                <p className="event-details-event-tile-date">{formatDate(eventsById[eventId]?.date)}</p>
              </div>
            </div>
          )}
          <div className="event-details-add-event-button" onClick={() => navigate('/events/new')}>+</div>
        </div>
        <div className="event-details-stats-matches-div">
          <div className="event-details-event-stats-div">
          </div>
          <p className="event-details-event-matches-title">Matches</p>
          <div className="event-details-event-matches-div">
            <div className="event-details-add-match-tile" onClick={() => navigate('/matches/new')}>
              <AddMatchTile />
            </div>
            {eventMatches.map(match => {
              return <div className="event-details-match-tile-div" key={key++}>
                <MatchTile className="event-details-match-tile" match={match} onClick={() => navigate(`/matches/${match.id}`)} matchNum={key}/>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}