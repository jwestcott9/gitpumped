const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealPlanSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  MealPlan: {
    type: Array,
    unique: false,
    required: [true, "text is required"]
  },
  Summary:{
    type: Array,
  },
  Dates:{
    type:Array,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const MealPlans = mongoose.model("MealPlan", MealPlanSchema);

module.exports = MealPlans;