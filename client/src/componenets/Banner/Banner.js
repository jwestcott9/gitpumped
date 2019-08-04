import React from "react"
import './Banner.css';

function Banner(props){
    return (
        <div className = "bannerBox">
            <p> {props.username}</p>
            </div>
    )
}

export default Banner;