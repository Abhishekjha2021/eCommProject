/**
 * create a mw to check if the request body is proper and correct
 */

const user_model=require('../model/user.model.js')

const verifySignUpBody=async (req,res,next)=>{
    try{
        //check for the name
        if(!req.body.name){     //if the name is not provided------
            return res.status(400).send({
                message:"Failed ! Name was not provied in request body"
            })
        }
        //check for email
        if(!req.body.email){        //if the email is not provided-----
            return res.status(400).send({
                message:"Failed ! Email was not provied in request body"
            })
        }
        //check for userId
        if(!req.body.userId){        //if the userId is not provided-----
            return res.status(400).send({
                message:"Failed ! userid was not provied in request body"
            })
        }
        //check if the user with the same userId is already present----
        //for this we will make the connection with the database,find the userId there and relate it with the new one-------
        const user=await user_model.findOne({userId:req.body.userId})

        if(user){
            return res.status(400).send({
                message:"Failed ! user with same userId is already present"
            })
        }

        if(!req.body.password){        //if the userId is not provided-----
            return res.status(400).send({
                message:"password isn't provided"
            })
        }

        next()      //don't forget it .......used to send the command to the next MW-------------------


    }catch(err){
        console.log("Error while validating the request object",err)
        res.status(500).send({
            message:"Error while validating the request body"
        })
    }
    
}

// const verifyToken=(req,res,next)=>{
    
// }
module.exports={
    verifySignUpBody:verifySignUpBody
}