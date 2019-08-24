import React from "react";
import "./style.css";
import {Jumbotron } from "reactstrap";


function Banner (props){
    return(
        <Jumbotron className = "title"><strong>GitPumped</strong>
        <h3>Technology is Your Trainer</h3>
         </Jumbotron>
    )
}
export default Banner;