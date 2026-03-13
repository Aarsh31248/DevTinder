const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.get("/user", userAuth, (req, res) => {
  // throw new Error("Error occur");
  res.send("Single user data!");
});

app.post("/user/login", (req, res) => {
  res.send("Login successfully!");
});

app.use("/admin", adminAuth);

app.get("/admin/getAllUsers", (req, res) => {
  console.log("get all users");
  res.send("Sent all users data");
});

app.get("/admin/deleteUser", (req, res) => {
  console.log("delete user");
  res.send("delete user data");
});

// const res1 = (req, res, next) => {
//   console.log("I am response 1");
//   next();
// };

// const res2 = (req, res, next) => {
//   console.log("I am response 2");
//   res.send("2nd response!!");
// };

// app.get("/user", [res1, res2]);

// app.get("/user/:userId/:name/:phone", (req, res) => {
//   console.log(req.params);
//   res.send({ firstName: "Aarsh", lastName: "Singh" });
// });

// app.get("/test", (req, res) => {
//   console.log(req.query);
//   res.send({ firstName: "Aarsh", lastName: "Singh" });
// });

// app.use("/test", (req, res) => {
//   res.send("I am Test!");
// });

// app.get("/user", (req, res) => {
//   res.send({ firstName: "Aarsh", lastName: "Singh" });
// });

// app.post("/user", (req, res) => {
//   res.send("Database updated successfully!");
// });

// app.delete("/user", (req, res) => {
//   res.send("Deleted user successfully!");
// });

// app.use("/hello/2", (req, res) => {
//   res.send("I am Hello from 2!");
// });

// app.use("/hello", (req, res) => {
//   res.send("I am Hello!");
// });

// app.use("/", (req, res) => {
//   res.send("I am Home Page!");
// });

// Wildcard Error handling, keep it towards the end always
// Better way to handle errors is try and catch
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port - 3000...");
});
