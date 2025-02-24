"use client";

import { useState, useEffect } from "react";
import { generateRandomSize } from "@/utils/helpers";
import { StyleDisplay } from "@/components/StyleDisplay";

export default function Home() {
  const [containerStyle, setContainerStyle] = useState("");
  const [item1Style, setItem1Style] = useState("");
  const [item2Style, setItem2Style] = useState("");
  const [item3Style, setItem3Style] = useState("");
  const [randomSizes, setRandomSizes] = useState([{}, {}, {}]);

  useEffect(() => {
    setRandomSizes([
      generateRandomSize(),
      generateRandomSize(),
      generateRandomSize(),
    ]);
  }, []);

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
    } catch (error) {
      return {};
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  const baseStyle1: Record<string, string> = {
    backgroundColor: "lightcoral",
  };
  const baseStyle2: Record<string, string> = {
    backgroundColor: "lightgrey",
  };
  const baseStyle3: Record<string, string> = {
    backgroundColor: "lightgreen",
  };

  return (
    <main className="container">
      <div
        className="flex-container"
        style={{ ...applyCustomStyles(containerStyle) }}
      >
        <div
          className="flex-item"
          style={{
            ...randomSizes[0],
            ...applyCustomStyles(item1Style),
            ...baseStyle1,
          }}
        >
          Item 1
        </div>
        <div
          className="flex-item"
          style={{
            ...randomSizes[1],
            ...applyCustomStyles(item2Style),
            ...baseStyle2,
          }}
        >
          Item 2
        </div>
        <div
          className="flex-item"
          style={{
            ...randomSizes[2],
            ...applyCustomStyles(item3Style),
            ...baseStyle3,
          }}
        >
          Item 3
        </div>
      </div>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="container-style">Container Styles:</label>
          <textarea
            id="container-style"
            value={containerStyle}
            // onChange={(e) => setContainerStyle(e.target.value)}
            onChange={handleInputChange(setContainerStyle)}
            placeholder="Example: justify-content: space-between; align-items: center;"
          />
          <StyleDisplay styles={containerStyle} />
        </div>

        <div className="control-group">
          <label htmlFor="item1-style">Item 1 Styles:</label>
          <textarea
            id="item1-style"
            value={item1Style}
            onChange={(e) => setItem1Style(e.target.value)}
            placeholder="Example: background-color: #ff0000; color: white;"
          />
          <StyleDisplay styles={item1Style} />
        </div>

        <div className="control-group">
          <label htmlFor="item2-style">Item 2 Styles:</label>
          <textarea
            id="item2-style"
            value={item2Style}
            onChange={(e) => setItem2Style(e.target.value)}
            placeholder="Example: background-color: #00ff00; color: white;"
          />
          <StyleDisplay styles={item2Style} />
        </div>

        <div className="control-group">
          <label htmlFor="item3-style">Item 3 Styles:</label>
          <textarea
            id="item3-style"
            value={item3Style}
            onChange={(e) => setItem3Style(e.target.value)}
            placeholder="Example: background-color: #0000ff; color: white;"
          />
          <StyleDisplay styles={item3Style} />
        </div>
      </div>
    </main>
  );
}
