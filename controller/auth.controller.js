/**
 * i need to write the controller / logic to register a user--
 */

const bcrypt=require('bcryptjs')

const jwt=require('jsonwebtoken')       //for generating the tokens after login is done ----------

const secret=require('../configs/auth.config.js')  //for accesing centalized secret value of jwt token----------

//model and controller ka connection ho rha hai yha----
const user_model=require('../model/user.model.js')   //note two times (.) .here and in routes section also--        
exports.signup=async (req,res)=>{
    /**
     * logic to create the user
     */

    //1.Read the request body
    const request_body=req.body  //req.body is predefined .it will give me the request body-----

    //2.insert the data in the users collection in mongodb----------------
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        password: bcrypt.hashSync(request_body.password,8)
    }

    try{
        const user_created=await user_model.create(userObj)
        /**
         * return this user
         */
        //res.status(201).send(user_created) //when something got successfully created then it's http code is 201------
        //on directly returning the above part ,it may also return the sensitive part also .so we can adjust the return part by our own ,as follows----
        const res_obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            //updatedAt:user_created.updatedAt
        }
        res.status(201).send(user_created)


    }catch(err){
        console.log("Error while registering the user",err)
        //500 means it's the internal server error------
        res.status(500).send({
            message:"Some error happened while registerning the user"
        })

    }


    //3.return the response back to the user

}

//code for login of user (after signup)---------------
exports.signin=async (req,res)=>{
    const user=await user_model.findOne({userId:req.body.userId})

    //check if the userId is present in the system-------------
    if(user==null){
        return res.status(400).send({
            message:"passed userId isn't valid"
        })
    }

    //check password is correct or not------------
    const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)  //here as the password provided by user is encrypted so how to compare the password during 
    //the login time . so bcrypt gives us a fascility of compareSync by which we can comapre an encrypted(password given by user during signup time which is now encrypted due to bcrypt) or non-encrypted password(password given by user during signin)----
    if(!isPasswordValid){
        return res.status(401).send({
            message:"wrong password passed"
        })
    }

    //now after authentication of user we will generate the jwt tokens---
    const token=jwt.sign({id:user.userId},secret.secret,{     //here we have to give 3 things ..(1)koi data dena hoga jiske basis pe token generate krna hai eg-userId or password.
        //(2) give some secret code jiske basis pe token generate krn ahai .yha wo code "My xyz secret" hai....
        expiresIn:120  //(3) time period ki kitne der tak ye token valid rhega ----------
    })

    res.status(201).send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        accessToken:token

    })

}