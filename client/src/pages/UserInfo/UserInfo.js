import React, {Component} from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import API from "../../utils/API"


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
            if (user.data.loggedIn) {
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

    redner(){
        return(
        <div>
        <h2 className="loginTitle title-font">Signup</h2>
        <hr />
        {this.props.message?(
            <Alert className="animated fadeIn" color="danger">{this.props.message}</Alert>
        ): (<></>)}
        <Form>
            <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="username" value={this.props.username} onChange={this.props.handleInputChange} valid={this.state.validUsername} />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="password" value={this.props.password} onChange={this.props.handleInputChange} valid={this.state.validPassword} />
            </FormGroup>
            <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" value={this.props.confirmPassword} onChange={this.props.handleInputChange} valid={this.state.confirmPassword} />
                <FormText>at least 8 characters, 1 capital & 1 number</FormText>
            </FormGroup>
            {/* if all fields are valid, allow the user to submit the form */}
            {(this.state.validUsername && this.state.validPassword && this.state.confirmPassword) ? (
                <Button onClick={this.props.handleSignup} color="success" block>Signup</Button>
            ) : (
                <Button onClick={this.props.handleSignup} color="danger" block disabled>Signup</Button>
            )}
            
        </Form>
    </div>)
    }

}

export default UserInfo;