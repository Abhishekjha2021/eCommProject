/**
 * this will be the starting file of the project---------------
 */
const express=require('express')    //part 1-----------
const app=express()             //part 2------------------
const server_config=require('./configs/server.config.js')  //taken server.config file module-------------i.e PORT value--------

//for encryptining the password--
const bcrypt=require('bcryptjs')  


//come to db part---------------------------------
const mongoose =require('mongoose')
const db_config=require("./configs/db.config.js")
const user_model=require('./model/user.model.js')

app.use(express.json())   //middleware-------------------whenever receive a json ,read it as js object ----------
//it will convert json file ,received from the user during signup process(through postman) to js object file,so that vs code can understand it..
//bcz vs code willn't directly understand the request which is in json.



/**
 * create an admin user at the starting of the application
 * if not already present
 */

//connection with mongodb
mongoose.connect(db_config.DB_URL) //db_config ke DB_URL ko access kr rhe hai-----

const db=mongoose.connection

db.on("error",()=>{
    console.log("error while connecting to mongodb")
})

db.once("open",()=>{
    console.log("connected to mongodb")
    init()
})

async function init(){

    try{
        let user=await user_model.findOne({userId:"admin"})  //if i want to wait at this point ,then i will have to use "await" keyword here--
        //here we are taking user of "let" type ,bcz agar upper wala part nhi chala to hum nicche wala part bnayenge (try---catch) so user ko dobara 
        //define krna pd rha hai,so hum user ko let type ka le rhe hai const ka nhi ------------------------

        if(user){
            console.log("Admin is already present")
            return 
        }
    }catch(err){
        console.log("Error while connecting thedata",err)
    }

    //agar uper wala part run hua to theek hai agar nhi chala then i am going to create it ,jo ki nicche dia gya hai-------
    try{
        user=await user_model.create({
            name:"abhi",
            userId:"admin",
            email:"abhi34@gmail.com",
            userType:"ADMIN",    //make sure to take value in the same way as taken in model part.i.e capital letter or small letter---------

           // password:"abhi4587gh"    //here we are using direct string type of password i.e we are not encrypting password .so make sure to use becryptjs for encrypting the password---
            password:bcrypt.hashSync("welcome1",8)   //here 8 is the hash of the "welcome1"------------and 8 is called salt ------8 is added to make the password more complicated----
            //salt based hashing-----when a normal password is encrypted with the help of any value either it is a number or string (k/a salt),to enhance the security------
        })
        console.log("Admin created",user)

    }catch(err){
        console.log("error while creating admin",err)
    }
}

/**
 * stich the route to the server---------
 */
require('./routes/auth.routes.js')(app)  //calling routes and passing app object in it--------------  

/**
 * start the server  ...part 3------------------------
 */
app.listen(server_config.PORT,()=>{               //as this port no. is customizable i.e it might change or we want to change the port number . so anything which is customizatable,it's not a good 
                                    //practice to write it here. ideally we must put customizable values somewhere else,it should be all centralized.so make a folder and put it there.i.e config folder--
    console.log("server started at port number:",server_config.PORT) //server_config ke PORT ko access kr rhe h----
})