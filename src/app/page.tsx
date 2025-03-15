"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import CustomModal from "@/components/Modal";
import CustomOffcanvas from "@/components/Offcanvas";
import { StyleDisplay } from "@/components/StyleDisplay";
import { useNextId } from "@/hooks/useNextId";
import { usePrevious } from "@/hooks/usePrevious";
import {
  findContainerGroupById,
  addContainerGroupById,
  deleteContainerGroupById,
  compareContainerGroups,
} from "@/utils/containerUtils";
import styles from "./page.module.css";
import { generateRandomColor } from "@/utils/helpers";
import WrapperContainer from "@/components/WrapperContainer";
import { useStateWithDeepClone } from "@/hooks/useStateWithDeepClone";
import { ITEM_CONTAINER, MAIN_CONTAINER, PARENT_CONTAINER } from "@/constants";

export type ContainerGroup = {
  id: number;
  baseStyles: React.CSSProperties;
  customStyles: React.CSSProperties;
  baseClasses: string[];
  control: {
    type: string;
  };
  containers: ContainerGroup[];
};

// Initial container group definition
const containerGroupInit: ContainerGroup = {
  id: 0,
  baseStyles: MAIN_CONTAINER ,
  customStyles: {},
  baseClasses: ["main-container"],
  control: { type: "control" },
  containers: [
    {
      id: 1,
      baseStyles: PARENT_CONTAINER ,
      customStyles: {},
      baseClasses: ["container"],
      control: { type: "control" },
      containers: [
        {
          id: 2,
          baseStyles: { ...generateRandomColor(), ...ITEM_CONTAINER },
          customStyles: {},
          baseClasses: ["container"],
          control: { type: "control" },
          containers: [],
        },
      ],
    },
  ],
};

export default function Home() {
  const INITIAL_VALUE = 3;
  // Custom hook to get the getNextId function
  const getNextId = useNextId(INITIAL_VALUE);

  const [containerStyle, setContainerStyle] = useState("");
  const [item1Style, setItem1Style] = useState("");
  const [item2Style, setItem2Style] = useState("");
  const [item3Style, setItem3Style] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [offcanvasContainerGroup, setOffcanvasContainerGroup] = useState<
    ContainerGroup | undefined
  >(undefined);
  const [containerGroup, setContainerGroup, clonedContainerGroup] =
    useStateWithDeepClone<ContainerGroup>(containerGroupInit);

  // Custom hook to get the containerGroup in its previous state
  const prevContainerGroup = usePrevious(containerGroup);
  // console.log("--------------- prevContainerGroup: ", prevContainerGroup);

  const createContainerGroup = (): ContainerGroup => {
    const newContainerGroup: ContainerGroup = {
      id: getNextId(),
      baseStyles: { ...generateRandomColor(), ...ITEM_CONTAINER },
      customStyles: {},
      baseClasses: ["container"],
      control: { type: "new control" },
      containers: [],
    };
    return newContainerGroup;
  };

  const creatContainer = (group: ContainerGroup): React.ReactNode => {
    return (
      <Container
        key={group.id}
        containerGroup={group}
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
      if (!compareContainerGroups(containerGroup, prevContainerGroup)) {
        // console.log(
        //   `---------- Container group id=${containerGroup.id} has changed`
        // );
        // Run your process here
        // console.log("--------------- containerGroup: ", containerGroup);
      }
    }
  }, [containerGroup, prevContainerGroup]);

  const handleAddContainerGroup = (groupId: number) => {
    const newContainerGroup: ContainerGroup = createContainerGroup();
    const updatedContainerGroup = addContainerGroupById(
      clonedContainerGroup,
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
      clonedContainerGroup,
      groupId
    );

    if (updatedContainerGroup) {
      setContainerGroup(updatedContainerGroup);
    } else {
      console.warn("⚠️ Container group not deleted");
    }

    handleCloseOffcanvas();
  };

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
      <WrapperContainer
        containerGroup={containerGroup} // Pass the containerGroup state to the WrapperContainer component
        handleShowModal={handleShowModal}
        handleShowOffcanvas={handleShowOffcanvas}
        creatContainer={creatContainer}
      />

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
