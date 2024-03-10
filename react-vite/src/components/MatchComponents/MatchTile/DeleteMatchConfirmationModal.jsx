import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteMatch, thunkFetchMatchById } from "../../../redux/match";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";




export function DeleteMatchConfirmationModal({ matchId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const matchesById = useSelector(state => state.matches)
  const match = matchesById[matchId]

  useEffect(() => {
    dispatch(thunkFetchMatchById(matchId))
  }, [dispatch])





  function handleDelete() {
    dispatch(thunkDeleteMatch(matchId)).then(() => navigate(`/events/${match?.eventId}`)).then(() => closeModal())
  }

  return (
    <div>
      <p>Are you sure?</p>
      <div className="delete-confirmation-yes button" onClick={handleDelete}>Yes</div>
      <div className="delete-confirmation-no button" onClick={closeModal}>Cancel</div>
    </div>
  )
}