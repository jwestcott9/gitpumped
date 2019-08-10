import React, { Component } from "react";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import UserInfo from "../../components/UserInfo";
import API from "../../utils/API";
import "./Auth.scss";

class Auth extends Component {

  state = {
    loggedIn: false,
    username: "",
    password: "",
    confirmPassword: "",
    user: null,
    message: "",
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleUserInfo = event=>{
    event.preventDefault();
    
    /* handle the Api call that will add the user data to the User database */
  }

  handleLogin = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.login({
        username: this.state.username,
        password: this.state.password
      }).then(user => {
        console.log(user);
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user.data.user
          });
          console.log("log in successful");
          window.location.href = '/profile';
        }
        else if (user.data.message) {
          this.setState({
            message: user.data.message
          })
        }
      });
    }
  }

  handleSignup = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.signup({
        username: this.state.username,
        password: this.state.password
      }).then(user => {
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user.data.user
          });
          console.log("log in successful");
          window.location.href = '/UserInfo';
        } else {
          console.log("something went wrong :(")
          console.log(user.data);
          this.setState({
            message: user.data
          })
        }
      });
    }
  }
  handleInfoSubmit = event => {
    event.preventDefault();
    if(this.state.bodyType && this.state.goals){
      
    }
  }

  render() {
    return (
      <div className="authBox">
        {(this.props.action === "login") ? (
          <Login
            username={this.state.username}
            password={this.state.password}
            handleLogin={this.handleLogin}
            handleInputChange={this.handleInputChange}
            message={this.state.message}
          />
        ) : (this.props.action === "signup") ? (
            <Signup
              username={this.state.username}
              password={this.state.password}
              confirmPassword={this.state.confirmPassword}
              handleSignup={this.handleSignup}
              handleInputChange={this.handleInputChange}
              message={this.state.message}
            />
          ): <UserInfo
              username={this.state.username}
              handleUserInfo = {this.handleUserInfo}
              sex = {this.state.sex}
              height = {this.state.height}
              weight = {this.state.weight}
              user = {this.state.user}
              age = {this.state.age}

          />
          }
      </div>
    )
  }
}



export default Auth;