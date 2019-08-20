/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import UserInfo from "../../components/UserInfo";
import API from "../../utils/API";
import "./style.css";
import { Link } from "react-router-dom";
import Lose from '../../data/cardio.json';
import Gain from '../../data/gain.json';
import Maintain from '../../data/essentials.json';

class UpdatePage extends Component {
    state={
    loggedIn: false,
    username: null,
    sex: "",
    weight: "",
    height: "",
    user: null,
    age: "",
    goals: "",
    bmi: "",
    workouts: []
    }

   

    componentDidMount() {
      /* when the component mounts run this code
       */
      /* change ths stateuful component to false */
    
      /*  */
      API.isLoggedIn().then(user => {
          if (user.data.loggedIn) {
              this.setState({
                  loggedIn: true,
                  user: user.data.user._id,
                  username: user.data.user.username,
              });
          }
      }).catch(err => {
          console.log(err);
      });
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

    // handleAllergies


    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
          [name]: value
        }, ()=>
        console.log("this.state"));
      };

handleFormSubmit = event => {
    event.preventDefault();
      API.updateProfile({
        user: this.state.user,
        sex: this.state.sex,
        weight: this.state.weight,
        height: this.state.height,
        age: this.state.age
    }).then (()=> {
      // window.location.href="/profile"
      this.checkGoals();
    }
)}

checkGoals = event =>  {
 
        // regex to transfer the height in inches for bmi formula. this takes apostrophes and quotations into consideration
        var regex_op =  /^(\d{1,2})[\']?((\d)|([0-1][0-2]))?[\"]?$/g.exec(this.state.height); 
        var feet = regex_op[1];
        var inches = regex_op[2]; 
        var height = (parseInt(feet) || 0) * 12 + (parseInt(inches) || 0);
        
        //calculate bmi formula
        let bmiHeight = height * height;
        let bmiDecimal = this.state.weight / bmiHeight;
        let userBMI = bmiDecimal * 703;
        //set bmi state
        this.setState({ bmi: userBMI });
  
        // this conditional calls the appropriate workout generation function depending on the user's choice
        if (this.state.goals === "1") {
          this.generateLose();
        } else if (this.state.goals === "2") {
          this.generateGain();
        } else {
          this.generateMaintain();
        }
}

// this function renders a workout for weight loss
generateLose = () => {
  console.log("lose");
  console.log(this.state.bmi);
  let monday = {};
  let tuesday = {};
  let wednesday = {};
  let thursday = {};
  let friday = {};
  let saturday = {};
  let sunday = {};
  //switch case checks user gender and conditionals check user bmi and choose workouts accordingly.
  switch (this.state.sex) {
    case "male":
      console.log("male");
      if(this.state.bmi < 18) {
        console.log("too skinny");
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            //===monday/thursday
            //row machine time[2]
            back: Lose[6],
            //squats (reps.medium)
            legs: Gain[3],
            //reverse crunch reps.high
            core: Gain[25]
          },
          tuesday = {
            //===tuesday/friday
            //dips chest version reps.high
            chest: Gain[42],
            //backwards lunges reps.high
            legs: Gain[2],
            //pulldown reps.high
            back: Gain[61]
          },
          wednesday = {          
            //===wednesday
            //stairmaster time[2]
            cardio: Lose[5]
          },
          thursday = {
            //===monday/thursday
            //row machine time[2]
            back: Lose[6],
            //squats (reps.medium)
            legs: Gain[3],
            //reverse crunch reps.high
            core: Gain[25]
          },
          friday = {
            //===tuesday/friday
            //dips chest version reps.high
            chest: Gain[42],
            //backwards lunges reps.high
            legs: Gain[2],
            //pulldown reps.high
            back: Gain[61]
          }
        ])}, 
          this.getWorkouts);
      }
      else if (this.state.bmi > 18 && this.state.bmi < 24) {
        console.log("good weight");
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            //===monday/thursday
            //row machine time[2]
            back: Lose[6],
            //squats (reps.medium)
            legs: Gain[3],
            //reverse crunch reps.high
            core: Gain[25]
          },
          tuesday = {
            //===tuesday/friday
            //dips chest version reps.high
            chest: Gain[42],
            //backwards lunges reps.high
            legs: Gain[2],
            //pulldown reps.high
            back: Gain[61]
          },
          wednesday = {          
            //===wednesday
            //stairmaster time[2]
            cardio: Lose[5]
          },
          thursday = {
            //===monday/thursday
            //row machine time[2]
            back: Lose[6],
            //squats (reps.medium)
            legs: Gain[3],
            //reverse crunch reps.high
            core: Gain[25]
          },
          friday = {
            //===tuesday/friday
            //dips chest version reps.high
            chest: Gain[42],
            //backwards lunges reps.high
            legs: Gain[2],
            //pulldown reps.high
            back: Gain[61]
          }
          
        ])}, 
          this.getWorkouts);
      } 
      else {
        console.log("too heavy");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);        
      }

      break;
    
    case "female":
      console.log("female");

      if(this.state.bmi < 18) {
        console.log("too skinny");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);        
      }
      else if (this.state.bmi > 18 && this.state.bmi < 24) {
        console.log("good weight");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);        
      } 
      else {
        console.log("too heavy");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);
      }
      break;
  }

}

