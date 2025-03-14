import React, { useEffect, useState } from "react";
import styles from "./Container.module.css";
import { ContainerGroup } from "@/app/page";

type ContainerProps = {
  children: React.ReactNode;
  containerGroup: ContainerGroup;
  handleShowOffcanvas: (index: number) => void;
};

const Container: React.FC<ContainerProps> = ({
  children,
  containerGroup,
  handleShowOffcanvas,
}: ContainerProps) => {
  const { id, baseStyles, customStyles, baseClasses } = containerGroup;

  const [doubleClicked, setDoubleClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [combinedStyles, setCombinedStyles] = useState<React.CSSProperties>({});

  const handleDoubleClick = (e: React.MouseEvent, groupId: number) => {
    e.stopPropagation();
    console.log("--------------- doubleClicked, groupId: ", groupId);
    setDoubleClicked(!doubleClicked);
  };

  // Handle right-click (contextual menu) event
  const handleContextMenu = (e: React.MouseEvent, groupId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setRightClicked(!rightClicked);
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
      onDoubleClick={(e) => handleDoubleClick(e, id)}
      onContextMenu={(e) => handleContextMenu(e, id)}
    >
      <p>Container {id}</p>
      {children}
    </div>
  );
};

export default Container;
