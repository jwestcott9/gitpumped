import axios from "axios";
import unirest from "unirest";

export default {
  // logs in user
  login: function(loginInfo) {
    return axios.post("/api/users/login", loginInfo);
  },

  // signs up user, then logs them in
  signup: function(signupInfo) {
    return axios.post("/api/users/signup", signupInfo);
  },

  // checks to see if user is logged in, then returns the user
  isLoggedIn: function() {
    return axios.get("/api/users/profile");
  },

  updateProfile: function(userInfo){
    return axios.put("/api/users/updateProfile", userInfo);
  },
  // checks to see if the user is logged in and and admin, then returns the user
  isAdmin: function() {
    return axios.get("/api/users/logout")
  },

  // logs out the user
  logout: function() {
    return axios.get("/api/users/logout")
  },

  // api that gets a random Chuck Norris Joke
  ChuckNorris: function() {
    return axios.get("https://api.icndb.com/jokes/random");
  },

  // PlanMeal: function() { 
  //  console.log("PlanMeal")
  
  //   let req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate");
  
  //   req.query({
  //       "timeFrame": "week",
  //       "targetCalories": "2000",
  //       "diet": "vegetarian",
  //       "exclude": "shellfish"
  //   });
    
  //   req.headers({
  //       "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  //       "x-rapidapi-key": "fcb3b27bb6mshc7a98d29060e823p1674e7jsn37cc5c313307"
  //   });
        
       
  
  //   req.end(function (res) {
  //       console.log(res);
  //       if (res.error) throw new Error(res.error);
  //       console.log(res.body);
        
  //   });
    
  // }
  

};