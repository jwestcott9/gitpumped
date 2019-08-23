import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './style.scss';


// // import { isPropsEqual } from '@fullcalendar/core';


//                 {/* all of this is the sidebar. working on getting it functioning. */}
//                 {/* var isMenuOpen = function(state) {
//   return state.isOpen;
// };

// <Menu onStateChange={ isMenuOpen } /> */}

// class SideBar extends Component {
//   showSettings (event) {
//     event.preventDefault();
//       state = {
//       isOpen: false
//     }


//   };


//   componentDidMount() {
//     this.loading();
//     API.isLoggedIn().onClick(SideBar => {
//       if (user.data.loggedIn) {
//         this.setState({
//             isOpen: true
//         },
        
//       }
    
     
      //  function SideBar (props) {
      //  return (
      //    <Menu width={ 260 } >
      //      <a id="" className="menu-item" href="">{props}</a>
           
      //    </Menu>
      //   )
       
      //  };

      class SideBar extends React.Component {
        showSettings (event) {
          event.preventDefault();

        }
      


      render (props) {
        return(
      <Menu>
        <a id="image" className="menu-item" >{this.props.image}</a>
        <a id="user" className="menu-item" >User: {this.props.user}</a>
        <a id="sex" className="menu-item">Sex: {this.props.sex}</a>
        <a id="height" className="menu-item" >Height: {this.props.height}</a>
        <a id="weight" className="menu-item" >Weight: {this.props.weight}</a>
        <a id="age" className="menu-item"   >Age: {this.props.age}</a>
        <a id="goals" className="menu-item" >Goals: {this.props.goals}</a>
        <a onClick={ this.showSettings } className="menu-item--small" href=""></a>
      </Menu>
        );
      }
    }

export default SideBar;



