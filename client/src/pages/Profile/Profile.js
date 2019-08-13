import React, {Component} from "react";
import "./Profile.scss";
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import MealPlan from "../../components/MealPlan/MealPlan";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";



                                 // needed for dayClick


// must manually import the stylesheets for each plugin
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";



class Profile extends Component {   
            //Lets comment this code!
    calendarComponentRef = React.createRef()
    state = {
             /* makes a stateful component for the profile 
             page to check to see if the person is logged in 
             defaults the user to being null s
             loading? */                                
        loggedIn: false,                   
        user: null,
        loading: true,
        height: null,
        weight: null,
        sex: null,
        age: null,
        goals: null, 
        plan: null

    }

 

    
    componentDidMount() {
        this.getMeal();
        /* when the component mounts run this code
         */
        /* change ths stateuful component to false */
        this.loading();
        /*  */
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user,
                    sex: user.data.sex,
                    weight: user.data.weight,
                    height: user.data.height,
                    age: user.data.age,
                    goals: user.data.goals
                }, ()=>{
                    console.log(this.state.user.goals)
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

    getMeal = () => {
        API.PlanMeal();
}   /*  getMeal = () => {
        API.PlanMeal().then(newPlan =>{
        this.setState({
            plan: newPlan
         }, ()=> {
             console.log(this.state.plan);
         })
     }).catch(err => {
         console.log(err);
     })
    } */

    render() {
        return (
            <div className="profilePage">
                <Container>
                {this.state.loggedIn ? (            //  puts the name in the header 
                    <div className="profileBox">    {/* header */}
                   

                        <h1 id="userTitle">Welcome {this.state.user.username}</h1>

                        {
                         this.state.user.goals === 1 ?
                         
                            (<h2 name = "goals header">We hope we can leverage your schedule and diet to help you lose weight</h2>)

                        :this.state.user.goals === 2?
                            (<h2 name = "goals header">Lets try to get a great workout schedule for you to maintain fitness!</h2>)

                        :this.state.user.goals === 3? 
                            (<h2 name = "goals header">Lets help you lift some iron and git pumped!</h2>) 

                        : 
                        <h2>Please fill out your fitness goals in the update profile section</h2> 
                    }
                        
                        <p id= "height">Height: {this.state.user.height}</p>
                        <p id= "weight">weight: {this.state.user.weight}</p>
                        <p id= "sex">sex: {this.state.user.sex}</p>
                        <p id= "age">age: {this.state.user.age}</p>
                        {/* <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} /> */}
                        <Link className = "UserInfoLink" to ="/UserInfo"><Button className = "updateAccount" color = "info" block> Update Profile</Button></Link>
                        <MealPlan
                         timeFrame = "day"
                         targetCalories= "2000"
                        diet= "vegetarian"
                         exclude= "shellfish, olives"
                        />
                    </div>

                  
                  /* 
                    IF THE USER IS NOT LOGGED IN EXECUTE BELOW CODE
                     */

                ) : (
                    <div className="noUser">
                        {!this.state.loading ? ( /* checks to see if this page is loading  */
                            <>
                                <h1>please log in</h1> {/*if the user hasn't logged in show them the option to  */}
                                <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block>Login</Button></Link>
                            </>
                        ) : (/* also add a loading icon  */
                            <img id="loadingIcon" src="./assets/images/loading.gif" alt="loading"/>
                        )}
                    </div> 
                )}
                </Container>
            </div>
        )
    }
}


export default Profile;