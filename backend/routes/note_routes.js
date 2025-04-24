const express =require('express');
const auth_middleware=require('../middlewares/auth_middleware')
const validator=require('../middlewares/middle_Validator')
const Note_Schema=require('../validatores/note_validator')
const router=express.Router();
const Note_controllers=require('../controllers/Note_controllers')
router.route('/addNote/:id').post(validator(Note_Schema), auth_middleware, Note_controllers.AddNote)
router.route('/getNote/:id').get( auth_middleware, Note_controllers.getNotes)
router.route('/getNote/:id').get( auth_middleware, Note_controllers.getNotes)
router.route('/getOneNote/:id').get( auth_middleware, Note_controllers.getOneNote)
router.route('/updateNote/:id').patch(validator(Note_Schema), auth_middleware, Note_controllers.UpdateNote)
router.route('/deleteNote/:id').delete( auth_middleware, Note_controllers.DeleteNote)
module.exports= router