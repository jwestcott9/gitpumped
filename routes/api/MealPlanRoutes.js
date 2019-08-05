const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");

// /api/mealPlans/all
// get all mealPlans from the signed in user
router.get("/all", authMiddleware.isLoggedIn, function (req, res, next) {
    db.MealPlans.find({ author: req.body.user}, (err, mealplans) => {
        res.json(mealplans);
    });
});

// /api/mealPlans/new, 
// add new workout, update the user to have workout id
router.post("/new", authMiddleware.isLoggedIn, function (req, res, next) {
    const newMealPlan = new db.MealPlans({
        user: req.body.user,
        MealPlan: req.body.MealPlan
    });

    newMealPlan.save((err, newMealPlan) => {
        if (err) throw err;
        db.User.findByIdAndUpdate(req.body.user, { $push: { MealPlans: newMealPlan._id } }, (err, user) => {
            if (err) throw err;
            res.send(newMealPlan, user);
        });
    });
});

// /api/mealPlans/remove
// removed workout based on id, updates user
router.delete("/remove", authMiddleware.isLoggedIn, function (req, res, next) {
    db.MealPlans.findByIdAndDelete(req.body.id, (err, workout) => {
        if (err) throw err;
        db.User.findByIdAndUpdate(MealPlans._id, { $pull: { 'MealPlan': MealPlans._id } }, { new: true }, (err, user) => {
            if (err) throw err;
            res.send(user);
        });
    });
});

// /api/mealPlans/update
// update a workout based on id
router.put("/update", authMiddleware.isLoggedIn, function (req, res, next) {
    db.MealPlans.findByIdAndUpdate(req.body.id, { MealPlans: req.body.MealPlan }, { new: true }, (err, mealplan) => {
        if (err) throw err;
        res.json(mealplan);
    });
});

module.exports = router;