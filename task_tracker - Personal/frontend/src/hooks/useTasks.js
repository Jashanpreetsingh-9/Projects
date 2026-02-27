import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  completeTask as apiCompleteTask,
  deleteTask as apiDeleteTask,
} from "../api/tasks";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  // Load tasks on first render
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const addTask = async (text) => {
    const newTask = await createTask(text);
    setTasks((prev) => [...prev, newTask]);
  };

  const completeTask = async (id) => {
    await apiCompleteTask(id);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const deleteTask = async (id) => {
    await apiDeleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    completeTask,
    deleteTask,
  };
}