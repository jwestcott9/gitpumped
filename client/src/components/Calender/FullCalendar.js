import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import axios from "axios";
import Table from "../../components/Table";

import ModalDialog from 'react-bootstrap/ModalDialog'


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import "./styles.css";

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import bootstrapPlugin from '@fullcalendar/bootstrap'

class DemoApp extends React.Component {
  
  calendarComponentRef = React.createRef();
  constructor(props) {
    super(props);
  this.state = {
    modal: false,
    content: null,
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
    ],
    workoutHeader1: "",
    workoutBody1: "",
    workoutHeader2: "",
    workoutBody2: "",
    workoutHeader3: "",
    workoutBody3: "",
   
  };

  this.toggle = this.toggle.bind(this);

}
toggle() {
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


  render() {
    return (
      
      <div className="demo-app">
        
        <div className="demo-app-top">
          &nbsp; (also, click a date/time to add an event)
        </div>
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
           
           
          />
           <Modal isOpen={this.state.modal} toggle={this.toggle}  dialogClassName="modal-90w">
          <ModalHeader toggle={this.toggle}>Workout Description</ModalHeader>
          <ModalBody>
            <tbody>
            <Table
            name = {this.state.workoutHeader1}
            amount = {this.state.workoutBody1}
            image = {this.state.image1}
            />
            <Table
            name = {this.state.workoutHeader2}
            amount= {this.state.workoutBody2}
            image = {this.state.image2}
            />
             <Table
             name = {this.state.workoutHeader3}
            amount= {this.state.workoutBody3}
            image = {this.state.image3}
            />
            </tbody>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
       
        </div>
       
      </div>
    );
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
    this.getWorkouts(this.props.user)
   
  };



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
                    let description = ``;
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
                    console.log(array);
                    let data = {
                      title: typeArray,
                      info: array,
                      start: workoutObject.event.start,
                      end: workoutObject.event.end
                    }
                    console.log(data);
                   
                    y.push(data);
               
                    this.saveTheWorkouts(data);
                }
                this.setState({
                  calendarEvents: y
                }, () => {
                  console.log(this.state.calendarEvents)
                })

            });
        })
    })
}

saveTheWorkouts = (data) =>{

  this.setState({
    // add new event data
    calendarEvents: this.state.calendarEvents.push({
      // creates a new array
      title: data.title,
      start: data.start
      
    }, ()=>{
      console.log(this.state.calendarEvents);
    })
  })
}

changeState = ()=>{
  this.setState({
    modal: true
  }, ()=>{
    this.render()
  })
}
 

  eventClick = (info) => { 
    
    console.log(info);
    console.log(info.event._def.extendedProps.info);
    let data = info.event._def.extendedProps.info;
    info.jsEvent.preventDefault(); // don't let the browser navigate
    this.setState({
      content: info.event._def.title,
    }, ()=>{
     this.changeState();
    })
    if (info.event.url) {
      window.open(info.event.url);
    }
    this.renderList(data);
    this.toggle();
    console.log(this.state.modal)
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