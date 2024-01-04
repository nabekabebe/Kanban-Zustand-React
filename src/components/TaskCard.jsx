import React from "react";
import taskStyle from "./taskcard.module.css";
import { MdDelete } from "react-icons/md";
import { useTodoStore } from "../store/store";

export default function TaskCard({ task: { title, status }, onDelete }) {
  const setDrag = useTodoStore((state) => state.setDrag);

  const getColor = (status) => {
    switch (status) {
      case "in progress":
        return "teal";
      case "done":
        return "green";
      default:
        return "grey";
    }
  };

  return (
    <div
      className={taskStyle.task}
      draggable
      onDragStart={() => {
        setDrag(title);
      }}
    >
      <div>
        <h4>{title}</h4>
      </div>
      <div className={taskStyle.footer}>
        <div>
          <MdDelete
            onClick={() => onDelete(title)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          style={{ backgroundColor: getColor(status) }}
          className={taskStyle.status}
        >
          {status}
        </div>
      </div>
    </div>
  );
}
