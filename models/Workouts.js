const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  workouts: {
    type: Array,
    required: true
  },
  
  
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Workout = mongoose.model("Workout", workoutsSchema);

module.exports = Workout;