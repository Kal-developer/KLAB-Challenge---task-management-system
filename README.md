# Task Management System

A simple full-stack Task Management System built as part of the kLab Tech Upskill Full-Stack Coding Challenge.

## Technologies Used

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Python, Flask
* **Database:** SQLite
* **API Testing:** Postman

## Features

The application allows users to:

* View all tasks
* Create a new task
* Edit an existing task
* Delete a task
* Mark a task as Pending or Completed
* Filter tasks by status
* Set task priority as Low, Medium, or High
* View task status and priority using visual badges
* Edit tasks through a modal form
* Validate that a task title is provided

Each task contains:

* ID
* Title
* Description
* Status
* Priority
* Created date/time

## REST API Endpoints

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/tasks`     | Get all tasks       |
| GET    | `/tasks/:id` | Get a specific task |
| POST   | `/tasks`     | Create a new task   |
| PUT    | `/tasks/:id` | Update a task       |
| DELETE | `/tasks/:id` | Delete a task       |

## Database

The application uses SQLite as its database.

The database table is created automatically when the application starts if it does not already exist.

The `tasks` table contains:

* `id`
* `title`
* `description`
* `status`
* `priority`
* `createdAt`

## How to Run the Project

### 1. Install Python

Python 3 is required.

### 2. Install Flask

From the project folder, install Flask:

```bash
pip3 install flask
```

### 3. Run the application

```bash
python3 app.py
```

The application will start on:

`http://127.0.0.1:5001`

Open that address in a web browser to use the application.

## Project Structure

```text
Task -Management System/
│
├── app.py
├── database.db
├── .gitignore
├── README.md
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js
```

## Technical Decisions

### Flask

Flask was selected for the backend because it provides a lightweight way to build REST APIs with Python.

### SQLite

SQLite was selected because it is lightweight, does not require a separate database server, and is suitable for a small task management application.

### HTML, CSS and JavaScript

The frontend uses plain HTML, CSS and JavaScript to keep the application simple and demonstrate the connection between the user interface and the REST API.

### REST API

The frontend communicates with the backend through REST API endpoints. This separates the user interface from the backend logic and database operations.

## Testing

The API endpoints were tested using Postman, including:

* Creating tasks
* Retrieving tasks
* Retrieving a specific task
* Updating tasks
* Deleting tasks
* Checking responses for non-existent task IDs

The frontend was also tested through end-to-end user flows, including:

* Creating a task
* Editing a task
* Changing task status
* Filtering tasks
* Deleting a task
* Refreshing the page and verifying persisted data
* Checking required title validation

## Future Improvements

Possible future improvements include:

* User authentication
* Search functionality
* Pagination
* Automated backend and frontend tests
* API documentation
* Deployment to a cloud platform
* Improved backend validation
