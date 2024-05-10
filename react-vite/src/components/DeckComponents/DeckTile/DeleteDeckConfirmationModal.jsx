import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteDeck } from "../../../redux/deck";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../../LoadingSpinnerModal.css'




export function DeleteDeckConfirmationModal({ deckId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false)

  const currentUser = useSelector(state => state.session.user)


  const deckById = useSelector(state => state.decks)
  const deck = deckById[deckId]


  function handleDelete() {
    setLoading(true)
    dispatch(thunkDeleteDeck(deckId)).then(() => setLoading(false)).then(() => navigate(`/users/${currentUser.id}`)).then(() => closeModal())
  }

  return (
    <>
      <div className={loading ? "loadingDiv loading" : "loadingDiv"} >
        <div className="lds-dual-ring"></div>
      </div>

      <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:'20px'}}>
        <h1>Deleting &quot;{deck?.name}&quot;</h1>
        <p style={{marginBottom:40}}>Are you sure?</p>
        <div style={{display:'flex', columnGap:'12px'}}>
          <button className="delete-confirmation-yes button standard" onClick={handleDelete}>Yes</button>
          <button className="delete-confirmation-no button standard" onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </>
    

  )
}