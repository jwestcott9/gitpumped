import React, {Component} from "react";
import axios from "axios";
import API from "../../utils/API"

class MealPlan extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            plans: [],
            recipe: [],
            counter: 0,
            summary: [],
            dates:[]
        };
      }
      
getInstructions(id, title){
 
        axios.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+id+"/summary", 
        {"headers":
    { "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": "fcb3b27bb6mshc7a98d29060e823p1674e7jsn37cc5c313307"
    }}).then((element) =>{
    let counter = this.state.counter;
    counter++
    let summary = this.state.summary;
    summary.push(element.data.summary)
    // obj.summary = element.data.summary;
    let placeholder = this.state.plans
    placeholder.push(title);
    this.setState({
        user: this.props.user,
        plans: placeholder,
        counter: counter,
        summary: summary
    }, ()=>{
        console.log(this.state);
        if(this.state.counter === 21){
            console.log("printing to the database now")
            this.props.generateWorkouts();
            
            API.addMealPlan({
                user: this.props.user,
                MealPlan: this.state.plans,
                Summary: this.state.summary
                               }, ()=>{
                                   console.log(this.props)
                                   
                               })
        }
    })
    });
       

/* call a function here that you can pass in from the parent component
you got this fam its only a few more days
all you need to do is pass down a function to this component and then and then pass in the 
data that you want to  show up in the modal that you click later
I think also you could just save this data to the database and then make a get request to get it up to the parent */
        }

        getDates = () => {
            console.log(this.props.StartDate);
            let start = this.props.StartDate
            let end = this.props.StartDate
            let m = start.getDate();
            let month = start.getMonth();
            m = m-1
            let y = [];
             for(let i=0; i<7; i++){
 
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
              let placeholder = this.state.dates;
              placeholder.push(event)
              
          
              this.setState({
                dates: placeholder
              }, ()=>{
                console.log(this.state.dates)
              })
            }
        }
      triggerLogic(){
         console.log("----------------------------wazzzzzzzzzzuuuuuuuuuu")
         this.getDates(this.props.StartDate);
          this.getMeal(this.props.timeFrame, this.props.targetCalories, this.props.diet, this.props.exclude, this.props.user )
      }
      getMeal = (timeFrame, targetCalories, diet, exclude, user) => {
        let obj ={};
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
                    
                    allPlans.forEach((element)=>{
                        obj = {};
                        let id = element.value.substring(6,12)
                        
                        let title = element.value.split("title")[1];  
                        let result = title.split(":")[1];   
                        let final = result.split("}");            
                        obj.title = final;
                        final.pop()
                        final.toString();


                        this.getInstructions(id, final);
                    })
                   
                    
                 }).then( () => 
                 console.log("-------------------------------------------------------------"),
                   

                        )
          }

   
   render(){
return(
    <>
    {/* {this.state.recipe.map((element)=>{
        return<div>
            {element}
        </div>
    })}
    
    {this.state.plans.map((element) => {
       return  <div>
          {element}  
        </div>
    })} */}
    </>
)}

}

export default MealPlan;

