"use client";

import { ContainerGroup } from "@/app/page";
import styles from "./Toolbar.module.css";

type ToolbarProps = {
  containerGroup: ContainerGroup;
  handleAddContainerGroup: (id: number) => void;
  handleDeleteContainerGroup: (id: number) => void;
};

export default function Toolbar({
  containerGroup,
  handleAddContainerGroup,
  handleDeleteContainerGroup,
}: ToolbarProps) {
  return (
    <div className={`${styles.toolbarContainer} p-4`}>
      <header className={`${styles.header} p-3`} style={containerGroup.baseStyles}>
        {`Container ${containerGroup.id}`}
      </header>
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
    </div>
  );
}
