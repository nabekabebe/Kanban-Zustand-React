import React, { useCallback, useMemo, useState } from "react";
import TaskCard from "./TaskCard.jsx";

import colStyle from "./column.module.css";
import { useTodoStore } from "../store/store.js";

export default function Column({ name }) {
  const [tasks, addTask, removeTask, updateTask] = useTodoStore((state) => [
    state.tasks,
    state.addTask,
    state.removeTask,
    state.updateTask,
  ]);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((tsk) => tsk.status.toLowerCase() === name.toLowerCase()),
    [tasks, name]
  );

  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(null);

  const taskDelete = useCallback(
    (title) => {
      removeTask(title);
    },
    [removeTask]
  );

  const [setDrag, drag] = useTodoStore((state) => [state.setDrag, state.drag]);
  const [dragActive, setDragActive] = useState(false);

  return (
    <div
      className={`${colStyle.col} ${
        dragActive ? colStyle.draggable : undefined
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        !dragActive && setDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        dragActive && setDragActive(false);
      }}
      onDrop={() => {
        updateTask(drag, name.toLowerCase());
        setDrag(null);
        setDragActive(false);
      }}
    >
      <div className={colStyle.header}>
        <h3>{name}</h3>
        <button onClick={() => setOpen(true)}>+</button>
      </div>
      <div>
        {filteredTasks &&
          filteredTasks.map((tsk) => (
            <TaskCard
              key={tsk.title}
              task={tsk}
              onDelete={(title) => taskDelete(title)}
            />
          ))}
      </div>
      {open && (
        <div className={colStyle.modal}>
          <div className={colStyle.modalContent}>
            <input
              name="todo"
              placeholder="Enter title"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <div className={colStyle.modalBtns}>
              <button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (taskTitle) {
                    addTask(taskTitle, name.toLowerCase());
                    setOpen(false);
                  }
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
