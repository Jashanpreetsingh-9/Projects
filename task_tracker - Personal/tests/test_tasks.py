import pytest
from backend.app import create_app
from backend.app.database import db

@pytest.fixture(scope="function")
def client():
    app = create_app(testing=True)

    with app.app_context():
        db.create_all()

    client = app.test_client()

    yield client

    with app.app_context():
        db.drop_all

def test_get_tasks_empty(client):
    response = client.get("/tasks/")
    assert response.status_code == 200
    assert response.get_json() == []

def test_create_client(client):
    payload = {"name": "Gym", "frequency_days":3}

    response = client.post("/tasks/", json=payload)

    assert response.status_code == 201
    data = response.get_json()

    assert data["name"] == "Gym"
    assert data["frequency_days"] == 3
    assert "last_completed" in data
    assert "next_due_date" in data


def test_complete_task(client):
    payload = {"name": "Laundary", "frequency_days":2}

    create_response = client.post("/tasks/", json=payload)
    assert create_response.status_code == 201
    
    task = create_response.get_json()
    task_id = task["id"]

    complete_response = client.patch(f"/tasks/{task_id}/complete")
    assert complete_response.status_code == 200

    updated = complete_response.get_json()

    assert updated["id"] == task_id
    assert updated["last_completed"] is not None
    assert updated["next_due_date"] is not None


def test_delete_task(client):
    payload = { "name": "Study", "frequency_days":1}

    create_response = client.post("/tasks/", json=payload)
    assert create_response.status_code == 201

    task = create_response.get_json()
    task_id = task["id"]

    delete_response = client.delete(f"/tasks/{task_id}")
    assert delete_response.status_code == 200

    get_response = client.get("/tasks/")
    tasks = get_response.get_json()

    assert all(t["id"] != task_id for t in tasks)

def test_complete_nonexistent_task(client):
    response = client.patch("/tasks/9999/complete")
    assert response.status_code == 404

    data = response.get_json()
    assert "error" in data


def test_delete_nonexistent_task(client):
    response = client.delete("/tasks/9999")
    assert response.status_code == 404

    data = response.get_json()
    assert "error" in data


def test_create_task_missing_name(client):
    payload = {"frequency_days": 3}

    response = client.post("/tasks/", json=payload)

    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data

def test_create_task_missing_frequency(client):
    payload = {"name": "Workout"}

    response = client.post("/tasks/", json=payload)

    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data


@pytest.mark.parametrize("bad_value", [0, -1, -10, "abc", None])
def test_create_task_invalid_frequency(client, bad_value):
    payload = {"name": "Meditate","frequency_days": bad_value}

    response = client.post("/tasks/", json=payload)

    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data