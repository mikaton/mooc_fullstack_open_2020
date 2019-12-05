const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).send({ error: "Title or URL missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    response.status(200).json({ message: "Blog deleted successfully" });
  } catch {
    return response.status(404).json({ error: "Blog not found" });
  }
});

blogsRouter.patch("/:id", async (request, response, next) => {
  const body = request.body;

  try {
    await Blog.findByIdAndUpdate(request.params.id, body);
    response.status(200).json({ message: "blog updated successfully" });
  } catch {
    return response.status(404).json({ error: "Blog not found" });
  }
});

module.exports = blogsRouter;
