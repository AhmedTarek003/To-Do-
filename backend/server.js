const express = require("express");
const globalErrorHandler = require("./middlewares/globelError");
require("dotenv").config();
const connectDB = require("./db/connectDb");
const cors = require("cors");
// DB
connectDB();

// express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/tasks", require("./routes/tasksRoute"));
app.use("/api/password", require("./routes/passwordRoute"));

// wrong route
app.use("*", (req, res, next) => {
  next(new Error("This is Route not found"));
});

// global error middleware
app.use(globalErrorHandler);

// port
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () =>
  console.log(`Server is Running in port ${PORT}`)
);
// errors
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled rejection ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting down........");
    process.exit(1);
  });
});
