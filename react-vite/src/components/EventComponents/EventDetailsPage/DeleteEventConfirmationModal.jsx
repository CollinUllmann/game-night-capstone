import { useDispatch, useSelector } from "react-redux"
// import { thunkDeleteMatch, thunkFetchMatchById } from "../../../redux/match";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { thunkDeleteEvent, thunkFetchEventById } from "../../../redux/event";




export function DeleteEventConfirmationModal({ eventId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const { closeModal } = useModal();
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(thunkFetchEventById(eventId))
  }, [dispatch, eventId])

  const eventById = useSelector(state => state.events)
  const event = eventById[eventId]



  function handleDelete() {
    dispatch(thunkDeleteEvent(eventId)).then(() => navigate(`/users/${currentUser.id}`)).then(() => closeModal())
  }

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:'20px'}}>
      <h1>Deleting "{event?.name}"</h1>
      <p style={{marginBottom:40}}>Are you sure?</p>
      <div style={{display:'flex', columnGap:'12px'}}>
        <button className="delete-confirmation-yes button standard" onClick={handleDelete}>Yes</button>
        <button className="delete-confirmation-no button standard" onClick={closeModal}>Cancel</button>
      </div>
    </div>
  )
}