const mongoose = require ("mongoose");
const bcrypt = require ("bcrypt");
const Schema = mongoose.schema; 

const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: [true, "username is required"]        //this will display that message if nothing is enetered
    },
    password :{
        type: String,
        unique: false,
        validate:{
            validator: function(v){
                return  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v);
            },
            message: props => `${props.value} is not a valid password`
        },
        required: [true, "password is required"]
    },
    admin:{
        type: Boolean,
        unique: false, 
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    Workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workouts'
    }],
    MealPlans: [{
        type: Schema.Types.ObjectId,
        ref: 'MealPlans'
    }]
});

usersSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt,genSaltSync(10));
}

userSchema.methods.validPassword = function (password, encrypted){
    return bcrypt.compareSync(password, encrypted);
}

const User = mongoose.model("User", usersSchema);

module.exports = User; 