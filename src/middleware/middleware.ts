import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import User from "../database/models/userModel"
import { IExtendRequest } from "./type"


class Middleware{
  static async isLoggedIn(req:IExtendRequest,res:Response,next:NextFunction){
    //check if login or not
    //token accept 
   const token = req.headers.authorization //jwt
   if (!token) {
    res.status(401).json({
      message : "Please provide token"
    })
    return
   }
    //verify garney
    jwt.verify(token,'thisissecret',async(error,result:any)=>{
      if(error){
        res.status(403).json({
          message : "Invalid token"
        })

      }else{
    
      // const userData = await User.findAll({
      //   where : {
      //     id : result.id
      //   }
      // })
      const userData = await User.findByPk(result.id)
        if (!userData) {
          res.status(403).json({
            message : "No user with that id, invalid token"
          })
        }else{
         req.user = userData
          next()
        }

      }
    })
   


  }
}
export default Middleware