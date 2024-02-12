import bcrypt from "bcrypt";
import User from "../model/userSchema.js";
import  { io } from "../connection/socket.js";

export const userRegister = async (details) => {
  if (details.password && details.email) {
    const existingUser = await User.findOne({ email: details.email });
    if (existingUser) {
      const err = { message: "Email already exists", statusCode: 409 };
      throw err;
    }

    details.password = await bcrypt.hash(details?.password, 10);
     await User.create(details);
     res.status(200).json( {
      message: "user registered successfully",
    });
  } else {
    const err = { message: "Credentials required", statusCode: 400 };
    throw err;
  }
};

export const userLogin = async (details) => {
  if (!details.email && !details.password) {
    const err = { message: "Required all credentials", statusCode: 400 };
    throw err;
  } else {
    const response = await User.findOne({ email: details.email });
    
    if (response) {
      const auth = await bcrypt.compare(details.password, response.password);
      if (!auth) {
        const err = { message: "Invalid password", statusCode: 401 };
        throw err;
      } else {
       
    if (response.socketId) {
      io.to(response?.socketId).emit("logout");
    }
        return { _id: response._id, email: response.email, name:response.name };
        
      }
    } else {
      const err = { message: "User does not exist", statusCode: 404 };
      throw err;
    }
  }
};
export const userLogout = async (data) => {
  
    
    try {
      const user = await User.findOne({ email: data.email });
      if(user){
        await User.updateOne({ email: data.email }, { $set: { socketId: null } });
        res.status(200).json( {
          message: "user successfully Logges out",
        });
      }
    } catch (error) {
      const err = { message: "User does not exist", statusCode: 404 };
      throw err;
    }
   
};

 