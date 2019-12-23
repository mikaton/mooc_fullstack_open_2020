import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Blog from './Blog';

afterEach(cleanup);

test('initially renders only title and author', () => {
  const user = {
    id: 'testiid',
    username: 'testaaja',
    name: 'Testi Testaaja',
  };
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    likes: 0,
    user: { ...user },
  };

  const { container, getByText } = render(<Blog blog={blog} user={user} />);

  expect(container).toHaveTextContent('Blog title Blog author');
  expect(container).not.toHaveTextContent('added by Testi Testaaja');
  expect(container).not.toHaveTextContent('0 likes');
});

test('clicking the initial component opens detailed view', () => {
  const user = {
    id: 'testiid',
    username: 'testaaja',
    name: 'Testi Testaaja',
  };
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    likes: 0,
    user: { ...user },
  };

  const { container, getByText } = render(<Blog blog={blog} user={user} />);

  const div = container.querySelector('.blog');

  fireEvent.click(div);
  expect(getByText('added by Testi Testaaja')).toBeInTheDocument();
  expect(getByText('0 likes')).toBeInTheDocument();
});
