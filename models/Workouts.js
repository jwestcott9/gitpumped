const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
<<<<<<< HEAD
 workouts:{
   type: Array,
   unique: false
 },
=======
  workouts: {
    type: Array,
    required:true
  },
>>>>>>> cd0f0dcc055028f86dc52a44306146a849b4eae7
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Workout = mongoose.model("Workout", workoutsSchema);

module.exports = Workout;