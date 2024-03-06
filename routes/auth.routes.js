/**
 * POST localhost:8888/eComm/api/v1/auth/signUp
 * 
 * i need to intercept this-----------
 * route will intercept the request---------------------
 */
const authController=require('../controller/auth.controller.js')     //routes and controller getting connected here------------
//now connect this route with app server-----------

const authMW=require("../middlewares/auth.mw.js")   //connecting with middleware-----------

module.exports=(app)=>{  //(app) means connecting the route to the server---and if the post call is correct then handover the request to the signup part of the controller----
    app.post("/eComm/api/v1/auth/signUp",[authMW.verifySignUpBody] ,authController.signup)  //if the given URI is confirmed then give the control to the controller--------

    //code for signin----------
    app.post("/eComm/api/v1/auth/signin",[authMW.verifySignInBody],authController.signin)
}
//if URI is ok ,then authcontroller.signup(signup part ka code ,is already written in auth.controller.js file)------
//in upper line of code we are writing ,[authMW.verifySignUpBody] for using middleware ---------------------