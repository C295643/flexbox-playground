import { ContainerGroup } from "@/app/page";
import React from "react";
import { Offcanvas } from "react-bootstrap";

interface CustomOffcanvasProps {
  show: boolean;
  containerGroup: ContainerGroup | undefined;
  handleClose: () => void;
  handleAddContainerGroup: (groupId: number) => void;
  handleDeleteContainerGroup: (groupId: number) => void;
}

const CustomOffcanvas: React.FC<CustomOffcanvasProps> = ({
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
    <div
      onContextMenu={(e) => {
        e.preventDefault(); // Prevent the default context menu
        e.stopPropagation(); // Prevent the event from bubbling up the DOM tree
      }}
    >
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Container Group Index</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CustomOffcanvas;
