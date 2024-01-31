const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
uuidv4();

const userScheema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        required:true,
    },
    uuid:{
        type:String,
    }
},{ timestamps: true } );
const User = mongoose.model('User',userScheema);

module.exports=User;