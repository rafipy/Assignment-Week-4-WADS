## Assignments API

Method | Endpoint              | Description                 | Request Body                                              | Response Body
------ | --------------------- | --------------------------- | --------------------------------------------------------- | -------------------------------------------------------
GET    | /api/assignments      | Get all assignments         | None                                                      | `[{ id, title, description, status, assignmentDate, dueDate }]`
POST   | /api/assignments      | Creates a new assignment    | `{ title, description, dueDate }`                         | `{ id, title, description, status, assignmentDate, dueDate }`
GET    | /api/assignments/{id} | Get assignment by ID        | None                                                      | `{ id, title, description, status, assignmentDate, dueDate }`
PUT    | /api/assignments/{id} | Updates an assignment by ID | `{ title, description, status, dueDate }`                 | `{ id, title, description, status, assignmentDate, dueDate }`
DELETE | /api/assignments/{id} | Deletes an assignment by ID | None                                                      | None
