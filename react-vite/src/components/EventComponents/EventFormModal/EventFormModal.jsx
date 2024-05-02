import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateEvent, thunkFetchEventById, thunkUpdateEvent } from "../../../redux/event";
import '../../LoadingSpinnerModal.css'
import './EventFormModal.css'
import { useModal } from "../../../context/Modal";

export function EventFormModal({ formtype, eventId }) {
  // const { eventId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [format, setFormat] = useState();

  const [loading, setLoading] = useState(false)

  const { closeModal } = useModal();

  const eventsById = useSelector(state => state.events)

  useEffect(() => {
    if(eventId != null) {
      dispatch(thunkFetchEventById(eventId))
    }
  }, [dispatch, eventId])

  useEffect(() => {
    const event = eventsById[eventId]
    if (!event) return;

    function formatDate(date) {
      let months = {
        'Jan': '01',
        'Feb': '02',
        'Mar': '03',
        'Apr': '04',
        'May': '05',
        'Jun': '06',
        'Jul': '07',
        'Aug': '08',
        'Sep': '09',
        'Oct': '10',
        'Nov': '11',
        'Dec': '12'
      }
      if (!date) return
      let splitDate = date.split(' ')
      return `${splitDate[3]}-${months[splitDate[2]]}-${splitDate[1]}`
    }

    setName(event.name)
    setDate(formatDate(event.date))
    setFormat(event.format)
  }, [eventId, eventsById])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const eventFormData = new FormData();
    eventFormData.append('name', name)
    eventFormData.append('date', date)
    eventFormData.append('format', format)

    if (formtype == 'update') {
      dispatch(thunkUpdateEvent(eventId, eventFormData)).then(() => setLoading(false)).then(() => closeModal()).then(() => navigate(`/events/${eventId}`))
    } else {
      dispatch(thunkCreateEvent(eventFormData)).then(() => setLoading(false)).then(eventOrFailureMessage => {
        if(typeof eventOrFailureMessage === 'object') {
          navigate(`/events/${eventOrFailureMessage.id}`)
        }
        closeModal()
      })
    }
  }

  return (
    <>
      <div className={loading ? "loadingDiv loading" : "loadingDiv"} >
        <div class="lds-dual-ring"></div>
      </div>
      <div className="event-form-container">
        <h1>Event Form</h1>

        <form className="event-form" onSubmit={handleSubmit}>
          <label className="event-form-input">
            <span className="event-form-input-label-span">Name</span>
            <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
          </label>

          <label className="event-form-input">
            <span className="event-form-input-label-span">Date</span>
            <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            />
          </label>

          <label className="event-form-input">
            <span className="event-form-input-label-span">Format</span>
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
            <button className="event-form-submit-button standard">Submit</button>
            <button className="event-form-cancel-button standard" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  )

}