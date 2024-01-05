import { useEffect } from "react";
import { useTodoStore } from "./store";
import { render } from "@testing-library/react";
import { expect, jest } from "@jest/globals";

jest.mock("zustand");

function TestComponent({ selector, effect }) {
  const items = useTodoStore(selector);

  useEffect(() => effect(items), [items]);

  return null;
}

describe("store initialized", () => {
  it("store should be empty", () => {
    const selector = (store) => store.tasks;
    const effect = jest.fn();
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledWith([]);
  });
});

describe("store add", () => {
  it("should add task to store", () => {
    let tasks = [];
    const selector = (store) => ({
      tasks: store.tasks,
      addTask: store.addTask,
    });
    const effect = jest.fn().mockImplementation((items) => {
      if (items.tasks.length == 0) {
        items.addTask("new task", "todo");
      }
      tasks = items.tasks;
    });
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledTimes(2);
    expect(tasks.length).toEqual(1);
    expect(effect).toHaveBeenCalledWith(
      expect.objectContaining({
        tasks: [{ title: "new task", status: "todo" }],
      })
    );
  });
});

describe("store add and remove", () => {
  it("should add task to store and remove that task", () => {
    let tasks = [];
    let isTaskCreated = false;
    const selector = (store) => ({
      tasks: store.tasks,
      addTask: store.addTask,
      removeTask: store.removeTask,
    });
    const effect = jest.fn().mockImplementation((items) => {
      console.log(items.tasks);
      if (!isTaskCreated) {
        items.addTask("new task", "todo");
        isTaskCreated = true;
      } else if (items.tasks.length == 1) {
        items.removeTask("new task");
      }
      tasks = items.tasks;
    });
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledTimes(3);
    expect(tasks.length).toEqual(0);
  });
});
