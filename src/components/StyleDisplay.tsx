import React from "react";

interface StyleDisplayProps {
  styles: string;
}

export function StyleDisplay({ styles }: StyleDisplayProps) {
  const styleList = styles
    .split(";")
    .map((style) => style.trim())
    .filter((style) => style.length > 0);

  if (styleList.length === 0) {
    return (
      <p className="style-display style-display--empty">No styles applied</p>
    );
  }

  return (
    <div className="style-display">
      {styleList.map((style, index) => (
        <div key={index} className="style-display__item">
          {style}
        </div>
      ))}
    </div>
  );
}
