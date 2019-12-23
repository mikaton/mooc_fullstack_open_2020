import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

beforeEach(cleanup);

describe('<App />', () => {
  test('only renders login screen if no user is logged in', async () => {
    localStorage.setItem('user', null);
    let component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('login'));

    expect(component.container).not.toHaveTextContent('logout');
    expect(component.container).not.toHaveTextContent('Dan Abramov');
  });
  test('renders blogs when user is logged in', async () => {
    const user = {
      username: 'testi',
      token: 'abcdefhijklmnopqrstuvwxyzåäö',
      name: 'Testi Testaaja',
    };

    localStorage.setItem('user', JSON.stringify(user));

    let component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('new blog'));

    expect(component.container).toHaveTextContent('create new');
    expect(component.container).toHaveTextContent('blogs');
  });
});
