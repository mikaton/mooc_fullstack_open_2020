const blogs = [
  {
    title: 'Algebraic Effects for the Rest of Us',
    author: 'Dan Abramov',
    url: 'https://overreacted.io/algebraic-effects-for-the-rest-of-us/',
    likes: 2,
    user: {
      username: 'mton',
      name: 'Mika Tonteri',
      id: '5deb7282e3abe03370b1b8f6',
    },
    __v: 0,
    id: '5dfb29e0534a7e2f20eaf054',
  },
  {
    title: 'Name It, and They Will Come',
    author: 'Dan Abramov',
    url: 'https://overreacted.io/name-it-and-they-will-come/',
    likes: 3,
    user: {
      username: 'mton',
      name: 'Mika Tonteri',
      id: '5deb7282e3abe03370b1b8f6',
    },
    __v: 0,
    id: '5dfb2a07534a7e2f20eaf056',
  },
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll };
