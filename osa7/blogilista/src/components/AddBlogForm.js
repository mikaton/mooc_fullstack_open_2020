import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../reducers/messageReducer';
import blogService from '../services/blogs';

function AddBlogForm(props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  const handleAddBlog = async event => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      const result = await blogService.create(newBlog);

      props.setBlogs(props.blogs.concat(result));
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      props.setMessage('Title or URL missing', 5);
    }
  };

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' };
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={handleAddBlog}>
          <div>
            title:
            <input
              type='text'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type='text'
              value={url}
              name='URL'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>

          <button type='submit'>create</button>
        </form>
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
    </div>
  );
}

export default connect(null, { setMessage })(AddBlogForm);
