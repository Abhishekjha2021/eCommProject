const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true    //i.e no two users can have same userId-----------
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minLength:10,
        unique:true      //so that no two users can have the same email----------
    },
    userType:{
        type:String,
        required:true,
        default:"CUSTOMER",     //default user is customer------------

        enum:["CUSTOMER","ADMIN"]     //only two type of user can be,either customer or admin--------------
    }

    

},{timestamp:true,versionKey:false})    //if we want to give timestamp and want to remove versionKey(jo mongoose apne aap add kr deta hai)--------

module.exports=mongoose.model("User",userSchema)  //it will create a collection named as "Users" with a document "userSchema"  in it.......here the collection formed will be plural i.e "Users" automatically-------- 