import React, { useEffect, useState } from "react";
import { ContainerResetClass, ContainerType } from "@/types/Container";
import styles from "./Container.module.css";
import {
  backgroundColors,
  generateRandomColor,
} from "@/utils/helpers";

type ContainerProps = {
  containerType?: ContainerType;
  customStyles: string;
  children: React.ReactNode;
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
  containerType = ContainerType.ITEM,
  customStyles,
  children,
}) => {
  const containerResetClass = ContainerResetClass[containerType];
  const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({});

  const [doubleClicked, setDoubleClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);

  // Initial styles
  useEffect(() => {
    const bgColor = backgroundColors[containerType] || { backgroundColor: generateRandomColor()};
    setBaseStyles((prev) => ({ ...prev, ...bgColor }));
  }, []);

  const handleDoubleClick = () => {
    setDoubleClicked(!doubleClicked);
    console.log("--------------- !doubleClicked");
  };
  
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setRightClicked(!rightClicked);
    console.log("--------------- Right-click detected");
    // Handle right-click event here
  };

  const combinedStyles = {
    ...baseStyles,
    ...applyCustomStyles(customStyles),
  };

  return (
    <div
      className={`${styles[containerResetClass]}`}
      style={combinedStyles}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      {children}
    </div>
  );
};

export default Container;
