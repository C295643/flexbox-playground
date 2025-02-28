import React from "react";
import { Modal, Button } from "react-bootstrap";

interface CustomModalProps {
  show: boolean;
  handleClose: () => void;
  index: number;
}

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  handleClose,
  index,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Show Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        The index of the container group is: {index}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
