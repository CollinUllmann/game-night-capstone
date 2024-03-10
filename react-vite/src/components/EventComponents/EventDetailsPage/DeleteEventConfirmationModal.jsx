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





  function handleDelete() {
    dispatch(thunkDeleteEvent(eventId)).then(() => navigate(`/users/${currentUser.id}`)).then(() => closeModal())
  }

  return (
    <div>
      <p>Are you sure?</p>
      <div className="delete-confirmation-yes button" onClick={handleDelete}>Yes</div>
      <div className="delete-confirmation-no button" onClick={closeModal}>Cancel</div>
    </div>
  )
}