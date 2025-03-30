import { ContainerGroup } from "@/app/page";
import { ITEM_CONTAINER, PARENT_CONTAINER } from "@/constants";
import { generateRandomColor } from "./helpers";

/**
 * Deeply clones a ContainerGroup object.
 *
 * @param containerGroup - The ContainerGroup object to be cloned.
 * @returns A deep clone of the provided ContainerGroup object.
 */
export function deepClone(containerGroup: ContainerGroup): ContainerGroup {
  if (containerGroup === null || typeof containerGroup !== "object") {
    return containerGroup;
  }

  if (Array.isArray(containerGroup)) {
    const arrCopy = containerGroup.map((item) =>
      deepClone(item as unknown as ContainerGroup)
    );
    return arrCopy as unknown as ContainerGroup;
  }

  const objCopy: ContainerGroup = {
    id: containerGroup.id,
    baseStyles: { ...containerGroup.baseStyles },
    customStyles: { ...containerGroup.customStyles },
    baseClasses: [...containerGroup.baseClasses],
    control: { ...containerGroup.control },
    containers: containerGroup.containers.map((container) =>
      deepClone(container)
    ),
  };

  return objCopy;
}

/**
 * Find the container group with the given id.
 *
 * @param {ContainerGroup} containerGroup - The array of container groups.
 * @param {number} id - The ID of the container group to find.
 * @returns {ContainerGroup | undefined} - The container group if found, otherwise undefined.
 */
export const findContainerGroupById = (
  containerGroup: ContainerGroup,
  id: number
): ContainerGroup | undefined => {
  const containerGroupClone = { ...containerGroup };
  if (containerGroupClone.id === id) {
    return containerGroupClone;
  }
  for (const group of containerGroupClone.containers) {
    const found = findContainerGroupById(group, id);
    if (found) {
      return found; // This exits the findContainerGroupById function and returns the value of found
    }
  }
  return undefined;
};

/**
 * Find the parent container group of the container with the given id.
 *
 * @param {ContainerGroup} containerGroup - The array of container groups.
 * @param {number} id - The ID of the container to find the parent group for.
 * @returns {ContainerGroup | undefined} - The parent container group if found, otherwise undefined.
 */

export const findParentContainerGroupById = (
  containerGroup: ContainerGroup,
  id: number
): ContainerGroup | undefined => {
  const containerGroupClone = { ...containerGroup };
  const containerGroupIndex = containerGroupClone.containers.findIndex(
    (container) => container.id === id
  );
  if (containerGroupIndex !== -1) {
    return containerGroupClone;
  }
  for (const group of containerGroupClone.containers) {
    const parent = findParentContainerGroupById(group, id);
    if (parent) {
      return parent;
    }
  }
  return undefined;
};

/**
 * Add a new container group to the container group with the given id.
 *
 * @param {ContainerGroup} containerGroup - The array of container groups.
 * @param {number} id - The ID of the container group to add the new container group to.
 * @param {ContainerGroup} newContainerGroup - The new container group to add.
 * @returns {ContainerGroup | null} - The updated array of container groups if the container group is found and added, otherwise null.
 */
export const addContainerGroupById = (
  containerGroup: ContainerGroup,
  id: number,
  newContainerGroup: ContainerGroup
): ContainerGroup | null => {
  if (containerGroup.id === id) {
    containerGroup.containers.push(newContainerGroup);
    if (containerGroup.id !== 0) {
      containerGroup.baseStyles = {
        ...containerGroup.baseStyles,
        ...PARENT_CONTAINER,
      };
    }
    return containerGroup;
  }
  for (const group of containerGroup.containers) {
    const added = addContainerGroupById(group, id, newContainerGroup);
    if (added) {
      return containerGroup;
    }
  }
  return null;
};

/**
 * Deletes a container from a group of container groups by its ID.
 *
 * @param {ContainerGroup} containerGroup - The array of container groups.
 * @param {number} id - The ID of the container to delete.
 * @returns {ContainerGroup | null} - The updated array of container groups if the container is found and deleted, otherwise null.
 */
export const deleteContainerGroupById = (
  containerGroup: ContainerGroup,
  id: number
): ContainerGroup | null => {
  const index = containerGroup.containers.findIndex(
    (container) => container.id === id
  );
  if (index !== -1) {
    containerGroup.containers.splice(index, 1);
    if (containerGroup.containers.length === 0 && containerGroup.id !== 0) {
      containerGroup.baseStyles = {
        ...generateRandomColor(),
        ...ITEM_CONTAINER,
      };
    }
    return containerGroup;
  }
  for (const group of containerGroup.containers) {
    const deleted = deleteContainerGroupById(group, id);
    if (deleted) {
      return containerGroup;
    }
  }
  return null;
};

