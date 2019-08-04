const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");

// /api/todos/all
// get all todos from the signed in user
router.get("/all", authMiddleware.isLoggedIn, function (req, res, next) {
    db.MealPlans.find({
        user: req.user.id
    }, (err, workouts) => {
        res.json(workouts);
    });
});

router.post("/new", authMiddleware.isLoggedIn, function (req, res, next) {
    const newWorkout = new db.Workouts({
        user: req.user._id,
        workout: req.body.workout
    });

    newWorkout.save((err, newWorkout) => {
        if (err) throw err;
        db.User.findByIdAndUpdate(req.user.id, {
            $push: {
                Workouts: newWorkout._id
            }
        }, (err, user) => {
            if (err) throw err;
            res.send(newWorkout, user);
        });
    });
});

router.delete("/remove", authMiddleware.isLoggedIn, function (req, res, next) {
    db.Workouts.findByIdAndDelete(req.body.id, (err, workout) => {
        if (err) throw err;
        db.User.findByIdAndUpdate(workout._id, {
            $pull: {
                'Workouts': workout._id
            }
        }, {
            new: true
        }, (err, user) => {
            if (err) throw err;
            res.send(user);
        });
    });
});

// /api/todos/update
// update a todo based on id
router.put("/update", authMiddleware.isLoggedIn, function (req, res, next) {
    db.Workouts.findByIdAndUpdate(req.body.id, {
        mondayWorkout: req.body.mondayWorkout
    }, {
        tuesdayWorkout: req.body.mondayWorkout
    }, {
        wednesdayWorkout: req.body.mondayWorkout
    }, {
        thursdayWorkout: req.body.mondayWorkout
    }, {
        fridayWorkout: req.body.mondayWorkout
    }, {
        saturdayWorkout: req.body.mondayWorkout
    }, {
        sundayWorkout: req.body.mondayWorkout
    }, {
        new: true
    }, (err, todo) => {
        if (err) throw err;
        res.json(todo);
    });
});

module.exports = router;