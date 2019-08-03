const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealPlanSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  mondayPlan: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  tuesdayPlan: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  wednesdayPlan: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  thursdayPlan: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  fridayPlan: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  saturdayPlan: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  sundayPlan: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const MealPlan = mongoose.model("MealPlan", MealPlanSchema);

module.exports = MealPlan;