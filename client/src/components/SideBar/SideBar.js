
import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './style.scss';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/user">
        User
      </a>

      <a className="menu-item" href="/sex">
        Sex
      </a>

      <a className="menu-item" href="/weight">
        Weight
      </a>

      <a className="menu-item" href="/height">
        Height
      </a>

      <a className="menu-item" href="/age">
        Age
      </a>

      <a className="menu-item" href="/goals">
        Goals
      </a>
    </Menu>
  );
};
