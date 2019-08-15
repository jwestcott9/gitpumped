const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    imageName:{
        type: String,
        default: "none",
        required: false
    },
    imageData: {
        type: String,
        require: false
    }
});

var Image = mongoose.model("Image", ImageSchema);

module.exports = Image;