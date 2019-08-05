const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");

// /api/workouts/all
// 
// get all workouts from the signed in user
router.get("/all", authMiddleware.isLoggedIn,  function (req, res, next) {
    db.Workouts.find({ user: req.body.user }, (err, workouts) => {
        if(err){
            res.json(err);
        }
        res.json(workouts);
    });
});

// /api/workouts/new
// add new workout, update the user to have workout id
router.post("/new",  authMiddleware.isLoggedIn, function (req, res, next) {
    const newWorkout = new db.Workouts({
        user: req.body.user,
        monday: req.body.monday,
        tuesday: req.body.tuesday,
        // wednesday: req.body.wednesday,
        // thursday: req.body.thursday,
        // friday: req.body.friday,
        // saturday: req.body.saturday,
        // sunday: req.body.sunday
    });

    newWorkout.save((err, newWorkout) => {
        if (err) throw err;
        db.User.findByIdAndUpdate(req.body.user, { $push: { Workouts: newWorkout._id } }, (err, user) => {
            if (err) throw err;
            res.send(newWorkout, user);
        });
    });
});

// /api/workouts/remove
// removed workout based on id, updates user
router.delete("/remove", authMiddleware.isLoggedIn, function (req, res, next) {
    db.Workouts.findByIdAndDelete(req.body.id, (err, workout) => {
        if (err) throw err;
        db.User.findByIdAndUpdate(Workouts._id, { $pull: { 'Workouts': Workouts._id } }, { new: true }, (err, user) => {
            if (err) throw err;
            res.send(user);
        });
    });
});

// /api/workouts/update
// update a workout based on id
router.put("/update", authMiddleware.isLoggedIn, function (req, res, next) {
    db.Workouts.findByIdAndUpdate(req.body.id, { Workouts: req.body.workout }, { new: true }, (err, workout) => {
        if (err) throw err;
        res.json(workout);
    });
});

module.exports = router;