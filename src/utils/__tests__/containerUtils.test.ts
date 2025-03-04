import { ContainerType } from "@/types/Container";
import {
  findContainerGroupById,
  findParentContainerGroupById,
  addContainerGroupById,
  deleteContainerGroupById,
  updateContainerGroupPropertyById,
} from "../containerUtils";
import { ContainerGroup } from "@/app/page";

describe("containerUtils", () => {
  let groups: ContainerGroup[];

  beforeEach(() => {
    groups = [
      {
        id: 0,
        type: ContainerType.MAIN,
        baseStyles: {},
        customStyles: "",
        control: { type: "control" },
        containers: [
          {
            id: 1,
            type: ContainerType.CONTAINER,
            baseStyles: {},
            customStyles: "",
            control: { type: "control" },
            containers: [],
          },
          {
            id: 2,
            type: ContainerType.ITEM,
            baseStyles: {},
            customStyles: "",
            control: { type: "control" },
            containers: [
              {
                id: 3,
                type: ContainerType.ITEM,
                baseStyles: {},
                customStyles: "",
                control: { type: "control" },
                containers: [],
              },
            ],
          },
        ],
      },
    ];
  });

  test("findContainerGroupById should find the correct group", () => {
    const result = findContainerGroupById(groups, 3);
    expect(result).toEqual({
      id: 3,
      type: ContainerType.ITEM,
      baseStyles: {},
      customStyles: "",
      control: { type: "control" },
      containers: [],
    });
  });

  test("findParentContainerGroupById should find the correct parent group", () => {
    const result = findParentContainerGroupById(groups, 3);
    expect(result).toEqual({
      id: 2,
      type: ContainerType.ITEM,
      baseStyles: {},
      customStyles: "",
      control: { type: "control" },
      containers: [
        {
          id: 3,
          type: ContainerType.ITEM,
          baseStyles: {},
          customStyles: "",
          control: { type: "control" },
          containers: [],
        },
      ],
    });
  });

  test("addContainerGroupById should add a new container group", () => {
    const newGroup = {
      id: 4,
      type: ContainerType.ITEM,
      baseStyles: {},
      customStyles: "",
      control: { type: "control" },
      containers: [],
    };
    const result = addContainerGroupById(groups, 2, newGroup);
    expect(result).toEqual([
      {
        id: 0,
        type: ContainerType.MAIN,
        baseStyles: {},
        customStyles: "",
        control: { type: "control" },
        containers: [
          {
            id: 1,
            type: ContainerType.CONTAINER,
            baseStyles: {},
            customStyles: "",
            control: { type: "control" },
            containers: [],
          },
          {
            id: 2,
            type: ContainerType.ITEM,
            baseStyles: {},
            customStyles: "",
            control: { type: "control" },
            containers: [
              {
                id: 3,
                type: ContainerType.ITEM,
                baseStyles: {},
                customStyles: "",
                control: { type: "control" },
                containers: [],
              },
              {
                id: 4,
                type: ContainerType.ITEM,
                baseStyles: {},
                customStyles: "",
                control: { type: "control" },
                containers: [],
              },
            ],
          },
        ],
      },
    ]);
  });

  test("deleteContainerGroupById should delete the correct container group", () => {
    const result = deleteContainerGroupById(groups, 2);
    expect(result).toEqual([
      {
        id: 0,
        type: ContainerType.MAIN,
        baseStyles: {},
        customStyles: "",
        control: { type: "control" },
        containers: [
          {
            id: 1,
            type: ContainerType.CONTAINER,
            baseStyles: {},
            customStyles: "",
            control: { type: "control" },
            containers: [],
          },
        ],
      },
    ]);
  });

  test("updateContainerGroupPropertyById should update the correct property", () => {
    const result = updateContainerGroupPropertyById(groups, 2, "baseStyles", {
      backgroundColor: "red",
    });
    expect(result).toEqual([
      {
        id: 0,
        type: ContainerType.MAIN,
        baseStyles: {},
        customStyles: "",
        control: { type: "control" },
        containers: [
          {
            id: 1,
            type: ContainerType.CONTAINER,
            baseStyles: {},
            customStyles: "",
            control: { type: "control" },
            containers: [],
          },
          {
            id: 2,
            type: ContainerType.ITEM,
            baseStyles: {
              backgroundColor: "red",
            },
            customStyles: "",
            control: { type: "control" },
            containers: [
              {
                id: 3,
                type: ContainerType.ITEM,
                baseStyles: {},
                customStyles: "",
                control: { type: "control" },
                containers: [],
              },
            ],
          },
        ],
      },
    ]);
  });
});
