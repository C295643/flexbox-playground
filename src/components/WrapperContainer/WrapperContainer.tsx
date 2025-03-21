"use client";

import Container from "@/components/Container/Container";
import styles from "./WrapperContainer.module.css";
import { ContainerGroup } from "@/app/page";

type WrapperContainerProps = {
  containerGroup: ContainerGroup;
  creatContainer: (group: ContainerGroup) => React.ReactNode;
  setActiveContainer: (containerGroup: ContainerGroup) => void;
  handleShowModal: (index: number) => void;
  handleShowOffcanvas: (index: number) => void;
};

export default function WrapperContainer({
  containerGroup,
  creatContainer,
  setActiveContainer,
  handleShowModal,
  handleShowOffcanvas,
}: WrapperContainerProps) {
  return (
    <div className={`${styles.wrapperContainer} p-4`} 
    // style={{ border: 'solid 4px red' }}
    >
      {/* <div className={`${styles.infoContainer} col-12 p-3`} style={{ border: 'solid 4px blue' }}>
        Info container
      </div> */}
      <Container
        key={containerGroup.id}
        containerGroup={containerGroup}
        setActiveContainer={setActiveContainer}
        handleShowModal={handleShowModal}
        handleShowOffcanvas={handleShowOffcanvas}
      >
        {containerGroup.containers.map((group) => creatContainer(group))}
      </Container>
    </div>
  );
}
