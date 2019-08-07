import React, {Component} from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Container } from 'reactstrap';
import API from "../../utils/API";
import { Link } from "react-router-dom"


class UserInfo extends Component {
    state={
        loggedIn: false,                   
        user: null,
        loading: true
    };
    componentDidMount() {
        /* when the component mounts run this code
         */
        /* change ths stateuful component to false */
        this.loading();
        /*  */
        API.isLoggedIn().then(user => {
            console.log(user.data.loggedIn);
            if (user.data.loggedIn) {
                console.log(user.data.user)
                this.setState({
                    loggedIn: true,
                    user: user.data.user
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

    render(){
        return(
        <div>
         {this.state.loggedIn? (<>
            <h2 className = "welcomeMessage"> welcome {this.state.user.username}</h2>
        <h2 className="loginTitle title-font">Please tell us some more about you so that we can better understand your workout needs</h2>
        
        <Container>
        <Form>
            <FormGroup>
                <Label for="GoalsOptions">Goals</Label>
                {/* <Input type="text" name="username" id="username" placeholder="username" value={this.props.username} onChange={this.props.handleInputChange} valid={this.state.validUsername} /> */}
                <Button >Gain Muscle</Button>
                <Button >Maintain Strength </Button>
                <Button> Loose Weight</Button>
            </FormGroup>
            <FormGroup>
                {/* <Label for="confirmPassword">Confirm Password</Label>
                <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" value={this.props.confirmPassword} onChange={this.props.handleInputChange} valid={this.state.confirmPassword} />
                <FormText>at least 8 characters, 1 capital & 1 number</FormText> */}
            </FormGroup>
            {/* if all fields are valid, allow the user to submit the form */}
         
            
        </Form>
        </Container>
        </>)
        : (<>
         <>
         <h1>please log in</h1> {/*if the user hasn't logged in show them the option to  */}
        <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block>Login</Button></Link>
                            </>
        ) 
      
        </>)}

       {/* Not quiet sure how to use this yet */}
      {/*   {this.props.message?(
            <Alert className="animated fadeIn" color="danger">{this.props.message}</Alert>
        ): (<></>)} */}
        
        
    </div>)
    }

}

export default UserInfo;