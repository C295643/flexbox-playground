import {
  findContainerGroupById,
  findParentContainerGroupById,
  addContainerGroupById,
  deleteContainerGroupById,
  updateContainerGroupPropertyById,
} from "../containerUtils";
import { ContainerGroup } from "@/app/page";
import { PARENT_BACKGROUND } from "@/constants";

describe("containerUtils", () => {
  let containerGroup: ContainerGroup;

  beforeEach(() => {
    containerGroup = {
      id: 0,
      baseStyles: { backgroundColor: "white" },
      customStyles: {},
      baseClasses: ["main-container"],
      control: { type: "control" },
      containers: [
        {
          id: 1,
          baseStyles: { backgroundColor: "white" },
          customStyles: {},
          baseClasses: ["container"],
          control: { type: "control" },
          containers: [],
        },
        {
          id: 2,
          baseStyles: PARENT_BACKGROUND,
          customStyles: {},
          baseClasses: ["container"],
          control: { type: "control" },
          containers: [
            {
              id: 3,
              baseStyles: { backgroundColor: "white" },
              customStyles: {},
              baseClasses: ["container"],
              control: { type: "control" },
              containers: [],
            },
          ],
        },
      ],
    };
  });

  test("findContainerGroupById should find the correct group", () => {
    const result = findContainerGroupById(containerGroup, 3);
    expect(result).toEqual({
      id: 3,
      baseStyles: { backgroundColor: "white" },
      customStyles: {},
      baseClasses: ["container"],
      control: { type: "control" },
      containers: [],
    });
  });

  test("findParentContainerGroupById should find the correct parent group", () => {
    const result = findParentContainerGroupById(containerGroup, 3);
    expect(result).toEqual({
      id: 2,
      baseStyles: PARENT_BACKGROUND,
      customStyles: {},
      baseClasses: ["container"],
      control: { type: "control" },
      containers: [
        {
          id: 3,
          baseStyles: { backgroundColor: "white" },
          customStyles: {},
          baseClasses: ["container"],
          control: { type: "control" },
          containers: [],
        },
      ],
    });
  });

  test("addContainerGroupById should add a new container group", () => {
    const newGroup = {
      id: 4,
      baseStyles: { backgroundColor: "white" },
      customStyles: {},
      baseClasses: ["container"],
      control: { type: "control" },
      containers: [],
    };
    const result = addContainerGroupById(containerGroup, 2, newGroup);
    expect(result).toEqual({
      id: 0,
      baseStyles: { backgroundColor: "white" },
      customStyles: {},
      baseClasses: ["main-container"],
      control: { type: "control" },
      containers: [
        {
          id: 1,
          baseStyles: { backgroundColor: "white" },
          customStyles: {},
          baseClasses: ["container"],
          control: { type: "control" },
          containers: [],
        },
        {
          id: 2,
          baseStyles: PARENT_BACKGROUND,
          customStyles: {},
          baseClasses: ["container"],
          control: { type: "control" },
          containers: [
            {
              id: 3,
              baseStyles: { backgroundColor: "white" },
              customStyles: {},
              baseClasses: ["container"],
              control: { type: "control" },
              containers: [],
            },
            {
              id: 4,
              baseStyles: { backgroundColor: "white" },
              customStyles: {},
              baseClasses: ["container"],
              control: { type: "control" },
              containers: [],
            },
          ],
        },
      ],
    });
  });

  test("deleteContainerGroupById should delete the correct container group", () => {
    const result = deleteContainerGroupById(containerGroup, 2);
    expect(result).toEqual({
      id: 0,
      baseStyles: { backgroundColor: "white" },
      customStyles: {},
      baseClasses: ["main-container"],
      control: { type: "control" },
      containers: [
        {
          id: 1,
          baseStyles: { backgroundColor: "white" },
          customStyles: {},
          baseClasses: ["container"],
          control: { type: "control" },
          containers: [],
        },
      ],
    });
  });

  test("updateContainerGroupPropertyById should update the correct property", () => {
    const result = updateContainerGroupPropertyById(
      containerGroup,
      3,
      "baseStyles",
      {
        backgroundColor: "red",
      }
    );
    expect(result).toEqual({
      id: 0,
      baseStyles: { backgroundColor: "white" },
      customStyles: {},
      baseClasses: ["main-container"],
      control: { type: "control" },
      containers: [
        {
          id: 1,
          baseStyles: { backgroundColor: "white" },
          customStyles: {},
          baseClasses: ["container"],
          control: { type: "control" },
          containers: [],
        },
        {
          id: 2,
          baseStyles: PARENT_BACKGROUND,
          customStyles: {},
          baseClasses: ["container"],
          control: { type: "control" },
          containers: [
            {
              id: 3,
              baseStyles: {
                backgroundColor: "red",
              },
              customStyles: {},
              baseClasses: ["container"],
              control: { type: "control" },
              containers: [],
            },
          ],
        },
      ],
    });
  });
});
