import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import axios from "axios";
import Table from "../../components/Table";




import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import "./styles.css";

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import bootstrapPlugin from '@fullcalendar/bootstrap'
import Calendar from "react-calendar";

class DemoApp extends React.Component {
  
  calendarComponentRef = React.createRef();
  constructor(props) {
    super(props);
  this.state = {
    
    modal: false,
    modal2: false,
    content: null,
    calendarWeekends: true,
    mealPlans: [],
    calendarEvents: [
      // initial event data
    ],
    workoutHeader1: "",
    workoutBody1: "",
    workoutHeader2: "",
    workoutBody2: "",
    workoutHeader3: "",
    workoutBody3: "",
    loading: true,
    MealInfo: "",
    Summary1: "",
    Summary2: "",
    Summary3: ""
   
  };

  this.toggle = this.toggle.bind(this);

}
toggle() {
  console.log(this.state)
  if(this.state.modal){
  this.setState({
    content: this.state.content,
    modal: false
  })}
  if(!this.state.modal){
    this.setState({
      content:this.state.content,
      modal: true
    })
  }
  ;
}
toggle2() {
  console.log(this);
  if(this.state.modal2){
  this.setState({
    content: this.state.content,
    modal2: false
  })}
  if(!this.state.modal2){
    this.setState({
      content:this.state.content,
      modal2: true
    })
  }
  ;
}


// saveTheMealPlans(event){
//   console.log(this.state.calendarEvents);
//   console.log("444444444444444444444444444444444444444444")
//   this.setState({
//     calendarEvents: this.state.calendarEvents.push({
//       title: event.title,
//       start: event.start,
//       end: event.end
//     })
//   })
// }


  render() {
    return (
      
      <div className="demo-app">
        {!this.state.loading?
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            editable = "true"
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
            themeSystem = 'Standard'
            selectable = "true"
            eventClick = {this.eventClick}
            eventColor= 'grey'
            eventTextColor = "white"
            Integer = '9000000'
           
           
          />
          </div>: <div></div>
          }
          <div>
        
           <Modal isOpen={this.state.modal} toggle={this.toggle}  dialogClassName="modal-90w"
           size="lg">
          <ModalHeader toggle={this.toggle}>Workout Description</ModalHeader>
          <ModalBody>
            <tbody>
            <Table
            name = {this.state.MealInfo.breakfastTitle}
            amount = {this.state.Summary1}
            image = {this.state.image1}
            />
            <Table
            name = {this.state.MealInfo.lunchTitle}
            amount= {this.state.Summary2}
            image = {this.state.image2}
            />
             <Table
             name = {this.state.MealInfo.dinnerTitle}
            amount= {this.state.Summary3}
            image = {this.state.image3}
            />
            </tbody>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modal2} toggle={this.toggle2}  dialogClassName="modal-90w"
           size="lg">
          <ModalHeader toggle={this.toggle2}>Workout Description</ModalHeader>
          <ModalBody>
            <tbody>
            <Table
            name = {this.state.workoutHeader1}
            summary = {this.state.Summary1}
            image = {this.state.image1}
            />
            <Table
            name = {this.state.workoutHeader2}
            summary= {this.state.Summary2}
            image = {this.state.image2}
            />
             <Table
             name = {this.state.workoutHeader3}
            summary = {this.state.Summary3}
            image = {this.state.image3}
            />
            </tbody>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle2}>Do Something</Button>{' '}
            <Button color="secondary" data = {this.state.modal2} onClick={this.toggle2}>Cancel</Button>
          </ModalFooter>
        </Modal>

       
        </div>
       
      </div>
      
    );
  }
renderMeal = (data) => {
  
}

  
  renderList = (data)=>{
   
      let counter=0;
      data.forEach((element) =>{
        counter++;
        console.log(counter);
           let name = element.name
           let amount;
           if(element.reps){
            amount = element.reps
           }
           if(element.time){
             amount = element.time
           }
                if(counter === 1){
                  this.setState({
                    workoutHeader1: name,
                    workoutBody1: amount
                  }, ()=>console.log(this.state))
                }
                if(counter===2){
                  this.setState({
                    workoutHeader2: name,
                    workoutBody2:amount
                 },()=> console.log(this.state))
                }
                if(counter===3){
                  this.setState({
                    workoutHeader3: name,
                    workoutBody3:amount
                 }, ()=>console.log(this.state))
                }
                   
    },

    )}
  
componentDidMount = () =>{
    this.getWorkouts(this.props.user);
    
  };
