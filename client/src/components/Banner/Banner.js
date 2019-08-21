import React from "react";
import "./style.css";
// import {Jumbotron, Container } from "reactstrap";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";

function Banner (props){
    return(
    <ParallaxProvider>
        <ParallaxBanner 
            className="banner"
            layers={[
                {
                    image: "https://www.running4women.com/wp-content/uploads/2018/01/87a80d193b533ca403d46dd1500a7bb8.jpg",
                    amount: 0.5,
                },
                // {
                //     image: "http://blog.mycuistot.com/wp-content/uploads/2018/11/shutterstock_521741356-2.jpg",
                //     amount: 0.5,
                // },
                // {
                //     image: "http://sites.psu.edu/siowfa15/wp-content/uploads/sites/29639/2015/09/bigstock-Young-lady-running-on-a-rural-44916691.jpg",
                //     amount: 0.5,
                // }
            ]}
            style={{
                height:"400px",
            }}
        >
            <h1>Welcome to GitPumped</h1>
            </ParallaxBanner>

            </ParallaxProvider>
        // <Jumbotron className = "title">Welcome to GitPumped,
        // <h3>Where we use cutting edge technology to help you meet your fitness goals</h3>
        //  </Jumbotron>

    )
}
export default Banner;