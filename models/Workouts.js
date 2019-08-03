const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  mondayWorkout: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  tuesdayWorkout: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  wednesdayWorkout: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  thursdayWorkout: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  fridayWorkout: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  saturdayWorkout: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  sundayWorkout: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Workouts = mongoose.model("Workouts", WorkoutsSchema);

module.exports = Workouts;
