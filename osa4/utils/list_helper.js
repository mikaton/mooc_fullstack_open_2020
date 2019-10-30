const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0;
  } else {
    return blogs
      .map(blog => (blog = blog.likes))
      .reduce((total, likes) => (total += likes), 0);
  }
};

const favoriteBlog = blogs => {
  const favorite = blogs.reduce((previous, current) => {
    return previous.likes > current.likes ? previous : current;
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
