"use client";

import Container from "@/components/Container";
import styles from "./WrapperContainer.module.css";
import { ContainerGroup } from "@/app/page";

type WrapperContainerProps = {
  containerGroup: ContainerGroup;
  creatContainer: (group: ContainerGroup) => React.ReactNode;
  handleShowModal: (index: number) => void;
  handleShowOffcanvas: (index: number) => void;
};

export default function WrapperContainer({
  containerGroup,
  creatContainer,
  handleShowModal,
  handleShowOffcanvas,
}: WrapperContainerProps) {
  return (
    <div className={`${styles.wrapperContainer} p-4`}>
      <div className={`${styles.infoContainer} col-12 p-3`}>
        Info container
      </div>
      <Container
        key={containerGroup.id}
        containerGroup={containerGroup}
        handleShowModal={handleShowModal}
        handleShowOffcanvas={handleShowOffcanvas}
      >
        <p>Main Container</p>
        {containerGroup.containers.map((group) => creatContainer(group))}
      </Container>
    </div>
  );
}
