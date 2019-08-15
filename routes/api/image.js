let express = require("express");
let ImageRouter = express.Router();
const multer = require('multer');
let Image = require("../../models/image")
const db = require("../../models");

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./uploads")
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else{
    cb(null, false);
  }
}

const upload = multer ({
  storage: storage,
  limits:{
    fileSize: 1024*1024 *5
  },
  fileFilter: fileFilter
});

ImageRouter.route("/uploadmulter")
    .post(upload.single('imageData'), (req, res, next) => {
        console.log("routes/api/Multer route");
        console.log(req.body);
        const newImage = new Image ({
            user: req.body.user,
            imageName: req.body.imageFormObj.imageName,
            imageData: req.file.imageFormObj.path
        });

        newImage.save((err, newimage) =>{
          if(err) throw err;
          db.User.findByIdAndUpdate(req.body.user, {image: newimage._id}, (err, user) => {
            if(err) throw err; 
            console.log("printing the image reference to the user database")
            console.log(user);
            res.send(newimage);
          })
        })
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err))
    })

    module.exports = ImageRouter;