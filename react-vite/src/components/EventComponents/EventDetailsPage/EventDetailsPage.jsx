import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkFetchAllMatches } from "../../../redux/match";
import { MatchTile } from "../../MatchComponents/MatchTile/MatchTile";
import {  thunkFetchAllEvents } from "../../../redux/event";
import { EventStats } from "./EventStats/EventStats";
import OpenModalUpdateIcon from "../../DeckComponents/DeckTile/OpenUpdateIconModal";
import OpenModalDeleteIcon from "../../DeckComponents/DeckTile/OpenDeleteIconModal";
import { EventFormModal } from "../EventFormModal/EventFormModal";
import { DeleteEventConfirmationModal } from "./DeleteEventConfirmationModal";
import OpenAddEventModal from "../OpenAddEventModal";
import OpenModalTile from "../../PlayerProfilePage/OpenModalTile";
import { MatchFormModal } from "../../MatchComponents/MatchFormModal/MatchFormModal";
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

  // function handleUpdateNavigation(e) {
  //   e.stopPropagation()
  //   navigate(`/events/${eventId}/update`)
  // }

  // function handleDelete(e) {
  //   e.stopPropagation()
  //   dispatch(thunkDeleteEvent(eventId))
  // }
  
  // if (sessionUser?.id != deck?.userId) return <Navigate to="/" replace={true} />;
  
  let eventKey = 1;
  let matchKey = 1;
  return (
    <div>
      <div style={{display:'flex', alignItems:'center', columnGap:'1vh'}}>
        <p className="event-details-title"><span className="page-title">{event?.name}</span> Event Details</p>
        <div style={{display:'flex'}}>
          <div className="event-details-event-tile-icon" >
            <OpenModalUpdateIcon modalComponent={<EventFormModal formtype={'update'} eventId={event?.id}/>}/>
          </div>
          <div className="event-details-event-tile-icon" >
            <OpenModalDeleteIcon modalComponent={<DeleteEventConfirmationModal eventId={event?.id}/>}/>
          </div>
        </div>
      </div>
      <div className="event-details-div">
        <div className="event-details-eventlist-sidepanel-div">
          <p className="event-details-eventlist-title">All Events</p>
          {Object.keys(eventsById)?.map(tempEventId => 
            <div key={eventKey++} className="event-details-event-tile-div">
              <div className={tempEventId == eventId ? "event-details-event-tile selected-event" : "event-details-event-tile"} onClick={() => navigate(`/events/${tempEventId}`)}>
                <p className="event-details-event-tile-event">{eventsById[tempEventId]?.name}</p>
                <div className="event-details-event-tile-update-delete-div">
                  <div className="event-details-event-tile-icon" >
                    <OpenModalUpdateIcon modalComponent={<EventFormModal formtype={'update'} eventId={tempEventId}/>}/>
                  </div>
                  <div className="event-details-event-tile-icon" >
                    <OpenModalDeleteIcon modalComponent={<DeleteEventConfirmationModal eventId={tempEventId}/>}/>
                  </div>
                </div>
                <p className="event-details-event-tile-date">{formatDate(eventsById[tempEventId]?.date)}</p>
              </div>
            </div>
          )}
          <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
            <OpenAddEventModal modalComponent={<EventFormModal formtype={'new'} eventId={null} />} />
          </div>
        </div>
        <div className="event-details-stats-matches-div">
          <div className="event-details-event-stats-div">
            <EventStats />
          </div>
          <p className="event-details-event-matches-title">Matches</p>
          <div className="event-details-event-matches-div">
            <OpenModalTile modalComponent={<MatchFormModal formtype={'new'}/>}/>
            {eventMatches.map(match => {
              return <div className="event-details-match-tile-div" key={matchKey++}>
                <MatchTile className="event-details-match-tile" match={match} onClick={() => navigate(`/matches/${match.id}`)} matchNum={matchKey}/>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}