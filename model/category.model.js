/**
 * name and description of items---------
 */

const mongoose=require('mongoose')
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    }

},{timestamps:true,versionKey:false})

module.exports=mongoose.model("category",categorySchema)  //system will automatically make collection plural--------