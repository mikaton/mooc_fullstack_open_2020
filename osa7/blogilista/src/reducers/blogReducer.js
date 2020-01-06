import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS':
      return action.data;
    case 'ADD_BLOG':
      const newBlog = { ...action.data };
      return state.concat(newBlog);
    case 'COMMENT_BLOG':
      const commentedBlog = { ...action.data };
      return state.map(blog => (blog.id !== action.data.id ? blog : commentedBlog));
    case 'UPDATE_BLOG':
      const likedBlog = { ...action.data };
      return state.map(blog => (blog.id !== action.data.id ? blog : likedBlog));
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data.id);
    default:
      return state;
  }
};
export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs,
    });
  };
};
export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    });
  };
};

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    try {
      const commentedBlog = await blogService.comment(blog.id, comment);
      dispatch({
        type: 'COMMENT_BLOG',
        data: commentedBlog,
      });
    } catch (exception) {
      console.error(exception.message);
    }
  };
};

export const updateBlog = (blog, updateData) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, updateData);
    dispatch({
      type: 'UPDATE_BLOG',
      data: {
        ...updatedBlog,
        user: blog.user,
        likes: updatedBlog.likes + 1,
      },
    });
  };
};
export const deleteBlog = id => {
  return async dispatch => {
    const deletedBlog = await blogService.remove(id);
    dispatch({
      type: 'DELETE_BLOG',
      data: deletedBlog,
    });
  };
};

export default blogReducer;
