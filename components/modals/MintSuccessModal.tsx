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
        <img src={imageUrlOfNft} alt="NFT" />
      </Modal.Body>
    </Modal>
  );
};

export default MintSuccessModal;
