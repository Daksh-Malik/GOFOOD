import express from "express";
import User from '../models/User.js';
const router = express.Router()
import {body,validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const jwtSecret = "ThisIsASecurityKey"

export default router.post("/loginuser", 
[
    body('password','Password length must be atleast 5').isLength({min:5}),
    body('email','Email format is wrong').isEmail()
],
async (req,res)=>{
    let email = req.body.email
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        let userData = await User.findOne({email})
        if(!userData){
            return res.status(400).json({Error: "Try logging with correct credentials"})
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if(!pwdCompare){
            return res.status(400).json({Error: "Try logging with correct credentials"})
        }

        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
        return res.json({success:true, authToken:authToken})

    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
})