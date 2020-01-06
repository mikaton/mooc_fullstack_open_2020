import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../reducers/messageReducer';
import { addBlog } from '../reducers/blogReducer';
import Button from '../styled-components/Button';

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
      props.addBlog(newBlog);
      props.setMessage(`Added new blog ${newBlog.title} by ${newBlog.author}`, 5);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      props.setMessage(exception.message, 5);
    }
  };

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' };
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={() => setBlogFormVisible(true)}>new blog</Button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={handleAddBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>

          <Button primary type="submit">
            create
          </Button>
        </form>
        <Button onClick={() => setBlogFormVisible(false)}>cancel</Button>
      </div>
    </div>
  );
}

export default connect(null, { setMessage, addBlog })(AddBlogForm);
