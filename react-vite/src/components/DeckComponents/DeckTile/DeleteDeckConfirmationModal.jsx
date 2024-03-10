import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteDeck } from "../../../redux/deck";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";




export function DeleteDeckConfirmationModal({ deckId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const currentUser = useSelector(state => state.session.user)





  function handleDelete() {
    dispatch(thunkDeleteDeck(deckId)).then(() => navigate(`/users/${currentUser.id}`)).then(() => closeModal())
  }

  return (
    <div>
      <p>Are you sure?</p>
      <div className="delete-confirmation-yes button" onClick={handleDelete}>Yes</div>
      <div className="delete-confirmation-no button" onClick={closeModal}>Cancel</div>
    </div>
  )
}