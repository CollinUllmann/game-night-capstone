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
  }, [dispatch, matchId])





  function handleDelete() {
    dispatch(thunkDeleteMatch(matchId)).then(() => navigate(`/events/${match?.eventId}`)).then(() => closeModal())
  }

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:'20px'}}>
      <h1>Deleting Match</h1>
      <p style={{marginBottom:40}}>Are you sure?</p>
      <div style={{display:'flex', columnGap:'12px'}}>
        <button className="delete-confirmation-yes button standard" onClick={handleDelete}>Yes</button>
        <button className="delete-confirmation-no button standard" onClick={closeModal}>Cancel</button>
      </div>
    </div>
  )
}