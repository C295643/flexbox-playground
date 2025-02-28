"use client";

import { useEffect, useState } from "react";
import { StyleDisplay } from "@/components/StyleDisplay";
import Container from "@/components/Container";
import { ContainerType } from "@/types/Container";
import styles from "./page.module.css";
import { usePrevious } from "@/hooks/usePrevious";
import CustomModal from "@/components/Modal";
import CustomOffcanvas from "@/components/Offcanvas";

export type ContainerDefinition = {
  type: ContainerType;
  customStyles: string;
};

export type ControlDefinition = {
  type: string;
};

export type ContainerGroup = {
  id: number;
  container: ContainerDefinition;
  control: ControlDefinition;
  containers: ContainerGroup[];
};

export default function Home() {
  const [containerStyle, setContainerStyle] = useState("");
  const [item1Style, setItem1Style] = useState("");
  const [item2Style, setItem2Style] = useState("");
  const [item3Style, setItem3Style] = useState("");

  const initialContainerGroup: ContainerGroup = {
    id: 0,
    container: { type: ContainerType.MAIN, customStyles: "" },
    control: { type: "control" },
    containers: [
      {
        id: 1,
        container: { type: ContainerType.ITEM, customStyles: "" },
        control: { type: "control" },
        containers: [],
      },
      {
        id: 2,
        container: { type: ContainerType.CONTAINER, customStyles: "" },
        control: { type: "control" },
        containers: [
          {
            id: 3,
            container: { type: ContainerType.ITEM, customStyles: "" },
            control: { type: "control" },
            containers: [],
          },
          {
            id: 4,
            container: { type: ContainerType.ITEM, customStyles: "" },
            control: { type: "control" },
            containers: [],
          },
        ],
      },
    ],
  };

  const newContainerGroup: ContainerGroup = {
    id: 5,
    container: { type: ContainerType.ITEM, customStyles: "" },
    control: { type: "new control" },
    containers: [],
  };

  const [containerGroup, setContainerGroup] = useState([initialContainerGroup]);

  const prevContainerGroup = usePrevious(containerGroup);

  const creatComponent = (group: ContainerGroup, index: number) => {
    console.log("--------------- group: ", group);

    const isContainer = group.container.type === ContainerType.CONTAINER;
    const isItem = group.container.type === ContainerType.ITEM;
    return (
      <Container
        key={index}
        customStyles={group.container.customStyles}
        groupId={group.id}
        groupContainer={group.container}
      >
        {isContainer && `Container ${index}`}
        {isItem && `Item ${index}`}
        {group.containers.map((containerGroup, index) =>
          creatComponent(containerGroup, index)
        )}
      </Container>
    );
  };

  useEffect(() => {
    if (containerGroup.length === 1) {
      console.log("--------------- INITIAL containerGroup: ", containerGroup);
    }
  }, []);

  useEffect(() => {
    if (prevContainerGroup) {
      containerGroup.forEach((group, index) => {
        if (group !== prevContainerGroup[index]) {
          console.log(
            `---------- Container group at index ${index} has changed`
          );
          // Run your process here
          console.log("--------------- containerGroup: ", containerGroup);
        }
      });
    }
  }, [containerGroup, prevContainerGroup]);

  const handleAddContainerGroup = () => {
    setContainerGroup((prev) => [...prev, newContainerGroup]);
  };

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
    <main
      className={`${styles.mainContainer} container`}
      style={{ border: "dashed 4px red" }}
    >
      <div className={`${styles.wrapperContainer}`}>
        <div
          className="info-container col-12"
          style={{ border: "dashed 4px orange" }}
        >
          Info container
          <button onClick={handleAddContainerGroup} className="btn btn-primary">
            Add Container Group
          </button>
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
        {containerGroup.map((group, index) => (
          <Container
            key={index}
            customStyles={group.container.customStyles}
            groupId={group.id}
            groupContainer={group.container}
          >
            Main Container
            {group.containers.map((group, index) =>
              creatComponent(group, index)
            )}
          </Container>
        ))}
      </div>

      <div
        className={`${styles.controls} col-12`}
        style={{ border: "dashed 4px fuchsia" }}
      >
        <div id="control-group-1" className={`${styles.controlGroup} mb-3`}>
          <label htmlFor="container-style">Container Styles:</label>
          <textarea
            id="container-style"
            value={containerStyle}
            onChange={(e) => setContainerStyle(e.target.value)}
            placeholder="Example: justify-content: space-between; align-items: center;"
          />
          <StyleDisplay inputStyles={containerStyle} />
        </div>

        <div id="control-group-2" className={`${styles.controlGroup} mb-3`}>
          <label htmlFor="item1-style">Item 1 Styles:</label>
          <textarea
            id="item1-style"
            value={item1Style}
            onChange={(e) => setItem1Style(e.target.value)}
            placeholder="Example: background-color: #ff0000; color: white;"
          />
          <StyleDisplay inputStyles={item1Style} />
        </div>

        <div id="control-group-3" className={`${styles.controlGroup} mb-3`}>
          <label htmlFor="item2-style">Item 2 Styles:</label>
          <textarea
            id="item2-style"
            value={item2Style}
            onChange={(e) => setItem2Style(e.target.value)}
            placeholder="Example: background-color: #00ff00; color: white;"
          />
          <StyleDisplay inputStyles={item2Style} />
        </div>

        <div id="control-group-4" className={`${styles.controlGroup} mb-3`}>
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
