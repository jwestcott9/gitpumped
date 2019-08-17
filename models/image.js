const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    imageName:{
        type: String,
        desfault: "none",
        required: false
    },
    imageData: {
        data: Buffer,
        type: String,
        require: false
    }
});

var Image = mongoose.model("Image", ImageSchema);

module.exports = Image;