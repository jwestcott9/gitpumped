import React, {Component} from "react";
import axios from "axios";
import API from "../../utils/API"
let placeholder = [];
class MealPlan extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            plans: [],
        };
      }

      
      componentDidMount(){
          console.log(this.props)
          this.getMeal(this.props.timeFrame, this.props.targetCalories, this.props.diet, this.props.exclude, this.props.user )
      }
      getMeal = (timeFrame, targetCalories, diet, exclude, user) => {
       
        axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate',
        {"headers": 
        { "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
           "x-rapidapi-key": "fcb3b27bb6mshc7a98d29060e823p1674e7jsn37cc5c313307"}},
      
           {query: {"timeFrame": timeFrame,
           "targetCalories": targetCalories,
           "diet": diet,
           "exclude": exclude},})
                .then((response)=>{
                    
                    let placeholder = [];
                    let allPlans = response.data.items;
                    
                    allPlans.forEach((element)=>{
                        
                        let title = element.value.split("title")[1];  
                        let result = title.split(":")[1];   
                        let final = result.split("}");                 
                        placeholder.push(final);
                        
                    })
                   
                    this.setState({
                        user: this.props.user,
                        plans: placeholder
                    },()=> {

                    });
                 }).then( () => 

                         API.addMealPlan({
                         user: this.props.user,
                         MealPlan: this.state.plans
                                        })
                        )
          }

   
   render(){
return(
    <>
    {this.state.plans.map((element) => {
       return  <div>
          {element}  
        </div>
    })}
    </>
)}

}

export default MealPlan;

