"use client";

import Container from "@/components/Container";
import styles from "./WrapperContainer.module.css";
import { ContainerGroup } from "@/app/page";

type WrapperContainerProps = {
  containerGroup: ContainerGroup;
  creatContainer: (group: ContainerGroup) => React.ReactNode;
  handleShowOffcanvas: (index: number) => void;
  handleShowModal: () => void;
};

export default function WrapperContainer({
  containerGroup,
  creatContainer,
  handleShowOffcanvas,
  handleShowModal,
}: WrapperContainerProps) {
  // console.log("--------------- WrapperContainer containerGroup: ", containerGroup);
  return (
    <div className={`${styles.wrapperContainer} p-4`}>
      <div className={`${styles.infoContainer} col-12 p-3`}>
        Info container
        {/* <button
          onClick={() => handleAddContainerGroup(0)}
          className="btn btn-primary"
        >
          Add Container Group
        </button> */}
        <button onClick={handleShowModal} className="btn btn-secondary">
          Show Modal
        </button>
        {/* <button
          onClick={() => handleShowOffcanvas(0)}
          className="btn btn-secondary"
        >
          Show Initial Group Index
        </button> */}
      </div>
      <Container
        key={containerGroup.id}
        containerGroup={containerGroup}
        handleShowOffcanvas={handleShowOffcanvas}
      >
        <p>Main Container</p>
        {containerGroup.containers.map((group) => creatContainer(group))}
      </Container>
    </div>
  );
}