getMealPlans(user){
  axios.get("/api/users/mealPlanForUser/"+user)
  .then((data)=>{
    let id = data.data.MealPlans[0];
    axios.get("/api/mealPlans/all/" +id)
    .then((data)=>{
      this.setState({
        mealPlans: data
      }, ()=>{
        console.log(
      this.state.mealPlans.Dates)
      let  y = this.state.calendarEvents;
      let count = -1;

      data.data[0].Dates.forEach((element)=>{
       
        count = count+1
        let startingIndex = count*3
        let obj = {};
       for(let i =0; i<3; i++){
         let increment = startingIndex;
          if(i===0){
            obj.breakfastTitle= data.data[0].MealPlan[increment][0]
            obj.breakfastSummary = data.data[0].Summary[increment]
          }
          if(i===1){
            obj.lunchTitle = data.data[0].MealPlan[increment+1][0]
            obj.lunchSummary = data.data[0].Summary[increment+1]
          }
          if( i ===2){
            obj.dinnerTitle = data.data[0].MealPlan[increment+2][0]
            obj.dinnerSummary = data.data[0].Summary[increment+2]
          }
          increment++
       }
      
       console.log(element);
        let event = {
          title: "MealPlan",
          info: obj,
          start: element.start,
          end: element.end, 
          color: "red"
        }
        y.push(event)
      })
      this.setState({
        calendarEvents: y 
        
      }, ()=>{
        this.setState({
          loading: false
        })
        console.log(this.state.calendarEvents)
        
      })
/*{title: Array(3), info: Array(3), start: "2019-08-29T19:00:04.633Z", end: "2019-08-29T19:00:04.633Z"}
 {title: Array(3), info: Array(3), start: "2019-08-30T19:00:04.633Z", end: "2019-08-30T19:00:04.633Z"}
 {title: Array(1), info: Array(1), start: "2019-08-31T19:00:04.633Z", end: "2019-08-31T19:00:04.633Z"}
 {title: Array(3), info: Array(3), start: "2019-09-01T19:00:04.633Z", end: "2019-09-01T19:00:04.633Z"}
 {title: Array(3), info: Array(3), start: "2019-09-02T19:00:04.633Z", end: "2019-09-02T19:00:04.633Z"}
 {title: "MealPLan", info: {…}, start: "2019-08-23T19:00:04.633Z", end: "2019-08-23T19:00:04.633Z"}
 {title: "MealPLan", info: {…}, start: "2019-08-24T19:00:04.633Z", end: "2019-08-24T19:00:04.633Z"}
 {title: "MealPLan", info: {…}, start: "2019-08-25T19:00:04.633Z", end: "2019-08-25T19:00:04.633Z"}
 {title: "MealPLan", info: {…}, start: "2019-08-26T19:00:04.633Z", end: "2019-08-26T19:00:04.633Z"}
 {title: "MealPLan", info: {…}, start: "2019-08-27T19:00:04.633Z", end: "2019-08-27T19:00:04.633Z"}
 {title: "MealPLan", info: {…}, start: "2019-08-28T19:00:04.633Z", end: "2019-08-28T19:00:04.633Z"}
 {title: "MealPLan", info: {…}, start: "2019-08-29T19:00:04.633Z", end: "2019-08-29T19:00:04.633Z"}*/

      })
      
    })
  })
}


toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends
    });
  };

gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
};

getWorkouts(user){
  axios.get("api/users/workoutForUser/"+user)
  .then(data =>{
    console.log(data.data.Workouts[0])
    axios.get("api/workouts/userWorkouts/"+data.data.Workouts[0]).then(
      data =>{
      
            this.setState({
                workouts: data
            }, () => {

                console.log(this.state.workouts.data)
               
                let y = [];
                for (let i = 0; i < this.state.workouts.data[0].workouts.length; i++) {

                    let workoutObject = this.state.workouts.data[0].workouts[i]
                    let x;
                    let array =[];
                    let typeArray = [];
                    for(x in workoutObject){
                      let obj = {};
                    
                      if(workoutObject[x].exercise_name){
                        
                        obj.name =`Type: ${x} - Exercise: ${workoutObject[x].exercise_name}`
                      }
                      if(workoutObject[x].reps){
                          obj.reps = ` Reps: ${workoutObject[x].reps.medium[0]}`
                      }
                      if(workoutObject[x].time){
                        obj.time = `Time(in minutes): ${workoutObject[x].time}`
                      } 
                    typeArray.push(" "+x);

                     array.push(obj)
                    }
                    typeArray.pop();
                    typeArray.toString();
                    array.pop();
                    console.log(array[0].name);
                    
                    let color = "blue";
                    if(array[0].name.includes("cardio")){
                      color = "lightBlue"
                    }
                    if(array[0].name.includes("Upper")){
                      color = "forestgreen"
                    }
                    if(array[0].name.includes("core")){
                      color="black"
                    }
                    /* This is where the data is stored for the events
                     */
                    let data = {
                      title: typeArray,
                      info: array,
                      start: workoutObject.event.start,
                      end: workoutObject.event.end,
                      color: color
                    }
                    console.log(data);
                   
                    y.push(data);
               
                    // this.saveTheWorkouts(data);
                }
                this.setState({
                  calendarEvents: y
                }, () => {
                  console.log(this.state.calendarEvents)
                })

            });
            this.getMealPlans(this.props.user);
        })
    })
}




 

  eventClick = (info) => { 
    console.log(info.event._def.title)
    console.log(info.event._def.title !== "MealPlan")
    if(info.event._def.title !== "MealPlan"){
    console.log(info);
    console.log(info.event._def.extendedProps.info);
    let data = info.event._def.extendedProps.info;
    info.jsEvent.preventDefault(); // don't let the browser navigate
    this.setState({
      content: info.event._def.title,
    }, ()=>{
    //  this.changeState();
    })
    if (info.event.url) {
      window.open(info.event.url);
    }
    this.renderList(data);
    this.toggle();
    console.log(this.state.modal)
  }
else{
    console.log(info.event._def.extendedProps.info);
    let data = info.event._def.extendedProps.info
    this.setState({
      MealInfo: data,
      Summary1: data.breakfastSummary,
      Sumamry2: data.lunchSummary,
      Summary3: data.dinnerSummary
    },() => {
      console.log(`THIS RIGHT HER IS GOING TO BE THE MEAL INFO OBJECT
       ${this.state.MealInfo.breakfastSummary} `)
    this.toggle2()})
    }
  }
  

  handleDateClick = arg => {
    console.log( arg.date);
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: "New Event",
          start: arg.date,
          allDay: arg.allDay
        })
      });
    
  }
}


export default DemoApp;