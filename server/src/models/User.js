const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    email:{ 
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
       match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role:{
        type:String,
        enum:['student','instructor','admin'],
        default:'student'
    },
    enrolledCourses:[
         {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Course"
    }
    ]
   
});

module.exports = mongoose.model('User',userSchema);