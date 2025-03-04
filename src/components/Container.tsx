import React, { useEffect, useState } from "react";
import { ContainerResetClass, ContainerType } from "@/types/Container";
import styles from "./Container.module.css";
import { ContainerGroup } from "@/app/page";

type ContainerProps = {
  children: React.ReactNode;
  containerGroup:ContainerGroup
  handleShowOffcanvas: (index: number) => void;
};

const applyCustomStyles = (styleString: string): Record<string, string> => {
  try {
    const styleObject: Record<string, string> = {};
    styleString.split(";").forEach((style) => {
      const [property, value] = style.split(":").map((s) => s.trim());
      if (property && value) {
        styleObject[property] = value;
      }
    });
    return styleObject;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(
        "An error occurred trying to create the styleObject in applyCustomStyles: ",
        error.message
      );
    } else {
      console.log("An unexpected error occurred in applyCustomStyles: ", error);
    }
    return {};
  }
};

const Container: React.FC<ContainerProps> = ({
  children,
  containerGroup,
  handleShowOffcanvas,
}: ContainerProps) => {
  const { id, type, baseStyles, customStyles } = containerGroup;
  console.log("--------------- baseStyles: ", baseStyles);
  const isContainer = type === ContainerType.CONTAINER;
  const isItem = type === ContainerType.ITEM;
  const containerResetClass = ContainerResetClass[type];

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
    console.log("--------------- Right-click detected, groupId: ", groupId);
    setRightClicked(!rightClicked);
    handleShowOffcanvas(groupId);
  };

  useEffect(() => {
    setCombinedStyles({
      ...baseStyles,
      ...applyCustomStyles(customStyles),
    });
  }, [baseStyles, customStyles]);

  return (
    <div
      className={`${styles[containerResetClass]} global-container`}
      style={combinedStyles}
      onDoubleClick={(e) => handleDoubleClick(e, id)}
      onContextMenu={(e) => handleContextMenu(e, id)}
    >
      <p>{isContainer && `Container ${id}`}</p>
      <p>{isItem && `Item ${id}`}</p>
      {children}
    </div>
  );
};

export default Container;
