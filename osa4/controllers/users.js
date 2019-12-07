const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response, next) => {
  const users = await User.find({}).populate("blogs", {
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users.map(user => user.toJSON()));
});

usersRouter.post("/", async (request, response, next) => {
  if (!request.body.password) {
    return response.status(400).json({ error: "Password is required" });
  }
  if (request.body.password.length < 3) {
    return response
      .status(400)
      .json({ error: "Password must be at least 3 characters" });
  }

  try {
    const body = request.body;
    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

module.exports = usersRouter;
