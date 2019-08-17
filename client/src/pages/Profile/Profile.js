import React, {Component} from "react";
import "./Profile.scss";
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import MealPlan from "../../components/MealPlan/MealPlan";
import axios from "axios";
import Calendar from "../../components/Calender";





class Profile extends Component {
   
    // calendarComponentRef = React.createRef()
    
state = {

        loggedIn: false,                   
        user: null,
        loading: true,
        height: null,
        weight: null,
        sex: null,
        age: null,
        goals: null, 
        plans: null,
        image: "bitches",
    }

   setImage = () => {
        let image = this.state.image; 
        console.log(image)
        return image  
    }
   
componentDidMount() {
        
        this.getMeal("week", "2000", "vegetarian", "dairy");
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
                
                    this.getProfileImage(this.state.user._id);
                    console.log(this.state.user._id)
                });
            }
        }).catch(err => {
            console.log(err);
        });
    
       
        console.log(this.props)
    }

getProfileImage(user){
    console.log(user);
        axios.get('/api/image/getImage/' + user)
            .then(data => {
                console.log(data.data.imageData)
                let str = data.data.imageData;
                let res = str.substring(26);
                console.log(res);
                let image = "../../assets/uploads/" + res;
                console.log(image);
                this.setState({
                    image: image
                }, ()=>{
                    console.log(typeof this.state.image);
                })
            })
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

getMeal = (timeFrame, targetCalories, diet, exclude) => {

    axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate',
    {"headers": 
    { "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
       "x-rapidapi-key": "fcb3b27bb6mshc7a98d29060e823p1674e7jsn37cc5c313307"}},
  
       {query: {"timeFrame": timeFrame,
       "targetCalories": targetCalories,
       "diet": diet,
       "exclude": exclude},})
            .then((response)=>{
               
                let allPlans = response.data.items;
                this.setState({
                    plans: allPlans
                });
             }).then( () => 
                    this.state.loggedIn?
                     API.addMealPlan({
                     user: this.state.user._id,
                     MealPlan: this.state.plans
                                    })
                     :
                     () => {
                         console.log("failed");
                            }
                    )
      }
    

    render() {
        return (
            <div className="profilePage">
                
                <Container>
                {this.state.loggedIn ? (    
                               //  puts the name in the header 
                        <div className="profileBox">    {/* header */}
                        <img id="profile" src= {this.state.image} alt={this.state.image}/> 
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
                        <MealPlan plans = {this.state.plans}/>
                        <Calendar/>

                    </div>

                  
                  /* 
                    IF THE USER IS NOT LOGGED IN EXECUTE BELOW CODE
                     */

                ) 
                : (
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