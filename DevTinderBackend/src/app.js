const { validation } = require("./utils/validation");
const bcrypt = require("bcrypt");
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

// TO put the user data in the database
app.post("/signup", async (req, res) => {
  try {
    // validate the user
    validation(req);

    // Encryption of password using bcrypt
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Checking user email and password for login
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Successfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// To find single user with emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (!users) {
      res.status(404).send("User not found!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

// To find all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(404).send("Users not found!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

// Delete the user by ID
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

// To update the user data with ID
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["skills", "age", "gender", "about", "photoUrl"];
    const isAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isAllowed) {
      throw new Error("Updates are not allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("Skills more than 10 are not allowed");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("Updated user successfully");
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Established...");
    app.listen(3000, () => {
      console.log("Server is running on port-3000...");
    });
  })
  .catch((err) => {
    console.log("Databse cannot be Connected!!");
  });
