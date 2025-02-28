"use client";

import { useState } from "react";
import { StyleDisplay } from "@/components/StyleDisplay";
import Container from "@/components/Container";
import { ContainerType } from "@/types/Container";
import styles from "./page.module.css";
import CustomModal from "@/components/Modal";
import CustomOffcanvas from "@/components/Offcanvas";

type ContainerDefinition = {
  type: ContainerType;
  customStyles: string;
};

type ControlDefinition = {
  type: string;
};

export type ContainerGroup = {
  container: ContainerDefinition;
  control: ControlDefinition;
  containers: ContainerGroup[];
};

export default function Home() {
  const [containerStyle, setContainerStyle] = useState("");
  const [item1Style, setItem1Style] = useState("");
  const [item2Style, setItem2Style] = useState("");
  const [item3Style, setItem3Style] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const [offcanvasIndex, setOffcanvasIndex] = useState<number | null>(null);
  const [containerType, setContainerType] = useState<ContainerType | null>(
    null
  );
  const [activeContainerGroup, setActiveContainerGroup] =
    useState<ContainerGroup | null>(null);

  const handleShowOffcanvas = (
    index: number,
    containerType: ContainerType,
    activeContainerGroup: ContainerGroup
  ) => {
    setOffcanvasIndex(index);
    setContainerType(containerType);
    setActiveContainerGroup(activeContainerGroup);
    setShowOffcanvas(true);
  };
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  return (
    <main className={styles.mainContainer} style={{ border: "dashed 4px red" }}>
      <div className={styles.wrapperContainer}>
        <div className="info-container" style={{ border: "dashed 4px orange" }}>
          Info container
          <button onClick={handleShowModal} className="btn btn-secondary">
            Show Modal
          </button>
          <button
            onClick={() =>
              handleShowOffcanvas(0, ContainerType.MAIN, initialContainerGroup)
            }
            className="btn btn-secondary"
          >
            Show Initial Group Index
          </button>
        </div>
        <Container
          containerType={ContainerType.MAIN}
          customStyles={containerStyle}
        >
          <Container customStyles={item1Style}>Item 1</Container>
          <Container
            containerType={ContainerType.CONTAINER}
            customStyles={item2Style}
          >
            Item 2
          </Container>
          <Container customStyles={item3Style}>Item 3</Container>
        </Container>
      </div>

      <div className={styles.controls} style={{ border: "dashed 4px fuchsia" }}>
        <div className={styles.controlGroup}>
          <label htmlFor="container-style">Container Styles:</label>
          <textarea
            id="container-style"
            value={containerStyle}
            onChange={(e) => setContainerStyle(e.target.value)}
            placeholder="Example: justify-content: space-between; align-items: center;"
          />
          <StyleDisplay inputStyles={containerStyle} />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="item1-style">Item 1 Styles:</label>
          <textarea
            id="item1-style"
            value={item1Style}
            onChange={(e) => setItem1Style(e.target.value)}
            placeholder="Example: background-color: #ff0000; color: white;"
          />
          <StyleDisplay inputStyles={item1Style} />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="item2-style">Item 2 Styles:</label>
          <textarea
            id="item2-style"
            value={item2Style}
            onChange={(e) => setItem2Style(e.target.value)}
            placeholder="Example: background-color: #00ff00; color: white;"
          />
          <StyleDisplay inputStyles={item2Style} />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="item3-style">Item 3 Styles:</label>
          <textarea
            id="item3-style"
            value={item3Style}
            onChange={(e) => setItem3Style(e.target.value)}
            placeholder="Example: background-color: #0000ff; color: white;"
          />
          <StyleDisplay inputStyles={item3Style} />
        </div>
      </div>
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        index={0} // Assuming the index of initialContainerGroup is 0
      />
      <CustomOffcanvas
        show={showOffcanvas}
        handleClose={handleCloseOffcanvas}
        containerType={containerType} // Pass the index to the offcanvas
        index={offcanvasIndex} // Pass the index to the offcanvas
        containerGroup={activeContainerGroup} // Pass the active container group to the offcanvas
      />
    </main>
  );
}
