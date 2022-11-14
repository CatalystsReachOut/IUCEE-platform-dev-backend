import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import isEmail from "validator/lib/isemail";

const eventSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
    maxlength:[40,'The title cannot exceed 40 characters']
},
bannerimg:{

},
photos:[
 {
    type:String
 }
],
description:{
    type:String,
    required:true,
},
datefrom:{
    type:Date,
    required:true
},
dateto:{
    type:Date,
    required:true
},
collegeid:{
    type:Number,
    required:true
},
publisheddate:{
    type:Date,
    required:true
}
});

const Event=mongoose.model("Event",eventSchema);
export default Event;