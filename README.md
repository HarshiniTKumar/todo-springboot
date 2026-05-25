# Smart To-Do Application

## Overview

Smart To-Do Application is a full-stack task management system developed using React and Spring Boot. The application enables users to create, update, delete, search, and manage tasks efficiently through a modern and responsive user interface.

The project demonstrates complete CRUD operations with REST API integration and MySQL database connectivity.

---

## Features

* Create new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed
* Search tasks dynamically
* Filter tasks by status

  * All Tasks
  * Completed Tasks
  * Pending Tasks
* Real-time task statistics
* Responsive and modern user interface
* Persistent task storage using MySQL

---

## Technology Stack

### Frontend

* React
* Vite
* Axios
* CSS

### Backend

* Spring Boot
* Spring Data JPA
* Hibernate
* Maven

### Database

* MySQL

---

## System Architecture

```text
React Frontend
       ↓
Axios HTTP Requests
       ↓
Spring Boot REST API
       ↓
JPA Repository Layer
       ↓
MySQL Database
```

---

## Project Structure

```text
Smart-ToDo-App/
│
├── backend/
│   ├── controller/
│   ├── entity/
│   ├── repository/
│   └── resources/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── components/
│
└── README.md
```

---

## REST API Endpoints

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | `/tasks`      | Retrieve all tasks  |
| POST   | `/tasks`      | Create a new task   |
| PUT    | `/tasks/{id}` | Update task details |
| DELETE | `/tasks/{id}` | Delete a task       |

---

## Application Screenshots

### 
### Database Table View

Add:
`Screenshot 2026-05-25 112953.png`

