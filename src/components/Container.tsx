import React, { useEffect, useState } from "react";
import styles from "./Container.module.css";
import { ContainerGroup } from "@/app/page";

type ContainerProps = {
  children: React.ReactNode;
  containerGroup: ContainerGroup;
  setActiveContainer: (containerGroup: ContainerGroup) => void;
  handleShowModal: (index: number) => void;
  handleShowOffcanvas: (index: number) => void;
};

const Container: React.FC<ContainerProps> = ({
  children,
  containerGroup,
  setActiveContainer,
  handleShowModal,
  handleShowOffcanvas,
}: ContainerProps) => {
  const { id, baseStyles, customStyles, baseClasses } = containerGroup;
  const [combinedStyles, setCombinedStyles] = useState<React.CSSProperties>({});

  const handleClick = (e: React.MouseEvent, groupId: number) => {
    e.stopPropagation();
    console.log("--------------- Clicked, groupId: ", groupId);
    setActiveContainer(containerGroup);
    handleShowModal(groupId);
  };

  const handleDoubleClick = (e: React.MouseEvent, groupId: number) => {
    e.stopPropagation();
    console.log("--------------- doubleClicked, groupId: ", groupId);
  };

  // Handle right-click (contextual menu) event
  const handleContextMenu = (e: React.MouseEvent, groupId: number) => {
    e.preventDefault();
    e.stopPropagation();
    handleShowOffcanvas(groupId);
  };

  useEffect(() => {
    setCombinedStyles({
      ...baseStyles,
      ...customStyles,
    });
  }, [baseStyles, customStyles]);

  // Consider moving this to a utility function
  function splitClasses(classes: string[]): string {
    const classesString = classes.map((c) => styles[c]).join(" ");
    return classesString;
  }

  return (
    <div
      className={`${splitClasses(baseClasses)} global-container`}
      style={combinedStyles}
      onClick={(e) => handleClick(e, id)}
      onDoubleClick={(e) => handleDoubleClick(e, id)}
      onContextMenu={(e) => handleContextMenu(e, id)}
    >
      <p>Container {id}</p>
      {children}
    </div>
  );
};

export default Container;
