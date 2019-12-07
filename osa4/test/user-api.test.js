const mongoose = require("mongoose");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const bcrypt = require("bcryptjs");

describe("when there is initially one user in the DB", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({
      username: "root",
      name: "Superuser",
      passwordHash: await bcrypt.hash("salaisuus", 10),
    });
    await user.save();
  });
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mton",
      name: "Mika Tonteri",
      password: "secret",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });
  test("creation fails with proper status and message if username is taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salaisuus",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
  test("creation fails with proper status code if password is less than 3 characters long", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "testi",
      name: "Testi Testinen",
      password: "12",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("at least 3 characters");
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});
test("creation fails with proper status code if no password is given", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "testi",
    name: "Testi Testinen",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toContain("Password is required");
  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd.length).toBe(usersAtStart.length);
});

afterAll(async () => {
  mongoose.connection.close();
});
