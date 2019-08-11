import React, {Component} from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Container } from 'reactstrap';
import API from "../../utils/API";
import { Link } from "react-router-dom"



function UserInfo (props){
    console.log(props);
        return(
           
<>
{props.loggedIn ? (<>
            <h2 className = "welcomeMessage"> welcome {props.username} </h2>
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
                <Label for="Height">Height</Label>
               <Input type="height" name="height" id="height" placeholder="height" value= {props.height} onChange={props.handleInputChange}/>

                 <Label for="Weight">Weight</Label>
               <Input type="weight" name="weight" id="weight" placeholder="weight" value= {props.weight} onChange={props.handleInputChange}/>

               <Label for="sex">sex</Label>
               <Input type="sex" name="sex" id="sex" placeholder="sex" value= {props.sex} onChange={props.handleInputChange}/>

               <Label for="age">age</Label>
               <Input type="age" name="age" id="age" placeholder="age" value= {props.age} onChange={props.handleInputChange}/>
                <Button  name = "UserInfoSubmit" id="userInfoSubmit" onClick = {props.handleFormSubmit}> Submit </Button>
                {/* <Label for="confirmPassword">Confirm Password</Label>
                <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" value={this.props.confirmPassword} onChange={this.props.handleInputChange} valid={this.state.confirmPassword} />
                <FormText>at least 8 characters, 1 capital & 1 number</FormText> */}
            </FormGroup>
            {/* if all fields are valid, allow the user to submit the form */}
         
            
        </Form>
        </Container>
        </>)
: (<>
<div>You are not logged in</div>
<Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block>Login</Button></Link>
</>)
}
        </>
    //     <div>
           
    //      {props.state.loggedIn?
    //          ()
    //     : (<>
    //      <>
    //      <h1>please log in</h1> {/*if the user hasn't logged in show them the option to  */}
    //     <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block>Login</Button></Link>
    //                         </>
    //     ) 
      
    //     </>)}

    //    {/* Not quiet sure how to use this yet */}
    //   {/*   {this.props.message?(
    //         <Alert className="animated fadeIn" color="danger">{this.props.message}</Alert>
    //     ): (<></>)} */}
        
        
    // </div>
    
    )}


export default UserInfo;