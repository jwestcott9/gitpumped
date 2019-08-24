import axios from "axios";

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

  //saves user workouts to mongo
  addWorkouts: function(workoutInfo) {
    return axios.post("/api/workouts/new", workoutInfo);
  },

  updateProfile: function(userInfo){
    return axios.put("/api/users/updateProfile", userInfo);
  },
  // checks to see if the user is logged in and and admin, then returns the user
  isAdmin: function() {
    return axios.get("/api/users/logout")
  },
  getWorkouts: function (){
    return axios.get("api/workouts/all/:id")
  },
  // logs out the user
  logout: function() {
    return axios.get("/api/users/logout")
  },

  addMealPlan: function(userPlan){
    return axios.post("/api/mealPlans/new", userPlan);
  }


};