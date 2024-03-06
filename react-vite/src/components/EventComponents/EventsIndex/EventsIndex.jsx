import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkFetchAllEvents } from "../../../redux/event";

import './EventsIndex.css'


export function EventsIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const eventsObj = useSelector(state => state.events)
  const events = Object.values(eventsObj)

  useEffect(() => {
    dispatch(thunkFetchAllEvents())
  }, [dispatch])

  return (
    <div className="events-index-div">
      <h1>Events</h1>
      <div className="events-index-content-div">
        {events.map(event => <p key={event.id} className="events-index-event" onClick={() => navigate(`/events/${event.id}`)}>{event.name}</p>)}
        <p className="events-index-add-button" onClick={() => navigate('/events/new')}>Add Event</p>
      </div>
    </div>
  )

}