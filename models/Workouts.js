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
    type: Object,
    unique: false,
    required: false
  },
  wednesday: {
    type: Object,
    unique: false,
    required: false
  },
  thursday: {
    type: Object,
    unique: false,
    required: false
  },
  friday: {
    type: Object,
    unique: false,
    required: false
  },
  saturday: {
    type: Object,
    unique: false,
    required: false
  },
  sunday: {
    type: Object,
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