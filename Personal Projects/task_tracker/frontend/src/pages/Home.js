import React from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import useTasks from "../hooks/useTasks";

export default function Home() {
  const { tasks, addTask, completeTask, deleteTask } = useTasks();

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <header>
        Task Tracker
        <button
          style={{
            marginLeft: "16px",
            padding: "6px 12px",
            fontSize: "14px",
          }}
          onClick={toggleDarkMode}
        >
          Toggle Theme
        </button>
      </header>

      <div className="container">
        <div className="card" style={{ marginBottom: "20px" }}>
          <AddTask onAdd={addTask} />
        </div>

        <TaskList
          tasks={tasks}
          onComplete={completeTask}
          onDelete={deleteTask}
        />
      </div>
    </>
  );
}