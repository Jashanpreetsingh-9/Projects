import React from "react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onComplete, onDelete }) {
  if (!tasks.length) {
    return (
      <div style={{ opacity: 0.6, textAlign: "center", marginTop: "20px" }}>
        No tasks yet. Add one above.
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}