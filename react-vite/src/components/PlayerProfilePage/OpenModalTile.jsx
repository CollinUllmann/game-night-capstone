import { useModal } from '../../context/Modal';
import { AddDeckTile } from '../DeckComponents/DeckTile/AddDeckTile';

import './OpenModalTile.css'

function OpenModalTile({
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
    <div className='add-deck-modal-tile' onClick={onClick}>
      <AddDeckTile/>
    </div>
  );
}

export default OpenModalTile;
