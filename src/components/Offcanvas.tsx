import { ContainerGroup } from "@/app/page";
import { ContainerType } from "@/types/Container";
import React from "react";
import { Offcanvas } from "react-bootstrap";

interface CustomOffcanvasProps {
  show: boolean;
  handleClose: () => void;
  index: number | null;
  containerType: ContainerType | null;
  containerGroup: ContainerGroup | null;
}

const CustomOffcanvas: React.FC<CustomOffcanvasProps> = ({
  show,
  handleClose,
  index,
  containerType,
  containerGroup,
}) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Container Group Index</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {containerType !== null
          ? <p>The container type is: {containerType}</p>
          : <p>No container type available</p>}
        {index !== null
          ? <p>The index is: {index}</p>
          : <p>No index available</p>}
        {containerGroup !== null
          ? <p>The containerGroup type is: {containerGroup.container.type}</p>
          : <p>No containerGroup available</p>}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CustomOffcanvas;
