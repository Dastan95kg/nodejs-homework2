import express from "express";
const router = express.Router();

let users = [
  {
    id: "1",
    login: "Dastan",
    password: "test_password1",
    age: 20,
    isDeleted: false,
  },
  {
    id: "2",
    login: "Ruslan",
    password: "test_password2",
    age: 25,
    isDeleted: false,
  },
  {
    id: "3",
    login: "Marat",
    password: "test_password3",
    age: 44,
    isDeleted: false,
  },
  {
    id: "4",
    login: "Aktan",
    password: "test_password4",
    age: 18,
    isDeleted: false,
  },
  {
    id: "5",
    login: "Venera",
    password: "test_password5",
    age: 23,
    isDeleted: false,
  },
];

// READ
router.get("/", (req, res) => {
  const { loginSubstring = "", limit = 10 } = req.query;

  const autoSuggestedUsers = users
    .filter((user) => user.login.includes(loginSubstring))
    .sort((a, b) => (a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1));

  res.status(200).json(autoSuggestedUsers);
});

router.get("/:id", (req, res) => {
  const foundUser = users.find((user) => user.id === req.params.id);

  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.sendStatus(404);
  }
});

// CREATE
router.post("/", (req, res) => {
  const { login, password, age } = req.body;

  if (!login || !password || !age) {
    throw new Error("No enough user data");
  }

  const userIds = users.map((user) => user.id);
  const newId = Math.max.apply(Math, userIds) + 1;

  const newUser = {
    id: newId,
    isDeleted: false,
    login,
    password,
    age,
  };

  users.push(newUser);

  res.status(200).json(newUser);
});

// UPDATE
router.put("/:id", (req, res) => {
  const { login, password, age } = req.body;

  if (!login || !password || !age) {
    throw new Error("No enough user data");
  }

  const foundUser = users.find((user) => user.id === req.params.id);

  if (foundUser) {
    const updated = {
      ...foundUser,
      login,
      password,
      age,
    };

    const foundUserIndex = users.indexOf(foundUser);

    users.splice(foundUserIndex, 1, updated);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  const foundUser = users.find((user) => user.id === req.params.id);

  if (!foundUser || foundUser.isDeleted) {
    res.sendStatus(404);
  } else {
    foundUser.isDeleted = true;

    res.sendStatus(204);
  }
});

export default router;
