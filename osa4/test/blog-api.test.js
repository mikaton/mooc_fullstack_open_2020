const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blog = new Blog(initialBlogs[0]);
  await blog.save();

  blog = new Blog(initialBlogs[1]);
  await blog.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 2 blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toEqual(initialBlogs.length);
});

test("_id field is properly transformed to id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0]._id).toBeUndefined();
  expect(response.body[0].id).toBeDefined();
});

test("posting a new blog works", async () => {
  const newBlog = {
    title: "Testiblogi",
    author: "Mika Tonteri",
    url: "https://www.feikkiblogi.fi/testiblogi.html",
    likes: 0,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(initialBlogs.length + 1);
});

test("Likes should be set to 0 if not set", async () => {
  const newBlog = {
    title: "Testiblogi 2",
    author: "Mika Tonteri",
    url: "https://www.feikkiblogi.fi/testiblogi2.html",
  };
  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.body.likes).toEqual(0);
});

afterAll(() => {
  mongoose.connection.close();
});
