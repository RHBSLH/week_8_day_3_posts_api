const express = require("express")
const router = express.Router()
const { Post, postJoi } = require("../models/Post")
const checkId =require("../middleware/checkId")
const checkToken =require("../middleware/checkToken")


router.get("/", async (req, res) => {
  let posts = await Post.find().select("-__v").populate({
path:"owner",
select:"-__v -password"
  })

  res.json(posts)
})
router.get("/:id",checkId, async (req, res) => {
   const post = await Post.findById(req.params.id).select("-__v")
    if (!post)  return res.status(404).json("post not found")
    res.json(post) 
})

router.post("/",checkToken, async (req, res) => {
  try{
   const postBody = req.body
   const {title,body,image}=postBody
   const result = postJoi.validate(postBody)
 if (result.error) return res.status(400).json(result.error.details[0].message)
  
 const post = new Post({
    title,
    body,
    image,
    owner,
  })
  
    await post.save()
    res.json(post)
  } catch (error) {
    return res.status(500).json(error.message)
  }
  
})

router.put("/:id",checkId,checkToken, async (req, res) => {
try{
  const { title, body, image } = req.body
  const post = await Post.findByIdAndUpdate(req.params.id, { $set: { title, body, image },}, {new:true})
 if (!post) return res.status(404).json("post not found ")
  
 res.json(post)
}catch (error){
return res.status(500).json(error.message)
}
})

router.delete("/:id",checkId,checkToken, async (req, res) =>{
try {
   
  const post = await Post.findById(req.params.id)
  if (!post) return res.status(404).json("post not found ")
  
  res.json("post is removed")
}catch(error){
    return res.status(500).json(error.message)
}
})

module.exports = router