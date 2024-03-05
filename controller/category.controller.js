/**
 * controller for creating the category--
 * 
 * POST localhost:8888/eComm/api/v1/categories
 * 
 * {
 * "name":"Household",
 *  "description":"this will have all the household items"
 * }
 */

const category_model=require('../model/category.model.js')

exports.createNewCategory=async (req,res)=>{
    //read the req body
    //create the category object
    const cat_data={
        name:req.body.name,
        description:req.body.description
    }

    //insert into mongodb
    try{
        const category=await category_model.create(cat_data)
        return res.status(201).send(category)
    }catch(err){
        console.log("Error while creating the category",err)
        return res.send(500).send({
            message:"Error while creating the category"
        })
    }

    //retur the response of the created category
}