/**
 * POST localhost:8888/eComm/api/v1/categories
 */

category_controller=require('../controller/category.controller.js')
const auth_MW=require('../middlewares/auth.mw.js')

module.exports=(app)=>{
    app.post("/eComm/api/v1/categories",[auth_MW.verifyToken,auth_MW.isAdmin],category_controller.createNewCategory)
}

