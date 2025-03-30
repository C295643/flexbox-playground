"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container/Container";
import CustomModal from "@/components/Modal";
import CustomOffcanvas from "@/components/Offcanvas";
import { useNextId } from "@/hooks/useNextId";
import { usePrevious } from "@/hooks/usePrevious";
import {
  findContainerGroupById,
  addContainerGroupById,
  deleteContainerGroupById,
  compareContainerGroups,
  findNextValidContainerGroup,
} from "@/utils/containerUtils";
import { generateRandomColor } from "@/utils/helpers";
import WrapperContainer from "@/components/WrapperContainer/WrapperContainer";
import { useStateWithDeepClone } from "@/hooks/useStateWithDeepClone";
import { ITEM_CONTAINER, MAIN_CONTAINER, PARENT_CONTAINER } from "@/constants";
import Toolbar from "@/components/Toolbar/Toolbar";
import styles from "./page.module.css";
import ToolbarAddDelete from "@/components/Toolbar/ToolbarAddDelete";
import ToolbarContainer from "@/components/Toolbar/ToolbarContainer";

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
  baseStyles: MAIN_CONTAINER,
  customStyles: {},
  baseClasses: ["main-container"],
  control: { type: "control" },
  containers: [
    {
      id: 1,
      baseStyles: PARENT_CONTAINER,
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

  const [showModal, setShowModal] = useState(false);
  const [modalContainerGroup, setModalContainerGroup] = useState<
    ContainerGroup | undefined
  >(undefined);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [offcanvasContainerGroup, setOffcanvasContainerGroup] = useState<
    ContainerGroup | undefined
  >(undefined);
  const [containerGroup, setContainerGroup, clonedContainerGroup] =
    useStateWithDeepClone<ContainerGroup>(containerGroupInit);
  const [activeContainer, setActiveContainer] =
    useState<ContainerGroup>(containerGroup);

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
        setActiveContainer={setActiveContainer}
        handleShowModal={handleShowModal}
        handleShowOffcanvas={handleShowOffcanvas}
      >
        {group.containers.map((containerGroup) =>
          creatContainer(containerGroup)
        )}
      </Container>
    );
  };

  useEffect(() => {
    // console.log("--------------- activeContainer: ", activeContainer);
  }, [activeContainer]);

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
      handleCloseModal();
    } else {
      console.warn("⚠️ Container group not added");
      return;
    }
  };

  useEffect(() => {
    // Check if the containerGroup has changed
    if (
      prevContainerGroup &&
      !compareContainerGroups(containerGroup, prevContainerGroup)
    ) {
      // Find the activeContainer by its id
      const updatedActiveContainer = findContainerGroupById(
        containerGroup,
        activeContainer.id
      );

      if (updatedActiveContainer) {
        setActiveContainer(updatedActiveContainer);
      } else {
        // Find the next valid containerGroup in descending order
        const nextValidContainerGroup = findNextValidContainerGroup(
          containerGroup,
          activeContainer.id
        );
        setActiveContainer(nextValidContainerGroup);
      }
    }
  }, [containerGroup, prevContainerGroup, activeContainer.id]);

  const handleDeleteContainerGroup = (groupId: number) => {
    const updatedContainerGroup = deleteContainerGroupById(
      clonedContainerGroup,
      groupId
    );

    if (updatedContainerGroup) {
      setContainerGroup(updatedContainerGroup);
      handleCloseModal();
    } else {
      console.warn("⚠️ Container group not deleted");
    }

    handleCloseOffcanvas();
  };

  const handleShowModal = (index: number) => {
    const containerGroupFound = findContainerGroupById(containerGroup, index);
    if (containerGroupFound) {
      setModalContainerGroup(containerGroupFound);
      // setShowModal(true);
    } else {
      console.warn("⚠️ Container group not found");
    }
  };
  const handleCloseModal = () => setShowModal(false);

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
        setActiveContainer={setActiveContainer}
        handleShowModal={handleShowModal}
        handleShowOffcanvas={handleShowOffcanvas}
        creatContainer={creatContainer}
      />
      <Toolbar containerGroup={activeContainer}>
        <ToolbarAddDelete
          containerGroup={activeContainer}
          handleAddContainerGroup={handleAddContainerGroup}
          handleDeleteContainerGroup={handleDeleteContainerGroup}
        />
        <ToolbarContainer
          containerGroup={activeContainer}
          handleAddContainerGroup={handleAddContainerGroup}
        />
      </Toolbar>
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        containerGroup={modalContainerGroup}
        handleAddContainerGroup={handleAddContainerGroup}
        handleDeleteContainerGroup={handleDeleteContainerGroup}
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
