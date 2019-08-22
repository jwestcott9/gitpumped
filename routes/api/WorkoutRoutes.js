const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");

// /api/workouts/all
// get all workouts from the signed in user
router.get("/all/:id",  function (req, res, next) {
    db.Workouts.find({ user: req.params.id }, (err, workouts) => {
        if(err){
            res.json(err);
        }
        res.json(workouts);
    });
});

router.get("/userWorkouts/:id",  function (req, res, next) {
    db.Workouts.find({ _id: req.params.id }, (err, workouts) => {
        if(err){
            res.json(err);
        }
        res.json(workouts);
    });
});

// /api/workouts/new
// authMiddleware.isLoggedIn,
// add new workout, update the user to have workout id
router.post("/new",  authMiddleware.isLoggedIn, function (req, res, next) {
    console.log(req.body);
    db.Workouts.create({
        user: req.body.user,
        workouts: req.body.workouts
    }).then(function(dbWorkout) {
        console.log('success')
        return db.User.findOneAndUpdate({ _id: req.body.user }, { Workouts: dbWorkout._id }, { new: true });
      })
    .then(data => {
        console.log('data', data)
        res.json(data);
    }).catch(err => {
        console.log('err', err)
        res.status(422).json(err)
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