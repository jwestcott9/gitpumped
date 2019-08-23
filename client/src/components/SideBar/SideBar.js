import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './style.scss';
// import { isPropsEqual } from '@fullcalendar/core';
import Profile from "../../pages/Profile";



class SideBar extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }


render () {
  return (
    <div className="sideBar">
    <Menu>
      <a id="user" className="menu-item" href="/user">User: {this.state.user}</a>
      <a id="sex" className="menu-item" href="/sex">Sex: {this.state.user.sex}</a>
      <a id="height" className="menu-item" href="/height">Height: {this.state.user.height}</a>
      <a id="weight" className="menu-item" href="/weight">Weight: {this.state.user.weight}</a>
      <a id="age" className="menu-item" href="/age">Age: {this.state.user.age}</a>
      <a id="goals" className="menu-item" href="/goals">Goals: {this.state.user.goals}</a>
      <a onClick={ this.showSettings } className="menu-item--small" href=""></a>
      <Menu width={ 260 } />
    </Menu>
    </div>
  );
  }
};
export default SideBar;



