const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("I am Test!");
});

app.use("/hello", (req, res) => {
  res.send("I am Hello!");
});

app.use("/", (req, res) => {
  res.send("I am Home Page!");
});

app.listen(3000, () => {
  console.log("Server is running on port - 3000...");
});
