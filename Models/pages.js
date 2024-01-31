const mongoose = require('mongoose');

const PageScheema = new mongoose.Schema({
name:{
    type:String,
    required:true,
},
content:{
    type:mongoose.Schema.Types.Mixed,
},
userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User',
},
uuid:{
type:String,
required:true
}
},{ timestamps: true } );

const Pages = mongoose.model('Pages', PageScheema);
module.exports = Pages;
