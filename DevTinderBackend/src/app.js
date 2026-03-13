const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("I am Test!");
});

app.get("/user", (req, res) => {
  res.send({ firstName: "Aarsh", lastName: "Singh" });
});

app.post("/user", (req, res) => {
  res.send("Database updated successfully!");
});

app.delete("/user", (req, res) => {
  res.send("Deleted user successfully!");
});

// app.use("/hello/2", (req, res) => {
//   res.send("I am Hello from 2!");
// });

// app.use("/hello", (req, res) => {
//   res.send("I am Hello!");
// });

app.use("/", (req, res) => {
  res.send("I am Home Page!");
});

app.listen(3000, () => {
  console.log("Server is running on port - 3000...");
});
