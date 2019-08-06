import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import API from "../../utils/API";
import "./style.css";
import Banner from "../../components/Banner";
import Card from "../../components/Card";

class Home extends Component {

  state = {
    loggedIn: false,
    joke: ""
  };

  componentDidMount() {
    this.getJoke();
    this.loggedIn();
  }

  getJoke = () => {
    API.ChuckNorris().then(joke => {
      let newJoke = joke.data.value.joke.replace(/&quot;/g, '"');
      this.setState({
        joke: newJoke
      })
    }).catch(err => {
      console.log(err)
    });
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
          <Card/>
        
      </Container>
      </div>
    );
  }
}

export default Home;