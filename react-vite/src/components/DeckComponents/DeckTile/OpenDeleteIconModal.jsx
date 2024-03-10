// import { useModal } from '../../context/Modal';
// import { AddDeckTile } from '../DeckComponents/DeckTile/AddDeckTile';
import { useModal } from "../../../context/Modal";
import { FaTrashAlt } from "react-icons/fa";

import './OpenDeleteIconModal.css'

function OpenModalDeleteIcon({
  modalComponent, // component to render inside the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    e.stopPropagation();
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <>
      <FaTrashAlt className="delete-icon" onClick={onClick} />
    </>
  );
}

export default OpenModalDeleteIcon;
