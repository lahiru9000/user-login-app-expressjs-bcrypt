// const mysql = require("mysql2");
import mysql from "mysql2";

const connection = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "login_app",
  })
  .promise();

export const allUsers = async function () {
  const users = await connection.query("SELECT * FROM users");
  console.log(users[0]);
  return users[0];
};

export const createUser = async function (username, hashedPassword) {
  const result = await connection.query(
    "INSERT INTO users (username, hashed_password) VALUES (?,?)",
    [username, hashedPassword]
  );
  console.log(result);
  return result;
};

export const fetchUserByUsername = async function (username) {
  const user = await connection.query("SELECT * FROM users WHERE username=?", [
    username,
  ]);
  console.log(user[0][0]);
  return user[0][0];
};

// fetchUserByUsername("lahiru");
