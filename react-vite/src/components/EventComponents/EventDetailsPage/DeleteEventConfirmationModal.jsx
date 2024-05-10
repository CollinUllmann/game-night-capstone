import { useDispatch, useSelector } from "react-redux"
// import { thunkDeleteMatch, thunkFetchMatchById } from "../../../redux/match";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { thunkDeleteEvent, thunkFetchEventById } from "../../../redux/event";

import '../../LoadingSpinnerModal.css'


export function DeleteEventConfirmationModal({ eventId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false)

  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(thunkFetchEventById(eventId))
  }, [dispatch, eventId])

  const eventById = useSelector(state => state.events)
  const event = eventById[eventId]



  async function handleDelete(e) {
    e.preventDefault()
    setLoading(true)
    dispatch(thunkDeleteEvent(eventId)).then(() => setLoading(false)).then(() => navigate(`/users/${currentUser.id}`)).then(() => closeModal())
  }

  return (
    <>
      <div className={loading ? "loadingDiv loading" : "loadingDiv"} >
        <div className="lds-dual-ring"></div>
      </div>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:'20px'}}>
        <h1>Deleting &quot;{event?.name}&quot;</h1>
        <p style={{marginBottom:40}}>Are you sure?</p>
        <div style={{display:'flex', columnGap:'12px'}}>
          <button className="delete-confirmation-yes button standard" onClick={handleDelete}>Yes</button>
          <button className="delete-confirmation-no button standard" onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </>
  )
}