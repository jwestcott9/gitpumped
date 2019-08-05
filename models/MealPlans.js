const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealPlanSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  MealPlan: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const MealPlans = mongoose.model("MealPlan", MealPlanSchema);

module.exports = MealPlans;