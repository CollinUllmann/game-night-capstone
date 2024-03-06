import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkCreateEvent, thunkUpdateEvent } from "../../../redux/event";

import './EventFormPage.css'

export function EventFormPage({ formtype }) {
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [format, setFormat] = useState();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const eventFormData = new FormData();
    eventFormData.append('name', name)
    eventFormData.append('date', date)
    eventFormData.append('format', format)

    if (formtype == 'update') {
      dispatch(thunkUpdateEvent(eventId, eventFormData)).then(() => navigate('/matches/new'))
    } else {
      dispatch(thunkCreateEvent(eventFormData)).then(() => navigate('/matches/new'))
    }
  }

  return (
    <div className="event-form-container">
      <h1>Event Form</h1>

      <form className="event-form-div" onSubmit={handleSubmit}>
        <label className="event-form-input">
          Name
          <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          />
        </label>

        <label className="event-form-input">
          Date
          <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          />
        </label>

        <label className="event-form-input">
          Format
          <select 
            name="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            required
          >
            <option className="event-form-format-option" value="">(Select One)</option>
            <option className="event-form-format-option" value="Commander">Commander</option>
            <option className="event-form-format-option" value="Modern">Modern</option>
            <option className="event-form-format-option" value="Legacy">Legacy</option>
          </select>
        </label>

        <div className="event-form-submit-button-div">
          <button className="event-form-submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  )

}