import express, { Router } from 'express'
import AuthController from '../../../controller/globals/authController'
//import { registerUser } from '../../../controller/globals/authController'
const router:Router = express.Router()
//router.route("/register").post(registerUser)
router.route("/register").post(AuthController.registerUser)
router.route("/login").post(AuthController.loginUser)

export default router