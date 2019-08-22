import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import API from "../../utils/API";
import "./style.css";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import UploadPhoto from "../../components/UploadPhoto";
import DinnerBanner from "../../components/DinnerBanner";
import Footer from "../../components/Footer";
// import { ParallaxBanner } from "react-scroll-parallax";
import MiddleBanner from "../../components/MiddleBanner";
import CardTwo from "../../components/CardTwo";


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
      <Banner />
      <Container>
      <Card />
      <MiddleBanner />
      <CardTwo />
      </Container>
      <DinnerBanner />
      </div>
    );
  }
}

export default Home;