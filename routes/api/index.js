const router = require("express").Router();
const userRoutes = require("./userRoutes");
const MealPlanRoutes = require("./MealPlanRoutes");
const WorkoutRoutes = require ("./WorkoutRoutes")

router.use("/users", userRoutes);
router.use("/MealPlan", MealPlanRoutes);
router.use("/Workouts", WorkoutRoutes);

module.exports = router;
