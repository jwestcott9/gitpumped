const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  monday: {
    type: Object,
    unique: false,
    required: false
  },
  tuesday: {
    type: String,
    unique: false,
    required: false
  },
  wednesday: {
    type: String,
    unique: false,
    required: false
  },
  thursday: {
    type: String,
    unique: false,
    required: false
  },
  friday: {
    type: String,
    unique: false,
    required: false
  },
  saturday: {
    type: String,
    unique: false,
    required: false
  },
  sunday: {
    type: String,
    unique: false,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Workout = mongoose.model("Workout", workoutsSchema);

module.exports = Workout;