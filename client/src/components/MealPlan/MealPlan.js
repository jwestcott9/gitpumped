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
        };
      }
      
      getInstructions(id){
  

        axios.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+id+"/summary", 
        {"headers":
    { "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": "fcb3b27bb6mshc7a98d29060e823p1674e7jsn37cc5c313307"
    }}).then((element) =>{
        let placeholder = [];
        let result = element.data.summary;

        
        let string = result.toString();
        let  first = string.includes("b");
       console.log(first);
       
        // let second = first.split("<div>");
        // let third = second.split("</br>");

        placeholder.push(first);
        
        this.setState({
            recipe: placeholder
        })
    });

/* call a function here that you can pass in from the parent component
you got this fam its only a few more days
all you need to do is pass down a function to this component and then and then pass in the 
data that you want to  show up in the modal that you click later
I think also you could just save this data to the database and then make a get request to get it up to the parent */
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
                        console.log(element);
                        let id = element.value.substring(6,12)
                        console.log(id);
                        this.getInstructions(id);
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
    {this.state.recipe.map((element)=>{
        return<div>
            {element}
        </div>
    })}
    
    {this.state.plans.map((element) => {
       return  <div>
          {element}  
        </div>
    })}
    </>
)}

}

export default MealPlan;

