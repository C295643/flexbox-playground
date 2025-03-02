"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import CustomModal from "@/components/Modal";
import CustomOffcanvas from "@/components/Offcanvas";
import { StyleDisplay } from "@/components/StyleDisplay";
import { ContainerType } from "@/types/Container";
import { useNextId } from "@/hooks/useNextId";
import { usePrevious } from "@/hooks/usePrevious";
import {
  findContainerGroupById,
  addContainerGroupById,
  deleteContainerGroupById,
} from "@/utils/containerUtils";
import styles from "./page.module.css";

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
  const INITIAL_VALUE = 3;
  // Custom hook to get the getNextId function
  const getNextId = useNextId(INITIAL_VALUE);

  const [containerStyle, setContainerStyle] = useState("");
  const [item1Style, setItem1Style] = useState("");
  const [item2Style, setItem2Style] = useState("");
  const [item3Style, setItem3Style] = useState("");

  const [containerGroup, setContainerGroup] = useState<ContainerGroup[]>([{
      id: 0,
      container: { type: ContainerType.MAIN, customStyles: "" },
      control: { type: "control" },
      containers: [
        {
          id: 1,
          container: { type: ContainerType.CONTAINER, customStyles: "" },
          control: { type: "control" },
          containers: [
            {
              id: 2,
              container: { type: ContainerType.ITEM, customStyles: "" },
              control: { type: "control" },
              containers: [],
            },
          ],
        },
      ],
    }]);
  const prevContainerGroup = usePrevious(containerGroup);

  const creatContainer = (group: ContainerGroup) => {
    return (
      <Container
        key={group.id}
        customStyles={group.container.customStyles}
        groupId={group.id}
        groupContainer={group.container}
        handleShowOffcanvas={handleShowOffcanvas}
      >
        {group.containers.map((containerGroup) =>
          creatContainer(containerGroup)
        )}
      </Container>
    );
  };

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

  const handleAddContainerGroup = (groupId: number) => {
    const newContainerGroup: ContainerGroup = {
      id: getNextId(),
      container: { type: ContainerType.ITEM, customStyles: "" },
      control: { type: "new control" },
      containers: [],
    };

    const updatedContainerGroup = addContainerGroupById(
      containerGroup,
      groupId,
      newContainerGroup
    );

    if (updatedContainerGroup) {
      setContainerGroup(updatedContainerGroup);
    } else {
      console.warn("⚠️ Container group not added");
      return;
    }
  };

  const handleDeleteContainerGroup = (groupId: number) => {
    const updatedContainerGroup = deleteContainerGroupById(
      containerGroup,
      groupId
    );

    if (updatedContainerGroup) {
      setContainerGroup(updatedContainerGroup);
    } else {
      console.warn("⚠️ Container group not deleted");
    }

    handleCloseOffcanvas();
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [offcanvasContainerGroup, setOffcanvasContainerGroup] = useState<
    ContainerGroup | undefined
  >(undefined);

  const handleShowOffcanvas = (index: number) => {
    const containerGroupFound = findContainerGroupById(containerGroup, index);
    if (containerGroupFound) {
      setOffcanvasContainerGroup(containerGroupFound);
      setShowOffcanvas(true);
    } else {
      console.warn("⚠️ Container group not found");
    }
  };
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  return (
    <main className={`${styles.mainContainer} p-3 container`}>
      <div className={`${styles.wrapperContainer} p-4`}>
        <div className={`${styles.infoContainer} col-12 p-3`}>
          Info container
          <button
            onClick={() => handleAddContainerGroup(0)}
            className="btn btn-primary"
          >
            Add Container Group
          </button>
          <button onClick={handleShowModal} className="btn btn-secondary">
            Show Modal
          </button>
          <button
            onClick={() => handleShowOffcanvas(0)}
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
            handleShowOffcanvas={handleShowOffcanvas}
          >
            <p>Main Container</p>
            {group.containers.map((group) =>
              creatContainer(group)
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
        containerGroup={offcanvasContainerGroup}
        handleAddContainerGroup={handleAddContainerGroup}
        handleDeleteContainerGroup={handleDeleteContainerGroup}
      />
    </main>
  );
}
