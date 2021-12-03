const Joi = require("joi")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  avatar :{
      type:String,
      default:"https://th.bing.com/th/id/OIP.6tTlAPJiEUR_K4Oo_ts1tQHaHa?w=196&h=196&c=7&r=0&o=5&dpr=1.25&pid=1.7"
  },
})

const userJoi = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    password: Joi.string().min(6).max(100).required(),
    avatar: Joi.string().uri().max(1000).required(),
  email: Joi.string()
  .email({ tlds : { allow : false } })
  .required(),
})

const User = mongoose.model("User", userSchema)

module.exports.User = User
module.exports.userJoi = userJoi
