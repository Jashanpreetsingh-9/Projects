from flask import Blueprint, request, jsonify
from ..database import db
from ..models import Task
from datetime import date, timedelta

tasks_bp = Blueprint("tasks_bp", __name__)

@tasks_bp.route("/", methods=["GET","POST"])
def handle_tasks():
    if request.method == "POST":
        data = request.get_json() or {}

        name = data.get("name")
        frequency_days = data.get("frequency_days")
        notes = data.get("notes")

        if not name or not isinstance(name, str):
            return jsonify({"error": "Task name is required"}), 400

        if frequency_days is None or not isinstance(frequency_days, int) or frequency_days <= 0:
            return jsonify({"error": "frequency_days must be a positive integer"}), 400

        last_completed = date.today()
        next_due_date = last_completed + timedelta(days=frequency_days)

        task = Task(name=name, frequency_days=frequency_days, last_completed=last_completed, next_due_date=next_due_date, notes=notes)

        db.session.add(task)
        db.session.commit()

        return jsonify(task.to_dict()), 201
    
    tasks = Task.query.order_by(Task.id.asc()).all()
    return jsonify([task.to_dict() for task in tasks])

@tasks_bp.route("/<int:task_id>/complete", methods=["PATCH"])
def complete_task(task_id):
    task = db.session.get(Task,task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    task.last_completed = date.today()
    task.update_due_date()

    db.session.commit()

    return jsonify(task.to_dict()), 200

@tasks_bp.route("/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = db.session.get(Task, task_id)
    if not task:
        return jsonify({"error":"Task not found"}), 404
    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted"}), 200 


