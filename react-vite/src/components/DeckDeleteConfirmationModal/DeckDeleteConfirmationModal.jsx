import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteDeck } from "../../redux/deck";

function DeckDeleteConfirmationModal({deckId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkDeleteDeck(deckId)
    );

    
    closeModal();
    // window.location.reload(false);
    
  };

  return (
    <>
      <div className="confirmation-modal-header-div">
        <h1>Confirmation</h1> 
        <p>Are you sure you want to delete this deck?</p>       
      </div>
      <div className="confirmation-modal-button-div">
        <div className="confirmation-modal-yes modal-button" onClick={handleDelete}>Yes</div>
        <div className="confirmation-modal-cancel modal-button" onClick={closeModal}>Cancel</div>
      </div>
    </>
  );
}

export default DeckDeleteConfirmationModal;
