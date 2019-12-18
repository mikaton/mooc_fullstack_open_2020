const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).send({ error: "Title or URL missing" });
  }

  try {
    const decodedToken = jwt.decode(request.token, process.env.SECRET);

    if (!decodedToken) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const decodedToken = jwt.decode(request.token, process.env.SECRET);
    if (!decodedToken) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = await Blog.findById(id);

    console.log(blog.id);

    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response
        .status(401)
        .json({ error: "You don't have permission to delete this blog" });
    }

    await Blog.deleteOne({ _id: id });
    response.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
});

blogsRouter.patch("/:id", async (request, response, next) => {
  const body = request.body;
  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, body);
    response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = blogsRouter;
