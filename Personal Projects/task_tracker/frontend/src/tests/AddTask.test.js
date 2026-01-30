import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTask from "../components/AddTask";

describe("AddTask component", () => {
  test("submits a new task with name, frequency_days and notes and clears inputs", () => {
    const onAdd = jest.fn();

    render(<AddTask onAdd={onAdd} />);

    fireEvent.change(screen.getByPlaceholderText("Task name..."), {
      target: { value: "Read" },
    });

    fireEvent.change(screen.getByPlaceholderText("Frequency (days)"), {
      target: { value: "3" },
    });

    fireEvent.change(screen.getByPlaceholderText("Notes (optional)"), {
      target: { value: "Evening reading" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(onAdd).toHaveBeenCalledWith({
      name: "Read",
      frequency_days: 3,
      notes: "Evening reading",
    });

    expect(screen.getByPlaceholderText("Task name...")).toHaveValue("");
    expect(screen.getByPlaceholderText("Frequency (days)")).toHaveAttribute("value", "");
    expect(screen.getByPlaceholderText("Notes (optional)")).toHaveValue("");
  });

  test("does not submit when name or frequency are missing", () => {
    const onAdd = jest.fn();
    render(<AddTask onAdd={onAdd} />);

    fireEvent.change(screen.getByPlaceholderText("Task name..."), {
      target: { value: "" },
    });

    fireEvent.change(screen.getByPlaceholderText("Frequency (days)"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(onAdd).not.toHaveBeenCalled();
  });
});