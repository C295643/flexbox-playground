import React from "react";
import styles from "./StyleDisplay.module.css";

interface StyleDisplayProps {
  inputStyles: string;
}

export function StyleDisplay({ inputStyles }: StyleDisplayProps) {
  const styleList = inputStyles
    .split(";")
    .map((inputStyle) => inputStyle.trim())
    .filter((inputStyle) => inputStyle.length > 0);

  if (styleList.length === 0) {
    return (
      <p className={[styles.styleDisplay, styles.styleDisplayEmpty].join(" ")}>
        No styles applied
      </p>
    );
  }

  return (
    <div className={`${styles.styleDisplay}`}>
      {styleList.map((styleItem, index) => (
        <div key={index} className={`${styles.styleDisplayItem}`}>
          {styleItem}
        </div>
      ))}
    </div>
  );
}
