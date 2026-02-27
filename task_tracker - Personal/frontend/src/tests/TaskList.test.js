import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "../components/TaskList";

test("shows empty message when there are no tasks", () => {
  render(<TaskList tasks={[]} />);
  expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
});

test("renders tasks using TaskCard and shows due date", () => {
  const tasks = [
    { id: 1, name: "Workout", next_due_date: "2026-02-01", frequency_days: 7 },
    { id: 2, name: "Study", next_due_date: "2026-02-02", frequency_days: 1 },
  ];

  render(<TaskList tasks={tasks} />);

  expect(screen.getByText("Workout")).toBeInTheDocument();
  expect(screen.getByText("Study")).toBeInTheDocument();
  expect(screen.getByText(/due: 2026-02-01/i)).toBeInTheDocument();
});