/**
 * Updates a property of a container group identified by its ID.
 *
 * @template K - The key of the property to update.
 * @param {ContainerGroup} containerGroup - The array of container groups.
 * @param {number} id - The ID of the container group to update.
 * @param {K} property - The property to update.
 * @param {ContainerGroup[K]} value - The new value for the property.
 * @returns {ContainerGroup | null} - The updated array of container groups, or null if the ID was not found.
 */
export const updateContainerGroupPropertyById = <
  K extends keyof ContainerGroup
>(
  containerGroup: ContainerGroup,
  id: number,
  property: K,
  value: ContainerGroup[K]
): ContainerGroup | null => {
  const containerGroupClone = { ...containerGroup };
  if (property === "id") {
    console.warn("⚠️ Cannot update the ID of a container group");
    return null;
  }
  if (containerGroupClone.id === id) {
    containerGroupClone[property] = value;
    return containerGroupClone;
  }

  for (const group of containerGroupClone.containers) {
    const updated = updateContainerGroupPropertyById(
      group,
      id,
      property,
      value
    );
    if (updated) {
      containerGroupClone.containers = containerGroupClone.containers.map(
        (element) => (element.id === updated.id ? updated : element)
      );
      return containerGroupClone;
    }
  }
  return null;
};

type ContainerGroupKeys = keyof ContainerGroup;
type StylesKeys = Extract<ContainerGroupKeys, "baseStyles" | "customStyles">;

export const mergeContainerGroupStylesById = <K extends StylesKeys>(
  containerGroup: ContainerGroup,
  id: number,
  property: K,
  value: ContainerGroup[K]
): ContainerGroup | null => {
  const containerGroupClone = { ...containerGroup };
  if (containerGroupClone.id === id) {
    containerGroupClone[property] = {
      ...containerGroupClone[property],
      ...value,
    };
    return containerGroupClone;
  }
  for (const group of containerGroupClone.containers) {
    const updated = updateContainerGroupPropertyById(
      group,
      id,
      property,
      value
    );
    if (updated) {
      return containerGroupClone;
    }
  }
  return null;
};

type ClassesKeys = Extract<ContainerGroupKeys, "baseClasses">;

export const mergeContainerGroupClassesById = <K extends ClassesKeys>(
  containerGroup: ContainerGroup,
  id: number,
  property: K,
  value: ContainerGroup[K]
): ContainerGroup | null => {
  const containerGroupClone = { ...containerGroup };
  if (containerGroupClone.id === id) {
    containerGroupClone[property] = [
      ...new Set([...containerGroupClone[property], ...value]),
    ];
    return containerGroupClone;
  }
  for (const group of containerGroupClone.containers) {
    const updated = updateContainerGroupPropertyById(
      group,
      id,
      property,
      value
    );
    if (updated) {
      return containerGroupClone;
    }
  }
  return null;
};

export function compareContainerGroups(
  containerGroup1: ContainerGroup,
  containerGroup2: ContainerGroup
) {
  if (
    typeof containerGroup1 !== "object" ||
    typeof containerGroup2 !== "object" ||
    containerGroup1 === null ||
    containerGroup2 === null
  ) {
    return containerGroup1 === containerGroup2;
  }

  const keys1 = Object.keys(containerGroup1) as (keyof ContainerGroup)[];
  const keys2 = Object.keys(containerGroup2) as (keyof ContainerGroup)[];

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (
      !containerGroup2.hasOwnProperty(key) ||
      !compareContainerGroups(
        containerGroup1[key] as ContainerGroup,
        containerGroup2[key] as ContainerGroup
      )
    ) {
      return false;
    }
  }
  return true;
}

export function findNextValidContainerGroup(
  containerGroup: ContainerGroup,
  currentId: number
): ContainerGroup {
  // Flatten the containerGroup tree into a list of all containerGroups
  const flattenContainerGroups = (group: ContainerGroup): ContainerGroup[] => {
    return [group, ...group.containers.flatMap(flattenContainerGroups)];
  };
  const allContainerGroups = flattenContainerGroups(containerGroup);

  // Sort the containerGroups by id in descending order
  const sortedContainerGroups = allContainerGroups.sort((a, b) => b.id - a.id);

  // Find the next containerGroup with an id less than the currentId
  const nextContainerGroup = sortedContainerGroups.find(
    (group) => group.id < currentId
  );

  // If no valid containerGroup is found, return the root containerGroup (id = 0)
  return nextContainerGroup || containerGroup;
}
