const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const filterStatus = document.getElementById("filterStatus");

let tasks = [];


// Get tasks from the browser

async function loadTasks() {

    const response = await fetch("/tasks");

    tasks = await response.json();

    displayTasks();
}


// Display tasks

function displayTasks() {

    taskList.innerHTML = "";

    const selectedStatus = filterStatus.value;

    tasks.forEach(function(task) {

        if (selectedStatus !== "All" && task.status !== selectedStatus) {
            return;
        }

        const taskCard = document.createElement("div");

        taskCard.className = "task-card";

        taskCard.innerHTML = `
            <h3>${task.title}</h3>

            <p>${task.description}</p>

         <p>
    <strong>Status:</strong>
    <span class="status-badge ${task.status.toLowerCase()}">
        ${task.status}
    </span>
</p>

<p>
    <strong>Priority:</strong>
    <span class="priority-badge ${task.priority.toLowerCase()}">
        ${task.priority}
    </span>
</p>

            <button onclick="editTask(${task.id})">Edit</button>

            <button onclick="deleteTask(${task.id})">Delete</button>

            <button onclick="toggleStatus(${task.id})">
                ${task.status === "Pending" ? "Mark Completed" : "Mark Pending"}
            </button>
        `;

        taskList.appendChild(taskCard);
    });
}

filterStatus.addEventListener("change", function() {
    displayTasks();
});

// Edit task

let editingTaskId = null;

const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const cancelEdit = document.getElementById("cancelEdit");

cancelEdit.addEventListener("click", function() {
    editModal.style.display = "none";
});

editForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const task = tasks.find(function(item) {
        return item.id === editingTaskId;
    });

    if (!task) {
        return;
    }

    const updatedTask = {
        title: document.getElementById("editTitle").value,
        description: document.getElementById("editDescription").value,
        status: document.getElementById("editStatus").value,
        priority: document.getElementById("editPriority").value
    };

    const response = await fetch(`/tasks/${editingTaskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
    });

    if (response.ok) {
        editModal.style.display = "none";
        editingTaskId = null;
        loadTasks();
    }
});


function editTask(taskId) {

    const task = tasks.find(function(item) {
        return item.id === taskId;
    });

    if (!task) {
        return;
    }

    editingTaskId = taskId;

    document.getElementById("editTitle").value = task.title;
    document.getElementById("editDescription").value = task.description;
    document.getElementById("editStatus").value = task.status;
    document.getElementById("editPriority").value = task.priority;

    editModal.style.display = "flex";
}

// delete task

async function deleteTask(taskId) {

    const confirmed = confirm("Are you sure you want to delete this task?");

    if (!confirmed) {
        return;
    }

    const response = await fetch(`/tasks/${taskId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        loadTasks();
    }
}

// Mark complete


async function toggleStatus(taskId) {

    const task = tasks.find(function(item) {
        return item.id === taskId;
    });

    if (!task) {
        return;
    }

    const newStatus = task.status === "Pending"
        ? "Completed"
        : "Pending";

    const response = await fetch(`/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: task.title,
            description: task.description,
            status: newStatus,
            priority: task.priority
        })
    });

    if (response.ok) {
        loadTasks();
    }
}

// Create task

taskForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const newTask = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value
    };

    const response = await fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    });

    if (response.ok) {
        taskForm.reset();
        loadTasks();
    }
});


loadTasks();