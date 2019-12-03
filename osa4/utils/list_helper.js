const _ = require("lodash");

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
    likes: favorite.likes,
  };
};

const mostBlogs = blogs => {
  // Lasketaan kirjoittajien blogien määrä ja sijoitetaan ne taulukkoon
  const blogCount = _.map(_.countBy(blogs, "author"), (value, key) => ({
    author: key,
    blogs: value,
  }));
  // Järjestetään blogien määrän mukaan laskevaan järjestykseen
  blogCount.sort((a, b) => b.blogs - a.blogs);
  // Taulukon ensimmäisessä alkiossa on eniten blogeja kirjoittanut kirjoittaja, joten palautetaan se
  return blogCount[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
