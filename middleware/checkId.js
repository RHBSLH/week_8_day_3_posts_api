const mongoose = require("mongoose")

const checkId=async(req,res,next)=>{
const id =req.params.id 
if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(400).json("post id should be a vaild object id ")
  next()
}
module.exports = checkId