import { ContainerGroup } from "@/app/page";

// find the container group with the given id
export const findContainerGroupById = (
  groups: ContainerGroup[],
  id: number
): ContainerGroup | undefined => {
  const groupsClone = [...groups];
  for (const group of groupsClone) {
    if (group.id === id) {
      return group;
    }
    const found = findContainerGroupById(group.containers, id);
    if (found) {
      return found;
    }
  }
  return undefined;
};

// Find the parent container group of the container with the given id
export const findParentContainerGroupById = (
  groups: ContainerGroup[],
  id: number
): ContainerGroup | undefined => {
  const groupsClone = [...groups];
  for (const group of groupsClone) {
    for (const container of group.containers) {
      if (container.id === id) {
        return group;
      }
      const found = findParentContainerGroupById(container.containers, id);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};

// Add a new container group to the container group with the given id
export const addContainerGroupById = (
  groups: ContainerGroup[],
  id: number,
  newContainerGroup: ContainerGroup
): ContainerGroup[] | null => {
  const groupsClone = [...groups];
  for (const group of groupsClone) {
    if (group.id === id) {
      group.containers.push(newContainerGroup);
      return groupsClone;
    }
    const added = addContainerGroupById(
      group.containers,
      id,
      newContainerGroup
    );
    if (added) {
      return groupsClone;
    }
  }
  return null;
};

// Delete a container group with the given id from its parent's containers field
export const deleteContainerGroupById = (
  groups: ContainerGroup[],
  id: number
): ContainerGroup[] | null => {
  const groupsClone = [...groups];
  for (const group of groupsClone) {
    const index = group.containers.findIndex(
      (container) => container.id === id
    );
    if (index !== -1) {
      group.containers.splice(index, 1);
      return groupsClone;
    }
    const deleted = deleteContainerGroupById(group.containers, id);
    if (deleted) {
      return groupsClone;
    }
  }
  return null;
};
