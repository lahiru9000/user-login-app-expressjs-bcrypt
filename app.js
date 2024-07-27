import express from "express";
import bcrypt from "bcrypt";
import { allUsers, createUser, fetchUserByUsername } from "./database.js";

const app = express();
app.use(express.json());
const port = 9000;

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(password);
    // const salt = await bcrypt.genSalt();
    // console.log(salt);
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    await createUser(username, hashedPassword);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await fetchUserByUsername(username);
  if (!user) {
    res.send("Username is invalid");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.hashed_password);
  if (!isPasswordMatch) {
    res.send("Password is invalid");
  }
  // send session ID
  // send jwt
  res.send("Login is succeeded");
});

app.get("/users", async (req, res) => {
  const users = await allUsers();
  res.send(users);
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
