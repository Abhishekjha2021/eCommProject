/**
 * POST localhost:8888/eComm/api/v1/auth/signUp
 * 
 * i need to intercept this
 * route will intercept the request---------------------
 */
const authController=require('../controller/auth.controller.js')     //routes and controller getting connected here------------
//now connect this route with app server-----------

module.exports=(app)=>{
    app.post("/eComm/api/v1/auth/signUp", authController.signup)  //if the given URI is confirmed then give the control to the controller--------
}
