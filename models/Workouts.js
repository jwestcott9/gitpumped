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
  // first: {
  //   type: Object,
  //   required: true
  // },
  // second: {
  //   type: Object,
  //   required: true
  // },
  // third: {
  //   type: Object,
  //   required: true
  // },
  // fourth: {
  //   type: Object,
  //   required: true
  // },
  // fifth: {
  //   type: Object,
  //   required: true
  // },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Workout = mongoose.model("Workout", workoutsSchema);

module.exports = Workout;