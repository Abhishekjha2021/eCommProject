/**
 * create a mw to check if the request body is proper and correct
 */

const user_model=require('../model/user.model.js')

const jwt=require('jsonwebtoken')       //required for validating the token-------------------

const auth_config=require('../configs/auth.config.js')   //during validating the token ,we also need of "secret" of token -------------

const verifySignUpBody=async (req,res,next)=>{
    try{
        //check for the name-----------
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

const verifySignInBody=(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message:"usedId isn't provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message:"password isn't provided"
        })
    }

    next()
}

const verifyToken=(req,res,next)=>{
    //check if the Token is present in the header-----------
    const token=req.headers['x-access-token']

    if(!token){
        return res.status(403).send({
            message:"No token found : UnAuthorized"
        })
    }

    //if the token is present then check it's valid or not-----
    jwt.verify(token,auth_config.secret,async (err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"UnAuthorized"
            })
        }

        const user=await user_model.findOne({userId:decoded.id})  //the token which was generated on the basis of userId ,was encrypted with a secret message..so here we are decoding it-------
        if(!user){
            return res.status(400).send({
                message:"UnAuthorized,this user for this token doesn't exists"
            })
        }

        //set the user info in the req body----
        req.user=user
        
        next() //go to the next MW part----------------
    })
    
}

const isAdmin=(req,res,next)=>{
    const user=req.user

    if(user && user.userType=="ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message:"Only Admin users are allowed to access this endpoint"
        })
    }
}
module.exports={
    verifySignUpBody:verifySignUpBody,
    verifySignInBody:verifySignInBody,
    verifyToken:verifyToken,
    isAdmin:isAdmin
}