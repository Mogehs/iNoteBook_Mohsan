const express =require('express');
const router=express.Router();
const authControllers=require('../controllers/auth_controller')
const auth_middleware=require('../middlewares/auth_middleware')
const zodSchema=require('../validatores/auth_validator')
const validate=require('../middlewares/middle_Validator')

router.route('/').get(authControllers.home)
router.route('/register').post(validate(zodSchema.signupSchema),authControllers.register)
router.route('/login').post(validate(zodSchema.loginSchema),authControllers.login)
router.route('/user').get(auth_middleware,authControllers.user)

module.exports=router