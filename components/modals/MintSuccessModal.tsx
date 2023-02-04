import React, { FC } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

type Props = {
  handleClose: () => void;
  imageUrlOfNft: string;
};

const MintSuccessModal: FC<Props> = ({ handleClose, imageUrlOfNft }) => {
  return (
    <Modal onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Hooray... here is your NFT</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-max flex items-center justify-center">
          <img
            src={imageUrlOfNft}
            alt="NFT"
            className="h-60 w-60 object-cover rounded-xl"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MintSuccessModal;
