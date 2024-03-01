/**
 * i need to write the controller / logic to register a user--
 */

const becrypt=require('bcryptjs')

//model and controller ka connection ho rha hai yha----
const user_model=require('../model/user.model.js')   //note two times (.) .here and in routes section also--        
exports.signup=async (req,res)=>{
    /**
     * logic to create the user
     */

    //1.Read the request body
    const request_body=req.body  //req.body is predefined .it will give me the request body-----

    //2.insert the data in the users collection in mongodb
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        password: becrypt.hashSync(request_body.password,8)
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