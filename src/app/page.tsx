"use client";

import { useState, useEffect } from "react";
import { generateRandomSize } from "@/utils/helpers";
import { StyleDisplay } from "@/components/StyleDisplay";
import Container from "@/components/Container";

export default function Home() {
  const [containerStyle, setContainerStyle] = useState("");
  const [item1Style, setItem1Style] = useState("");
  const [item2Style, setItem2Style] = useState("");
  const [item3Style, setItem3Style] = useState("");
  const initialSize = { width: 0, height: 0 };
  const [randomSizes, setRandomSizes] = useState([
    initialSize,
    initialSize,
    initialSize,
  ]);

  useEffect(() => {
    setRandomSizes([
      generateRandomSize(),
      generateRandomSize(),
      generateRandomSize(),
    ]);
  }, []);

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
    <main className="container" style={{ border: "dashed 4px red" }}>
      <div className="wrapper-container" style={{ border: "dashed 4px blue" }}>
        <Container
          className="flex-container"
          customStyles={containerStyle}
          baseStyle={{ border: "dashed 4px green" }}
        >
          <Container
            size={randomSizes[0]}
            customStyles={item1Style}
            baseStyle={baseStyle1}
          >
            Item 1
          </Container>
          <Container
            size={randomSizes[1]}
            customStyles={item2Style}
            baseStyle={baseStyle2}
          >
            Item 2
          </Container>
          <Container
            size={randomSizes[2]}
            customStyles={item3Style}
            baseStyle={baseStyle3}
          >
            Item 3
          </Container>
        </Container>
        <div className="info-container" style={{ border: "dashed 4px orange" }}>
          Info container
        </div>
      </div>

      <div className="controls" style={{ border: "dashed 4px fuchsia" }}>
        <div className="control-group">
          <label htmlFor="container-style">Container Styles:</label>
          <textarea
            id="container-style"
            value={containerStyle}
            onChange={(e) => setContainerStyle(e.target.value)}
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
