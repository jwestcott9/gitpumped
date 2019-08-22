/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
import React, { Component } from "react";
import UserInfo from "../../components/UserInfo";
import API from "../../utils/API";
import "./style.css";
import { Link } from "react-router-dom";
import Lose from '../../data/cardio.json';
import Gain from '../../data/gain.json';
// eslint-disable-next-line no-unused-vars
import Maintain from '../../data/essentials.json';



class UpdatePage extends Component {
  constructor(props){
    super(props);
    this.state={
    loggedIn: false,
    username: null,
    sex: "",
    weight: "",
    height: "",
    user: null,
    age: "",
    goals: "",
    bmi: "",
    workouts: [],
    startDate: new Date()
    }
this.handleChange = this.handleChange.bind(this);
  }

    handleChange(date) {
      console.log(date);
      this.setState({
        startDate: date
      });
    }
    handleSelect(date){
      console.log(date);
    
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
      if(this.state.bmi < 18) {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            back: Lose[6],
            legs: Gain[3],
            core: Gain[25],
            
          },
          tuesday = {
            chest: Gain[45],
            legs: Gain[2],
            back: Gain[61]
          },
          wednesday = {          
            cardio: Lose[5]
          },
          thursday = {
            back: Lose[6],
            legs: Gain[3],
            core: Gain[25]
          },
          friday = {
            chest: Gain[42],
            legs: Gain[2],
            back: Gain[61]
          }
        ])}, 
          this.getDates);
      }
      else if (this.state.bmi > 18 && this.state.bmi < 24) {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            chest: Gain[36],
            legs: Gain[5],
            core: Gain[20]
          },
          tuesday = {
            core: Gain[21],
            shoulders: Gain[43],
            back: Gain[63]
          },
          wednesday = {          
            legs: Lose[1]
          },
          thursday = {
            chest: Gain[36],
            legs: Gain[5],
            core: Gain[20]
          },
          friday = {
            core: Gain[21],
            shoulders: Gain[43],
            back: Gain[63]
          }
          
        ])}, 
          this.getDates);
      } 
      else {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            chest: Gain[35],
            legs: Lose[5],
            core: Gain[26]
          },
          tuesday = {
            back: Lose[6],
            legs: Gain[7],
            core: Gain[32]
          },
          wednesday = {          
            cardio: Lose[2]
          },
          thursday = {
            chest: Gain[35],
            legs: Lose[5],
            core: Gain[26]
          },
          friday = {
            back: Lose[6],
            legs: Gain[7],
            core: Gain[32]
          }
        ])}, 
          this.getDates);        
      }

      break;
    
    case "female":
      if(this.state.bmi < 18) {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[32],
            legs: Gain[4],
            Upper: Gain[43]
          },
          tuesday = {
            Upper: Gain[38],
            legs: Gain[1],
            core: Gain[32]
          },
          wednesday = {          
            cardio: Lose[5]
          },
          thursday = {
            core: Gain[32],
            legs: Gain[4],
            Upper: Gain[43]
          },
          friday = {
            Upper: Gain[38],
            legs: Gain[1],
            core: Gain[32]
          }
        ])}, 
          this.getDates);        
      }
      else if (this.state.bmi > 18 && this.state.bmi < 24) {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[32],
            legs: Gain[11],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[65],
            legs: Gain[9],
            core: Gain[17]
          },
          wednesday = {          
            cardio: Lose[7]
          },
          thursday = {
            core: Gain[32],
            legs: Gain[11],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[65],
            legs: Gain[9],
            core: Gain[17]
          }
        ])}, 
          this.getDates);        
      } 
      else {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);
      }
      break;
  }
 

}

//this function renders a workout for muscle gain
generateGain = () => {
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
      if(this.state.bmi < 18) {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);
      }
      else if (this.state.bmi > 18 && this.state.bmi < 24) {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);
      } 
      else {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);        
      }

      break;
    
    case "female":
      if(this.state.bmi < 18) {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);        
      }
      else if (this.state.bmi > 18 && this.state.bmi < 24) {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);        
      } 
      else {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);
      }
      break;
  }
}
//this function renders a workout for physique maintenance
generateMaintain = () => {
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
      if(this.state.bmi < 18) {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);
      }
      else if (this.state.bmi > 18 && this.state.bmi < 24) {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);
      } 
      else {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);        
      }

      break;
    
    case "female":
      if(this.state.bmi < 18) {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);        
      }
      else if (this.state.bmi > 18 && this.state.bmi < 24) {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);        
      } 
      else {
        this.setState({ workouts: this.state.workouts.concat([
          monday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          tuesday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          },
          wednesday = {          
            cardio: Lose[1]
          },
          thursday = {
            core: Gain[26],
            legs: Lose[5],
            cardio: Lose[0]
          },
          friday = {
            Upper: Lose[6],
            core: Gain[13],
            cardio: Gain[0]
          }
        ])}, 
          this.getDates);
      }
      break;
  }
}

getDates = () => {
  let start = this.state.startDate
  let end = this.state.startDate
  let m = start.getDate();
  let month = start.getMonth();
  m = m-1
  let y = [];

  this.state.workouts.forEach((element)=>{
   
   
    if(month === 1 || 3 || 5 || 7 || 8 || 10 || 12 ){
      if(m === 32){
        m = 0
        month ++
      }
    }
    if(month ===  4 || 6 || 9 || 11){
      if(m===31){
        m = 0;
        month ++

      }
    }

    if(month === 2){
      if(m===29){
        m=0;
        month++
      }
    }
    m = m+1;
    
    start.setDate(m);
    start.setHours(12);
    start.setMinutes(0);
    start.setMonth(month)

    end.setDate(m);
    end.setHours(13);
    end.setMinutes(0); 
    end.setMonth(month);

    let event = {
      start: new Date(start),
      end: new Date(end)
    }
    element.event = event


    y.push(element);

    this.setState({
      workouts: y
    }, ()=>{
      console.log(this.state.workouts)
    })
  })

  this.getWorkouts();
}
getWorkouts = () =>{
const userWorkoutArray = [
  this.state.workouts[0],
  this.state.workouts[1],
  this.state.workouts[2],
  this.state.workouts[3],
  this.state.workouts[4]
]

console.log(userWorkoutArray);

  const workoutInfo = {
    user: this.state.user,
    workouts: userWorkoutArray
  }


  API.addWorkouts(workoutInfo).then(data => {
    console.log(data); 
    window.location.href="/profile"
  });
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
            handleChange = {this.handleChange}
            selected = {this.state.startDate}
            handleSelect = {this.handleSelect}

            />
           
        
        )
        }

      

}


export default UpdatePage