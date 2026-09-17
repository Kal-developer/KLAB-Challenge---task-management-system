from flask import Flask,request, render_template
import sqlite3
from datetime import datetime
app = Flask(__name__)

def init_db():
    connection = sqlite3.connect("database.db")

    connection.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT NOT NULL,
            priority TEXT NOT NULL,
            createdAt TEXT NOT NULL
        )
    """)

    connection.commit()
    connection.close()


init_db()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/tasks", methods=["GET"])
def get_tasks():
    connection = sqlite3.connect("database.db")
    connection.row_factory = sqlite3.Row

    tasks = connection.execute("SELECT * FROM tasks").fetchall()

    connection.close()

    return [dict(task) for task in tasks]

@app.route("/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    connection = sqlite3.connect("database.db")
    connection.row_factory = sqlite3.Row

    task = connection.execute(
        "SELECT * FROM tasks WHERE id = ?",
        (task_id,)
    ).fetchone()

    connection.close()

    if task is None:
        return {"message": "Task not found"}, 404

    return dict(task), 200



@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()

    title = data["title"]
    description = data.get("description", "")
    status = data.get("status", "Pending")
    priority = data.get("priority", "Medium")
    created_at = datetime.now().isoformat()

    connection = sqlite3.connect("database.db")

    cursor = connection.execute(
        """
        INSERT INTO tasks (title, description, status, priority, createdAt)
        VALUES (?, ?, ?, ?, ?)
        """,
        (title, description, status, priority, created_at)
    )

    connection.commit()

    task_id = cursor.lastrowid

    connection.close()

    return {
        "message": "Task created successfully",
        "id": task_id
    }, 201

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()

    title = data["title"]
    description = data.get("description", "")
    status = data.get("status", "Pending")
    priority = data.get("priority", "Medium")

    connection = sqlite3.connect("database.db")

    cursor = connection.execute(
        """
        UPDATE tasks
        SET title = ?, description = ?, status = ?, priority = ?
        WHERE id = ?
        """,
        (title, description, status, priority, task_id)
    )

    connection.commit()

    if cursor.rowcount == 0:
        connection.close()
        return {"message": "Task not found"}, 404

    connection.close()

    return {"message": "Task updated successfully"}, 200


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    connection = sqlite3.connect("database.db")

    cursor = connection.execute(
        "DELETE FROM tasks WHERE id = ?",
        (task_id,)
    )

    connection.commit()

    if cursor.rowcount == 0:
        connection.close()
        return {"message": "Task not found"}, 404

    connection.close()

    return {"message": "Task deleted successfully"}, 200

if __name__ == "__main__":
    app.run(debug=True, port=5001)