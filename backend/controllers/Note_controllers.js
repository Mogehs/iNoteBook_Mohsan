
const Note = require('../models/Note_model')

exports.AddNote = async (req, res, next) => {
  try {
    const { title, description } = req.body
    const userId = req.params.id

    
    const newNote = await Note.create({
      user: userId,
      title,
      description
    })

    res.status(201).json({
      success: true,
      message: "Note added successfully",
      note: newNote
    })
  } catch (error) {
    next(error)
  }
}

exports.getNotes = async (req, res, next) => {
  try {
    const userId = req.params.id

    const notes = await Note.find({ user: userId })

    return res.status(200).json({
      success: true,
      notes
    })
  } catch (error) {
    next(error)
  }
}
exports.DeleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    await Note.deleteOne({ _id: noteId });
    return res.status(200).json({ message: "Note Deleted" });
  } catch (error) {
    next(error); 
  }
};
exports.getOneNote=async (req,res,next)=>{
try {
  const noteId = req.params.id;
  const oneNote= await Note.findOne({_id:noteId})
   return res.status(200).json(oneNote)
} catch (error) {
  next(error)
}
}
exports.UpdateNote= async(req,res,next)=>{
try {
  const noteId = req.params.id;
  const newData=req.body
  const updatedNote=await Note.updateOne({_id:noteId},{$set:newData})
  return res.status(201).json({"Note Updated":updatedNote})
} catch (error) {
  
}
}
