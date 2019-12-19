import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

test('renders blog title, author and likes', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    likes: 1,
  };

  const component = render(<SimpleBlog blog={blog} />);

  expect(component.container).toHaveTextContent('Blog title');
  expect(component.container).toHaveTextContent('Blog author');
  expect(component.container).toHaveTextContent('blog has 1 likes');
});

test('clicking the like button twice fires event handler twice', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    likes: 1,
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );

  const button = getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
