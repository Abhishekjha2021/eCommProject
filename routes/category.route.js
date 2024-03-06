/**
 * POST localhost:8888/eComm/api/v1/categories
 */

category_controller=require('../controller/category.controller.js')

module.exports=(app)=>{
    app.post("/eComm/api/v1/categories",category_controller.createNewCategory)
}

