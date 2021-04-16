//import Schema and model 

var mongoose = require("mongoose");
const {Schema, model} = require("../db/connection");

//Dish Schema

const DishSchema = new Schema({
    name:  String,
    imageUrl: String,
    videoUrl: String,
    likes: {type:Number,default:0}
})

//UserSchema 
const UserSchema = new Schema({
    username: String,
    password: String,
    dish: [DishSchema],
}, {timestamps:true})

//User model 

const User = model("User", UserSchema)

module.exports = User 