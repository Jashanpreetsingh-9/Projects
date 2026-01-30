import { renderHook, act, waitFor } from "@testing-library/react";
import useTasks from "../hooks/useTasks";
import * as api from "../api/tasks";

jest.mock("../api/tasks");

describe("useTasks hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("loads tasks on mount", async () => {
    const tasks = [
      { id: 1, name: "A", next_due_date: "2026-02-01", frequency_days: 7 },
    ];

    api.getTasks.mockResolvedValue(tasks);

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.tasks).toEqual(tasks));
  });

  test("addTask calls createTask and appends task", async () => {
    api.getTasks.mockResolvedValue([]);
    const newTask = { id: 2, name: "New", next_due_date: "2026-02-02", frequency_days: 3 };
    api.createTask.mockResolvedValue(newTask);

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.tasks).toEqual([]));

    await act(async () => {
      await result.current.addTask({ name: "New", frequency_days: 3 });
    });

    expect(api.createTask).toHaveBeenCalledWith({ name: "New", frequency_days: 3 });
    await waitFor(() => expect(result.current.tasks).toContainEqual(newTask));
  });

  test("completeTask marks a task completed", async () => {
    const tasks = [{ id: 1, name: "A", next_due_date: "2026-02-01", frequency_days: 7, completed: false }];
    api.getTasks.mockResolvedValue(tasks);
    api.completeTask.mockResolvedValue({});

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.tasks).toEqual(tasks));

    await act(async () => {
      await result.current.completeTask(1);
    });

    expect(api.completeTask).toHaveBeenCalledWith(1);
    await waitFor(() => expect(result.current.tasks.find(t => t.id === 1).completed).toBe(true));
  });

  test("deleteTask removes a task", async () => {
    const tasks = [{ id: 1, name: "A", next_due_date: "2026-02-01", frequency_days: 7, completed: false }];
    api.getTasks.mockResolvedValue(tasks);
    api.deleteTask.mockResolvedValue({});

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.tasks).toEqual(tasks));

    await act(async () => {
      await result.current.deleteTask(1);
    });

    expect(api.deleteTask).toHaveBeenCalledWith(1);
    await waitFor(() => expect(result.current.tasks).toEqual([]));
  });
});