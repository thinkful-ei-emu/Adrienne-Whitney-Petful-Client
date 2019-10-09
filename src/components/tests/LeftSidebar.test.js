import React from 'react';
import ReactDOM from 'react-dom';
import LeftSidebar from '../LeftSidebar';

it('renders without crashing', () => {
  const usersQueue = []
  const div = document.createElement('div');
  ReactDOM.render(<LeftSidebar usersQueue={usersQueue}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});