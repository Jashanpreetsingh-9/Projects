import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskCard from "../components/TaskCard";

describe("TaskCard", () => {
  const baseTask = {
    id: 1,
    name: "Workout",
    next_due_date: "2026-02-01",
    frequency_days: 7,
    notes: "Gym time",
    completed: false,
  };

  test("renders name, due date, frequency and notes", () => {
    render(<TaskCard task={baseTask} />);

    expect(screen.getByText("Workout")).toBeInTheDocument();
    expect(screen.getByText(/due: 2026-02-01/i)).toBeInTheDocument();
    expect(screen.getByText(/every 7 days/i)).toBeInTheDocument();
    expect(screen.getByText(/notes: gym time/i)).toBeInTheDocument();
  });

  test("shows Complete button when not completed and calls onComplete with id", () => {
    const onComplete = jest.fn();
    render(<TaskCard task={baseTask} onComplete={onComplete} />);

    const completeBtn = screen.getByRole("button", { name: /complete/i });
    fireEvent.click(completeBtn);

    expect(onComplete).toHaveBeenCalledWith(1);
  });

  test("does not show Complete button when task is completed", () => {
    render(<TaskCard task={{ ...baseTask, completed: true }} />);
    expect(screen.queryByRole("button", { name: /complete/i })).toBeNull();
  });

  test("calls onDelete when Delete button clicked", () => {
    const onDelete = jest.fn();
    render(<TaskCard task={baseTask} onDelete={onDelete} />);

    const del = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(del);

    expect(onDelete).toHaveBeenCalledWith(1);
  });
});