"use client";

import { ContainerGroup } from "@/app/page";
import ButtonGroup from "@/components/ButtonGroup";

type ToolbarAddDeleteProps = {
  containerGroup: ContainerGroup;
  handleAddContainerGroup: (id: number) => void;
  handleDeleteContainerGroup: (id: number) => void;
};

export default function ToolbarAddDelete({
  containerGroup,
  handleAddContainerGroup,
  handleDeleteContainerGroup,
}: ToolbarAddDeleteProps) {
  return (
    <div className="pt-3">
      <ButtonGroup label="Add & Delete">
        <button
          onClick={() => handleAddContainerGroup(containerGroup.id)}
          className="btn btn-outline-primary"
        >
          <i className="bi bi-plus-square"></i>
        </button>
        <button
          onClick={() => handleDeleteContainerGroup(containerGroup.id)}
          className="btn btn-outline-danger"
          disabled={containerGroup.id === 0}
        >
          <i className="bi bi-trash3"></i>
        </button>
      </ButtonGroup>
    </div>
  );
}
