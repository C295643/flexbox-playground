"use client";

import { ContainerGroup } from "@/app/page";
import styles from "./Toolbar.module.css";

type ToolbarProps = {
  containerGroup: ContainerGroup;
  children: React.ReactNode;
};

export default function Toolbar({ containerGroup, children }: ToolbarProps) {
  return (
    <div className={`${styles.toolbarContainer} p-4`}>
      <header
        className={`${styles.header} p-3`}
        style={containerGroup.baseStyles}
      >
        {`Container ${containerGroup.id}`}
      </header>
      {children}
    </div>
  );
}
