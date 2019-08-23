const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");
//  authMiddleware.isLoggedIn,
// /api/mealPlans/all
// get all mealPlans from the signed in user
router.get("/all/:id", function (req, res, next) {
    db.MealPlans.find({ _id: req.params.id}, (err, mealplans) => {
        res.json(mealplans);
    });
});



// /api/mealPlans/new, 
// authMiddleware.isLoggedIn, 
// add new workout, update the user to have workout id
router.post("/new", function (req, res, next) {
    console.log("I was hit");
    console.log(req.body.Dates);
    
    const newMealPlan = new db.MealPlans({
        user: req.body.user,
        MealPlan: req.body.MealPlan,
        Summary: req.body.Summary,
        Dates: req.body.Dates
    });

    newMealPlan.save((err, newMealPlan) => {
        console.log("I was also hits")
        console.log(req.body.user);
        if (err) throw err;
        db.User.findByIdAndUpdate(req.body.user, { MealPlans: newMealPlan._id}, (err, user) => {
            if (err) throw err;
            console.log( "I was also hit also")
            console.log(user);
            res.send(newMealPlan); 
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