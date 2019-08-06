import React from "react";
import "./style.css";
import {Jumbotron, Container } from "reactstrap";
function Banner (props){
    return(
        <>
        <Jumbotron className = "title">Welcome to GitPumped,
        <h3>Where we use cutting edge technology to help you meet your fitness goals</h3>
         </Jumbotron>
        
        </>
    )
}
export default Banner