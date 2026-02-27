import React from "react";

export default function TaskCard({ task, onComplete, onDelete }) {
  return (
    <div
      className="card"
      style={{
        marginBottom: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          opacity: task.completed ? 0.6 : 1,
          fontSize: "16px",
        }}
      >
        <strong>{task.name}</strong>
        <div style={{ fontSize: "14px", opacity: 0.8 }}>
          Due: {task.next_due_date}
        </div>
        <div style={{ fontSize: "14px", opacity: 0.8 }}>
          Every {task.frequency_days} days
        </div>
        {task.notes && (
          <div style={{ fontSize: "14px", opacity: 0.8 }}>
            Notes: {task.notes}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        {!task.completed && (
          <button
            onClick={() => onComplete(task.id)}
            style={{
              background: "var(--accent)",
              padding: "8px 12px",
              fontSize: "14px",
            }}
          >
            Complete
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          style={{
            background: "#ef4444",
            padding: "8px 12px",
            fontSize: "14px",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}