//this function renders a workout for muscle gain
generateGain = () => {
  console.log("gain");
  console.log(this.state.bmi);
  //switch case checks user gender and conditionals check user bmi and choose workouts accordingly.
  switch (this.state.sex) {
    case "male":
      console.log("male");
      if(this.state.bmi < 18) {
        console.log("too skinny");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);
      }
      else if (this.state.bmi > 18 && this.state.bmi < 24) {
        console.log("good weight");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);
      } 
      else {
        console.log("too heavy");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);        
      }

      break;
    
    case "female":
      console.log("female");

      if(this.state.bmi < 18) {
        console.log("too skinny");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);        
      }
      else if (this.state.bmi > 18 && this.state.bmi < 24) {
        console.log("good weight");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);        
      } 
      else {
        console.log("too heavy");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);
      }
      break;
  }
}

//this function renders a workout for physique maintenance
generateMaintain = () => {
  console.log("maintain");
  console.log(this.state.bmi);
  //switch case checks user gender and conditionals check user bmi and choose workouts accordingly.
  switch (this.state.sex) {
    case "male":
      console.log("male");
      if(this.state.bmi < 18) {
        console.log("too skinny");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);
      }
      else if (this.state.bmi > 18 && this.state.bmi < 24) {
        console.log("good weight");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);
      } 
      else {
        console.log("too heavy");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);        
      }

      break;
    
    case "female":
      console.log("female");

      if(this.state.bmi < 18) {
        console.log("too skinny");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);        
      }
      else if (this.state.bmi > 18 && this.state.bmi < 24) {
        console.log("good weight");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);        
      } 
      else {
        console.log("too heavy");
        this.setState({ workouts: this.state.workouts.concat([
          
        ])}, 
          this.getWorkouts);
      }
      break;
  }
}

getWorkouts = () =>{
  console.log(this.state.workouts);
  console.log(this.state.user);
  console.log(this.state.loggedIn);
  console.log(this.state.username);

  const workoutInfo = {
    user: this.state.user,
    workouts: this.state.workouts
  }

  API.addWorkouts(workoutInfo).then(data => {
    console.log(data); 
  
  });
 
  this.setState({ workouts: [] });
}


      render(){
        
        return(
          
            <UserInfo
            username = {this.state.username}
            loggedIn = {this.state.loggedIn}
            sex ={this.state.sex}
            height = {this.state.height}
            weight = {this.state.weight}
            user = {this.state.user}
            age = {this.state.age}
            goals = {this.state.goals}
            handleInputChange = {this.handleInputChange}
            handleFormSubmit = {this.handleFormSubmit}
            />
        )
        }

      

}


export default UpdatePage