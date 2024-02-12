import { Schema, model } from "mongoose";
const userschema = new Schema({
  
  email: {
    type: "string",
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: "string",
    min: 5,
    required: true,
  },
  socketId:{
    type: "string",
    default: null
  }

});

const User = model("users", userschema, "users");
export default User;