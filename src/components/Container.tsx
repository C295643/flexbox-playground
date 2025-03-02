import React, { useEffect, useState } from "react";
import { ContainerResetClass, ContainerType } from "@/types/Container";
import styles from "./Container.module.css";
import { generateRandomColor } from "@/utils/helpers";
import { ContainerDefinition } from "@/app/page";

type ContainerProps = {
  customStyles: string;
  children: React.ReactNode;
  groupId: number;
  groupContainer: ContainerDefinition;
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
  customStyles,
  children,
  groupId,
  groupContainer,
  handleShowOffcanvas,
}) => {
  const isContainer = groupContainer.type === ContainerType.CONTAINER;
  const isItem = groupContainer.type === ContainerType.ITEM;
  const containerResetClass = ContainerResetClass[groupContainer.type];
  const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({});

  const [doubleClicked, setDoubleClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);

  // Initial styles
  useEffect(() => {
    const bgColor = isItem ? generateRandomColor() : {};
    setBaseStyles((prev) => ({ ...prev, ...bgColor }));
  }, [isItem]);

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

  const combinedStyles = {
    ...baseStyles,
    ...applyCustomStyles(customStyles),
  };

  return (
    <div
      className={`${styles[containerResetClass]} global-container`}
      style={combinedStyles}
      onDoubleClick={(e) => handleDoubleClick(e, groupId)}
      onContextMenu={(e) => handleContextMenu(e, groupId)}
    >
      <p>{isContainer && `Container ${groupId}`}</p>
      <p>{isItem && `Item ${groupId}`}</p>
      {children}
    </div>
  );
};

export default Container;
