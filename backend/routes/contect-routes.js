const express =require('express');
const router=express.Router();
const contectSchema=require('../validatores/contect_validator')
const validator_middleware=require('../middlewares/middle_Validator')

const contectController=require("../controllers/contect_controller")

router.route('/contect').post(validator_middleware(contectSchema), contectController);

module.exports=router