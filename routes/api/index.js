const router = require("express").Router();
const userRoutes = require("./userRoutes");
const workoutRoutes = require("./workoutRoutes");
const mealPlanRoutes = require("./mealPlanRoutes");
const image = require("./image");


router.use("/users", userRoutes);
router.use("/workouts", workoutRoutes);
router.use ("/mealPlans", mealPlanRoutes);
router.use("/image", image);


module.exports = router;
