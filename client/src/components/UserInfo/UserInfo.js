/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Container } from 'reactstrap';
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Allergies from "../Allergies";
import UploadPhoto from "../UploadPhoto"
import DatePicker from "react-datepicker";
import MealPlan from "../MealPlan";
import './style.css';

import "react-datepicker/dist/react-datepicker.css";



class UserInfo extends React.Component{
  constructor(props){
    super(props);
    this.child = React.createRef();
    this.state={
      startDate: new Date()
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date){
    console.log(date);
      this.setState({
        startDate: date
      });
      this.props.handleChange(date);
  }
  
render(){
        return(
           
<>
{this.props.loggedIn ? (<>
            
        
        <Container className="background">
        <h2 className = "welcomeMessage"> Hello, {this.props.username} ! </h2>
             <h4 className="loginTitle title-font">Please help us get a better understanding of you and your intention</h4>
        <Form>
            <FormGroup>
                <legend className="bulletTitle">Fitness Goals:</legend>
            <div className="bullet-host">
            <Label className="lose bulletFont" loseweight>

            <Input type="radio" value = "1" onChange={this.props.handleInputChange} name="goals" />{' '}
              Lose Weight
            </Label>
            </div>
            </FormGroup>
            <FormGroup>
            <div className="bullet-host">
            <Label className="bulletFont" check>

            <Input type="radio" value = "3" onChange={this.props.handleInputChange} name="goals" />{' '}
              Maintain Weight but Improve Health
            </Label>
            </div>
            </FormGroup>

            <FormGroup>
            <div className="bullet-host bullet-pad">
            <Label className="bulletFont" check>

            <Input type="radio" value = "2" onChange={this.props.handleInputChange} name="goals" />{' '}
            Gain Muscle
                </Label>
                </div>
            </FormGroup>
            
            <FormGroup>
            <div className="stats-host">
                <Label className="bulletFont" for="Height">Height</Label>
               <Input type="height" name="height" id="height" placeholder="height" value= {this.props.height} onChange={this.props.handleInputChange}/>

                 <Label className="bulletFont" for="Weight">Weight</Label>
               <Input type="weight" name="weight" id="weight" placeholder="weight" value= {this.props.weight} onChange={this.props.handleInputChange}/>

               <Label className="bulletFont" for="sex">Sex</Label>
               <div className="sexBulletHost">
               <FormGroup>
                <Label className="sexButton">
                  <Input type="radio" name="sex" id="sex" placeholder="sex" value="male" onChange={this.props.handleInputChange}/>{' '}
                    Male
                </Label>
               </FormGroup>
               <FormGroup>
                <Label className="sexButton">
                  <Input type="radio" name="sex" id="sex" placeholder="sex" value="female" onChange={this.props.handleInputChange}/>{' '}
                    Female
                </Label>
               </FormGroup>
               </div>
               {/* <Input type="sex" name="sex" id="sex" placeholder="sex" value= {this.props.sex} onChange={this.props.handleInputChange}/> */}
               <Label className="bulletFont" for="age">
                 Age
               </Label>
               <Input type="age" name="age" id="age" placeholder="age" value= {this.props.age} onChange={this.props.handleInputChange}/>
               </div>
              <Label className="bulletFont startDate">Desired Start Date</Label>
               <DatePicker
            onChange={this.handleChange}
            onSelect = {this.props.handleSelect}
            selected={this.state.startDate}
          />
          
               <UploadPhoto
                buttonLabel = "upload profile photo"
                user = {this.props.user}/>
                <Button  name = "UserInfoSubmit" id="userInfoSubmit" onClick = {this.props.handleFormSubmit}> Submit </Button>
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
  }


export default UserInfo;