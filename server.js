const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("it is works!");
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt, saltRounds);
});
app.post("/signIn", (req, res) => signin.handleSignIn(req, res, db, bcrypt));
app.get("/profile/:id", (req, res) => profile.handlePorfileGet(req, res, db));
app.put("/image", (req, res) => image.handleImage(req, res, db));
app.post("/imageUrl", (req, res) => image.handleApiCall(req, res));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
