
import dotenv from "dotenv";
import { userLogin, userRegister } from "../helper/userHelper.js";



dotenv.config();


export const signup = async (req, res,next) => {
    try {
        const response = await userRegister(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error);
      }
}

export const login =  async(req, res,next) => {
    try {
        const response = await userLogin(req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
      const response = await userLogout();
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      next(error);
    }
  };
  


