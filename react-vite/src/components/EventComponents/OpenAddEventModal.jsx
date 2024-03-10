import { useModal } from '../../context/Modal';
// import { AddDeckTile } from '../DeckComponents/DeckTile/AddDeckTile';

import './OpenAddEventModal.css'

function OpenAddEventModal({
  modalComponent, // component to render inside the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <div className='add-event-modal-tile' onClick={onClick}>+</div>
  );
}

export default OpenAddEventModal;
