import { ContainerGroup } from "@/app/page";

/**
 * Find the container group with the given id.
 *
 * @param {ContainerGroup[]} groups - The array of container groups.
 * @param {number} id - The ID of the container group to find.
 * @returns {ContainerGroup | undefined} - The container group if found, otherwise undefined.
 */
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

/**
 * Find the parent container group of the container with the given id.
 *
 * @param {ContainerGroup[]} groups - The array of container groups.
 * @param {number} id - The ID of the container to find the parent group for.
 * @returns {ContainerGroup | undefined} - The parent container group if found, otherwise undefined.
 */

export const findParentContainerGroupById = (
  groups: ContainerGroup[],
  id: number
): ContainerGroup | undefined => {
  const groupsClone = [...groups];
  for (const containerGroup of groupsClone) {
    const containerGroupIndex = containerGroup.containers.findIndex(
      (container) => container.id === id
    );
    if (containerGroupIndex !== -1) {
      return containerGroup;
    }
    const parent = findParentContainerGroupById(containerGroup.containers, id);
    if (parent) {
      return parent;
    }
  }
  return undefined;
};

/**
 * Add a new container group to the container group with the given id.
 *
 * @param {ContainerGroup[]} groups - The array of container groups.
 * @param {number} id - The ID of the container group to add the new container group to.
 * @param {ContainerGroup} newContainerGroup - The new container group to add.
 * @returns {ContainerGroup[] | null} - The updated array of container groups if the container group is found and added, otherwise null.
 */
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
    const newGroupsClone = addContainerGroupById(
      group.containers,
      id,
      newContainerGroup
    );
    if (newGroupsClone) {
      return groupsClone;
    }
  }
  return null;
};

/**
 * Deletes a container from a group of container groups by its ID.
 *
 * @param {ContainerGroup[]} groups - The array of container groups.
 * @param {number} id - The ID of the container to delete.
 * @returns {ContainerGroup[] | null} - The updated array of container groups if the container is found and deleted, otherwise null.
 */
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

/**
 * Updates a property of a container group identified by its ID.
 *
 * @template K - The key of the property to update.
 * @param {ContainerGroup[]} containerGroup - The array of container groups.
 * @param {number} id - The ID of the container group to update.
 * @param {K} property - The property to update.
 * @param {ContainerGroup[K]} value - The new value for the property.
 * @returns {ContainerGroup[] | null} - The updated array of container groups, or null if the ID was not found.
 */
export const updateContainerGroupPropertyById = <
  K extends keyof ContainerGroup
>(
  containerGroup: ContainerGroup[],
  id: number,
  property: K,
  value: ContainerGroup[K]
): ContainerGroup[] | null => {
  if (property === "id") {
    console.warn("⚠️ Cannot update the ID of a container group");
    return null;
  }
  const groupsClone = [...containerGroup];
  for (const group of groupsClone) {
    if (group.id === id) {
      group[property] = value;
      return groupsClone;
    }
    const updated = updateContainerGroupPropertyById(
      group.containers,
      id,
      property,
      value
    );
    if (updated) {
      return groupsClone;
    }
  }
  return null;
};
