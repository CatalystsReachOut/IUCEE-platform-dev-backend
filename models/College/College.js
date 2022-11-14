import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
// import isEmail from "validator/lib/isemail";

const collegeSchema=new mongoose.Schema({
   name:{
    type:String,
    required:true,
    maxlength:[40,'College name should be under 40 characters']
   },

   location:{
    type:String,
    required:true
   },

   establishedYear:{
    type:Number,
    required:true
   },

   facultyadvisoryemail:{
    type:String,
    required:true,
    validator:[validator.isEmail,"Please enter the email in correct format"],
    unique:true
   },

   facultyadvisoryname:{
    type:String,
    maxlength:[20,'Name cannot exceed 20 characters']
   },

   presidentname:{
    type:String,
    maxlenght:[20,'Name cannot be more than 20 characters']
   },
   
   presidentemail:{
    type:String,
    validator:[validator.isEmail,'Please enter email in valid format'],
    unique:true
   }
});

const College=mongoose.model("College",collegeSchema);
export default College;