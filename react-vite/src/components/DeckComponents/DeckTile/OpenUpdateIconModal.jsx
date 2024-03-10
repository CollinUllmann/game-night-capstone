// import { useModal } from '../../context/Modal';
// import { AddDeckTile } from '../DeckComponents/DeckTile/AddDeckTile';
import { useModal } from "../../../context/Modal";
import { RxUpdate } from "react-icons/rx";

import './OpenUpdateIconModal.css'

function OpenModalUpdateIcon({
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
        <RxUpdate  className='update-icon' onClick={onClick}/>
    </>
  );
}

export default OpenModalUpdateIcon;
