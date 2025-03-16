import { ContainerGroup } from "@/app/page";
import React from "react";
import { Modal, Button } from "react-bootstrap";

interface CustomModalProps {
  show: boolean;
  containerGroup: ContainerGroup | undefined;
  handleClose: () => void;
  handleAddContainerGroup: (groupId: number) => void;
  handleDeleteContainerGroup: (groupId: number) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  containerGroup,
  handleClose,
  handleAddContainerGroup,
  handleDeleteContainerGroup,
}) => {
  if (containerGroup === undefined) {
    return null;
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Show Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The containerGroup id is: {containerGroup.id}</p>
        <button
          onClick={() => handleAddContainerGroup(containerGroup.id)}
          className="btn btn-primary"
        >
          Add Container Group
        </button>
        <button
          onClick={() => handleDeleteContainerGroup(containerGroup.id)}
          className={`btn ${
            containerGroup.id === 0 ? "btn-outline-danger" : "btn-danger"
          }`}
          disabled={containerGroup.id === 0}
        >
          Delete Container Group
        </button>
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
