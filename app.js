const express = require("express");
const app = express();
const port = 8080;
const assignmentsRouter = require("./routes/assignments");
const { specs, swaggerUi } = require("./swagger");

app.use(express.json());
app.use("/api/assignments", assignmentsRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("Welcome to the Assignment API!");
});

app.listen(port, () => {
  console.log(`App is now listening at http://localhost:${port}`);
});
