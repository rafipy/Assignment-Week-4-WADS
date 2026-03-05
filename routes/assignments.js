const express = require("express");
const router = express.Router();
const assignments = require("../data/assignments");

let nextId = assignments.length + 1;

/**
 * @swagger
 * /api/assignments:
 *   get:
 *     summary: Returns a list of assignments
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get("/", (req, res) => {
  res.json(assignments);
});

/**
 * @swagger
 * /api/assignments/{id}:
 *   get:
 *     summary: Get an assignment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A successful response
 *       404:
 *         description: Assignment not found
 */

router.get("/:id", (req, res) => {
  const assignment = assignments.find((a) => a.id === parseInt(req.params.id));
  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }
  res.json(assignment);
});

/**
 * @swagger
 * /api/assignments:
 *   post:
 *     summary: Create a new assignment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Created, In Process, Submitted]
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Assignment with that title already exists
 */
router.post("/", (req, res) => {
  const { title, description, dueDate } = req.body;
  const duplicate = assignments.find((a) => a.title === title);
  if (duplicate)
    return res
      .status(409)
      .json({ message: "Assignment with that title already exists" });

  if (!title || !description)
    return res.status(400).json({ message: "Missing required fields" });

  const newAssignment = {
    id: nextId++,
    title,
    description,
    status: "Created",
    assignmentDate: new Date().toISOString(),
    dueDate: dueDate || null,
  };

  assignments.push(newAssignment);
  res.status(201).json(newAssignment);
});

/**
 * @swagger
 * /api/assignments/{id}:
 *   put:
 *     summary: Update an assignment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Created, In Process, Submitted]
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Assignment updated
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Assignment not found
 */
router.put("/:id", (req, res) => {
  const assignment = assignments.find((a) => a.id === parseInt(req.params.id));
  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  const { title, description, status, dueDate } = req.body;

  if (!title || !description || !status || !dueDate)
    return res.status(400).json({ message: "Missing required fields" });

  assignment.title = title;
  assignment.description = description;
  assignment.status = status;
  assignment.dueDate = dueDate;

  res.json(assignment);
});

/**
 * @swagger
 * /api/assignments/{id}:
 *   delete:
 *     summary: Delete an assignment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Assignment deleted
 *
 *       404:
 *         description: Assignment not found
 */
router.delete("/:id", (req, res) => {
  const assignment = assignments.find((a) => a.id === parseInt(req.params.id));
  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  assignments.splice(assignments.indexOf(assignment), 1);
  res.status(200).json({ message: "Assignment deleted" });
});

module.exports = router;
