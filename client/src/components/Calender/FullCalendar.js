import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import axios from "axios";

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
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      { title: "Event Now", start: new Date()},
      {title: "event test", back: "something", legs: "somethingelse", cardio: "something",url: "facebook.com", start: new Date ()}
    ],
    workouts: null
  };
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
            themeSystem = 'bootstrap'
            selectable = "true"
            eventClick = {this.eventClick}
          />
        </div>
      </div>
    );
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
    console.log(user)
    axios.get("api/workouts/all/"+ user)
        .then(data => {
          console.log(data)
            this.setState({
                workouts: data
            }, ()=>{
                console.log(this.state.workouts.data)
                let paragraph = "";
                this.state.workouts.data.forEach((element)=>{
                  for(let i =0; i<element.workouts.length; i++){
                    console.log(element.workouts[i]); 
                    console.log(element.workouts[i].back)
                    paragraph = paragraph + element.workouts[1].back.exercise_name
                    console.log(paragraph);
                    

                  }
                  console.log(element.workouts);
                })
            });
        })
}

  componentDidMount = () =>{
   
    this.getWorkouts(this.props.user)
    console.log(this.state.workouts);
  
    let newEvent = {
      title: 'dynamic event',
      start: new Date('2019-08-02' + 'T12:00:00'),
      url: "facebook.com",
     
      
    };
    console.log(typeof newEvent.start)
    
    this.setState({
      // add new event data
      calendarEvents: this.state.calendarEvents.concat({
        // creates a new array
        title: newEvent.title,
        start: newEvent.start
        
      })
    })
 
  }

  eventClick = (info) => { 
    console.log(info);
    info.jsEvent.preventDefault(); // don't let the browser navigate

    if (info.event.url) {
      window.open(info.event.url);
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
    
  };
}

export default DemoApp;