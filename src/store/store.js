import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  tasks: [],
  addTask: (title, status) =>
    set(
      (store) => ({ tasks: [...store.tasks, { title, status }] }),
      false,
      "addTask"
    ),
  removeTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((tsk) => tsk.title != title),
    })),
  updateTask: (title, status) =>
    set((store) => ({
      tasks: store.tasks.map((tsk) =>
        tsk.title == title ? { title, status } : tsk
      ),
    })),
  drag: null,
  setDrag: (title) => set({ drag: title }),
});

const logMidleware = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log(...args);
      set(...args);
    },
    get,
    api
  );

export const useTodoStore = create(
  logMidleware(persist(devtools(store), { name: "todoStore" }))
);
