import React, { useState } from "react";

export default function AddTask({ onAdd }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !frequency) return;

    onAdd({
      name,
      frequency_days: parseInt(frequency, 10),
      notes,
    });

    setName("");
    setFrequency("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
      <input
        type="text"
        placeholder="Task name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Frequency (days)"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      />

      <input
        type="text"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}