import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import API from "../../utils/API";
import "./style.css";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import UploadPhoto from "../../components/UploadPhoto";


class Home extends Component {

  state = {
    loggedIn: false,
    joke: ""
  };

  componentDidMount() {
    this.loggedIn();
  }

 

  loggedIn = () => {
    API.isLoggedIn().then(user => {
      if (user.data.loggedIn) {
        this.setState({
          loggedIn: true
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className = "Home">
      <Container>
        <Banner/>
          <Card
          title= "this is a title"
          subtitle= "This is a subtitle"
          content = "this is some content"
          />

        <Card
          title= "this is a title"
          subtitle= "This is a subtitle"
          content = "this is some content"
          />
           <Card
          title= "this is a title"
          subtitle= "This is a subtitle"
          content = "this is some content"
          />
          <UploadPhoto/>

      
      </Container>
      </div>
    );
  }
}

export default Home;