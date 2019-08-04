import React, { Component } from 'react';
import { Button } from 'reactstrap';
import API from "../../utils/API";
import Banner from "../../components/Banner";
import "./style.css"

class Home extends Component {

    state = {
        loggedIn: false, 
        
    };

    componentDidmout(){
        this.loggedIn();
    }


loggedIn = () =>{
    API.isLoggedIn().then(user => {
        if(user.data.loggedIn){
            this.setSTate({
                loggedIn: true
            });
        }
    }).catch(err => {
        console.log(err);
    })
}

render(){
    return(
        <div className = "homeBox">
            <Banner username = "Jeff"></Banner>
        </div>
    )
}
}

export default Home;