import React from "react";

type ContainerProps = {
  className?: string;
  size?: {
    width: number;
    height: number;
  };
  customStyles: string;
  baseStyle: Record<string, string>;
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
  className = "flex-item",
  size,
  customStyles,
  baseStyle,
  children,
}) => {
  const combinedStyles = {
    ...baseStyle,
    ...applyCustomStyles(customStyles),
    ...(size ? { width: `${size.width}px`, height: `${size.height}px` } : {}),
  };

  return (
    <div className={className} style={combinedStyles}>
      {children}
    </div>
  );
};

export default Container;
