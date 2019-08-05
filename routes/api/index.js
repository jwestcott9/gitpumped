const router = require("express").Router();
const userRoutes = require("./userRoutes");
const workoutRoutes = require("./workoutRoutes");
const mealPlanRoutes = require("./mealPlanRoutes");

router.use("/users", userRoutes);
router.use("/workouts", workoutRoutes);
router.use ("/mealPlans", mealPlanRoutes);

module.exports = router;
