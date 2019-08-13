import React, { Component } from "react";
import UserInfo from "../../components/UserInfo";
import API from "../../utils/API";
import "./style.css";
import { Link } from "react-router-dom";

class UpdatePage extends Component {
    state={
    loggedIn: false,
    username: null,
    sex: "",
    weight: "",
    height: "",
    user: null,
    age: "",
    goals: "",
    }

    componentDidMount() {
      /* when the component mounts run this code
       */
      /* change ths stateuful component to false */
    
      /*  */
      API.isLoggedIn().then(user => {
          if (user.data.loggedIn) {
            console.log(user.data.user)
              this.setState({
                  loggedIn: true,
                  user: user.data.user._id,
                  username: user.data.user.username,
              });
          }
      }).catch(err => {
          console.log(err);
      });

      console.log(this.props)
  }

  
  loading() {
    /* after 1 second loading is set to false 
    adds an automated buffer so that it will 
    attempt to not show client loading?
     */
    setTimeout(()=> {
        this.setState({
            loading: false
        })
    }, 1000)  
}


    handleInputChange = event => {
      console.log("I was hit here is what I am seeing" +event.target.value)
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
          [name]: value
        }, ()=>
        console.log(this.state));
      };

      getWorkouts = event=>{
        event.preventDefault();

        let monday = {};
        let tuesday = {};
        let wednesday = {};
        let thursday = {};
        let friday = {};
        let saturday = {};
        let sunday = {};


        /* push the weekly workout data to the Database */
       
        /* handle the Api call that will add the user data to the User database */
      }
handleFormSubmit = (event) => {
  event.preventDefault();
      console.log("handleFormSubmit")
      console.log(this.state);
      API.updateProfile({
        user: this.state.user,
        sex: this.state.sex,
        weight: this.state.weight,
        height: this.state.height,
        age: this.state.age
    }).then (()=> {
      window.location.href="/profile"
    }
)}
      

      render(){
        
        return(
          
            <UserInfo
            username = {this.state.username}
            loggedIn = {this.state.loggedIn}
            sex ={this.state.sex}
            height = {this.state.height}
            weight = {this.state.weight}
            user = {this.state.user}
            age = {this.state.age}
            goals = {this.state.goals}
            handleInputChange = {this.handleInputChange}
            handleFormSubmit = {this.handleFormSubmit}
            />
        )
        }

      

}


export default UpdatePage