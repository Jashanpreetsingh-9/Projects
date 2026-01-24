const API_URL = "http://localhost:5000/tasks"; // change to your deployed backend later

export async function getTasks() {
  const res = await fetch(`${API_URL}/`);
  return res.json();
}

export async function createTask({ name, frequency_days, notes }) {
  const res = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({name, frequency_days, notes}),
  });
  return res.json();
}

export async function completeTask(id) {
  const res = await fetch(`${API_URL}/${id}/complete`, {
    method: "PATCH", 
  });
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}