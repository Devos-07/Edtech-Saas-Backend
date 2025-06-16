
/* 
REGISTER/SIGNUP
-> incoming data -->username,email,password->accept
->processing/checking --> eamil valid, compulsory data aaunai paryo
-> db ->table ->query --> table maa insert/read/delete/update

LOGIN/SIGNIN
LOGOUT
FORGET PASSWORD
RESET PASSWORD/OTP

*/
import {Request,Response} from 'express'
import User from '../../database/models/userModel'
import bcrypt from 'bcrypt'

//json data ->req.body maa aauxa ->username ,email,password
//files ->req.file maa aauxa ->file related data
// const registerUser = async (req:Request,res:Response)=>{
//   // const username = req.body.username
//   // const password = req.body.password
//   // const email = req.body.email
//   const {username,password,email} = req.body
//   //incoming data ->accept
//   if (!username||!password||!email) {
//     res.status(400).json({
//       message : "Please provide username, email, password."
//     })
//     return
    
//   }
//     //insert into Users table
//    await User.create({
//       username : username,
//       password : password,
//       email : email
//     })
//     res.status(200).json({
//       message : "User registered successfully."
//     })  
// } // functionl based programming -> yesore garda nee vayo

class AuthController{
static async registerUser(req:Request,res:Response){
   if (req.body === undefined) {
    res.status(400).json({
      message : "No data was sent!!"
    })
    return
  }
    const {username,password,email} = req.body
  //incoming data ->accept
  if (!username||!password||!email) {
    res.status(400).json({
      message : "Please provide username, email, password."
    })
    return 
  }
    //insert into Users table
   await User.create({
      username : username,
      password :  bcrypt.hashSync(password,12),
      email : email
    })
    res.status(201).json({
      message : "User registered successfully."
    }) 
  }

  async loginUser(req:Request,res:Response){
    const {email,password} = req.body
    if (!email||!password) {
      res.status(400).json({
        message : "Please provide username, password"
      })
      return
    }
    //now check if email exist or not in our users table
    const data = await User.findAll({
      where :{
        email : email
      }
    })
    if (data.length===null) {
      res.status(404).json({
        message : "Not registered!"
      })
      
    }else{ //check password
      //compare(plain pasword user bata aako,hashed password register huda users table maa baseko)
      const isPassMatch = bcrypt.compareSync(password,data[0].password)
      if (isPassMatch) { //login vayo, token generation
        
      } else{
        res.status(403).json({
          message : "Invalid email or password"
        })
      }

    }

  }

}  //class based programming -> yesore garda nee vayo ->better to use this approach

//export{registerUser}
export default AuthController