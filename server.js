/**
 * this will be the starting file of the project---------------
 */
const express=require('express')
const mongoose =require('mongoose')
const app=express()
const server_config=require('./configs/server.config.js')  //taken server.config file module-------------
const db_config=require("./configs/db.config.js")

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
})

/**
 * start the server
 */
app.listen(server_config.PORT,()=>{               //as this port no. is customizable i.e it might change. so anything which is customizatable,it's not a good 
                                    //practice to write it here.ideally we must put it customizable values somewhere else,it should be all centralized.so make a folder and put it there.i.e config folder--
    console.log("server started at port number:",server_config.PORT) //server_config ke PORT ko access kr rhe h----
})